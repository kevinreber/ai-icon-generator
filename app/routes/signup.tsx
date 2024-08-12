import { conform, useForm } from "@conform-to/react";
import { getFieldsetConstraint, parse } from "@conform-to/zod";
import {
  json,
  redirect,
  type DataFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { Form, Link, useActionData, useSearchParams } from "@remix-run/react";
import { AuthenticityTokenInput } from "remix-utils/csrf/react";
import { HoneypotInputs } from "remix-utils/honeypot/react";
import { z } from "zod";
import { useIsPending } from "~/hooks";
import { prisma } from "~/services/prisma.server";
import {
  EmailSchema,
  NameSchema,
  PasswordSchema,
  UsernameSchema,
  checkHoneypot,
  sessionStorage,
  getSessionExpirationDate,
  validateCSRF,
} from "~/utils";
import {
  Field,
  GeneralErrorBoundary,
  ErrorList,
  CheckboxField,
} from "~/components";
import { safeRedirect } from "remix-utils/safe-redirect";
import { getHashedPassword } from "~/utils/getHashedPassword.server";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import GoogleLoginButton from "~/components/GoogleLoginButton";
import { requireAnonymous } from "~/services/auth.server";

const SignupFormSchema = z
  .object({
    username: UsernameSchema,
    name: NameSchema,
    email: EmailSchema,
    password: PasswordSchema,
    confirmPassword: PasswordSchema,
    redirectTo: z.string().optional(),
    // TODO: later...
    // agreeToTermsOfServiceAndPrivacyPolicy: z.boolean({
    //   required_error:
    //     "You must agree to the terms of service and privacy policy",
    // }),
    remember: z.boolean().optional(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        path: ["confirmPassword"],
        code: "custom",
        message: "The passwords must match",
      });
    }
  });

export const meta: MetaFunction<typeof loader> = () => {
  return [{ title: "User Sign Up" }];
};

export async function loader({ request }: DataFunctionArgs) {
  await requireAnonymous(request);
  return json({});
}
export async function action({ request }: DataFunctionArgs) {
  await requireAnonymous(request);

  const formData = await request.formData();
  await validateCSRF(formData, request.headers);
  checkHoneypot(formData);

  const submission = await parse(formData, {
    schema: SignupFormSchema.superRefine(async (data, ctx) => {
      const existingUser = await prisma.user.findUnique({
        where: { username: data.username },
        select: { id: true },
      });
      if (existingUser) {
        ctx.addIssue({
          path: ["username"],
          code: z.ZodIssueCode.custom,
          message: "A user already exists with this username",
        });
        return;
      }
      const existingUserEmail = await prisma.user.findUnique({
        where: { email: data.email },
        select: { id: true },
      });
      if (existingUserEmail) {
        ctx.addIssue({
          path: ["email"],
          code: z.ZodIssueCode.custom,
          message: "A user already exists with this email",
        });
        return;
      }
    }).transform(async (data) => {
      const { username, email, name, password } = data;

      const user = await prisma.user.create({
        select: { id: true },
        data: {
          email: email.toLowerCase(),
          username: username.toLowerCase(),
          name,
          password: {
            create: {
              hash: await getHashedPassword(password),
            },
          },
          roles: { connect: { name: "user" } },
        },
      });
      console.log("User ------------------------------------");

      console.log(user);

      return { ...data, user };
    }),
    async: true,
  });

  if (submission.intent !== "submit") {
    return json({ status: "idle", submission } as const);
  }
  if (!submission.value?.user) {
    return json({ status: "error", submission } as const, { status: 400 });
  }

  const { user, remember, redirectTo } = submission.value;

  const cookieSession = await sessionStorage.getSession(
    request.headers.get("cookie"),
  );
  cookieSession.set("userId", user.id);

  return redirect("/create", {
    headers: {
      "set-cookie": await sessionStorage.commitSession(cookieSession, {
        expires: remember ? getSessionExpirationDate() : undefined,
      }),
    },
  });
}

export default function Index() {
  const actionData = useActionData<typeof action>();
  const isPending = useIsPending();

  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");

  const [form, fields] = useForm({
    id: "signup-form",
    constraint: getFieldsetConstraint(SignupFormSchema),
    defaultValue: { redirectTo },
    lastSubmission: actionData?.submission,
    onValidate({ formData }) {
      const result = parse(formData, { schema: SignupFormSchema });
      return result;
    },
    shouldRevalidate: "onBlur",
  });

  return (
    <div className="container flex flex-col justify-center mt-2">
      <div className="text-center">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight">
          Let's start your journey!
        </h2>
        <p className="mt-3 text-body-md text-muted-foreground">
          Please enter your email.
        </p>
      </div>
      {/* <Card className="mx-auto mt-16 min-w-[368px] max-w-sm"> */}
      <Card className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-[#24292F] px-6 py-12 shadow sm:rounded-lg sm:px-12">
          {/* <Form method="POST" {...form.props}>
            <AuthenticityTokenInput />
            <HoneypotInputs />
            <Field
              labelProps={{ htmlFor: fields.email.id, children: "Email" }}
              inputProps={{
                ...conform.input(fields.email),
                autoComplete: "email",
                autoFocus: true,
                className: "lowercase",
              }}
              errors={fields.email.errors}
            />
            <Field
              labelProps={{ htmlFor: fields.username.id, children: "Username" }}
              inputProps={{
                ...conform.input(fields.username),
                autoComplete: "username",
                autoFocus: true,
                className: "lowercase",
              }}
              errors={fields.username.errors}
            />
            <Field
              labelProps={{ htmlFor: fields.name.id, children: "Name" }}
              inputProps={{
                ...conform.input(fields.name),
                autoComplete: "name",
              }}
              errors={fields.name.errors}
            />
            <Field
              labelProps={{ htmlFor: fields.password.id, children: "Password" }}
              inputProps={{
                ...conform.input(fields.password, { type: "password" }),
                autoComplete: "new-password",
              }}
              errors={fields.password.errors}
            />

            <Field
              labelProps={{
                htmlFor: fields.confirmPassword.id,
                children: "Confirm Password",
              }}
              inputProps={{
                ...conform.input(fields.confirmPassword, { type: "password" }),
                autoComplete: "new-password",
              }}
              errors={fields.confirmPassword.errors}
            /> */}

          {/* TODO: Later... */}
          {/* <CheckboxField
              labelProps={{
                htmlFor: fields.agreeToTermsOfServiceAndPrivacyPolicy.id,
                children:
                  "Do you agree to our Terms of Service and Privacy Policy?",
              }}
              buttonProps={conform.input(
                fields.agreeToTermsOfServiceAndPrivacyPolicy,
                { type: "checkbox" },
              )}
              errors={fields.agreeToTermsOfServiceAndPrivacyPolicy.errors}
            /> */}

          {/* <CheckboxField
              labelProps={{
                htmlFor: fields.remember.id,
                children: "Remember me",
              }}
              buttonProps={conform.input(fields.remember, { type: "checkbox" })}
              errors={fields.remember.errors}
            /> */}

          {/* <input {...conform.input(fields.redirectTo, { type: "hidden" })} />

            <ErrorList errors={form.errors} id={form.errorId} />

            <div className="flex items-center justify-between gap-6">
              <Button
                type="submit"
                className="flex w-full justify-center px-3 py-1.5 text-sm font-semibold leading-6"
                variant="outline"
                // TODO: Add status state
                // status={isPending ? 'pending' : actionData?.status ?? 'idle'}
                disabled={isPending}
              >
                Sign Up
              </Button>
            </div>
          </Form> */}
          <div>
            {/* <div className="relative mt-10">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t " />
              </div>
              <div className="relative flex justify-center text-sm font-medium leading-6">
                <span className=" bg-[#24292F]">Or continue with</span>
              </div>
            </div> */}

            <div className="mt-6 w-full">
              <GoogleLoginButton />
            </div>
            <div className="mt-6 w-full">
              <p className="text-center text-sm text-gray-500">
                Have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold leading-6 text-white"
                >
                  Log In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export function ErrorBoundary() {
  return <GeneralErrorBoundary />;
}
