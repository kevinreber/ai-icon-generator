import { conform, useForm } from "@conform-to/react";
import { getFieldsetConstraint, parse } from "@conform-to/zod";
import {
  json,
  redirect,
  type DataFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { Form, useActionData, useSearchParams } from "@remix-run/react";
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
  getSessionExpirationDate,
  validateCSRF,
} from "~/utils";
import bcrypt from "bcryptjs";
import {
  Field,
  GeneralErrorBoundary,
  ErrorList,
  CheckboxField,
} from "~/components";

const SignupFormSchema = z
  .object({
    username: UsernameSchema,
    name: NameSchema,
    email: EmailSchema,
    password: PasswordSchema,
    confirmPassword: PasswordSchema,
    agreeToTermsOfServiceAndPrivacyPolicy: z.boolean({
      required_error:
        "You must agree to the terms of service and privacy policy",
    }),
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
  //   await requireAnonymous(request);
  return json({});
}
export async function action({ request }: DataFunctionArgs) {
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
              hash: await bcrypt.hash(password, 10),
            },
          },
        },
      });

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

  const { user, remember } = submission.value;

  const cookieSession = await sessionStorage.getSession(
    request.headers.get("cookie"),
  );
  cookieSession.set("userId", user.id);

  return redirect("/", {
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
    <div className="container flex flex-col justify-center pb-32 pt-20">
      <div className="text-center">
        <h1 className="text-h1">Let's start your journey!</h1>
        <p className="mt-3 text-body-md text-muted-foreground">
          Please enter your email.
        </p>
      </div>
      <div className="mx-auto mt-16 min-w-[368px] max-w-sm">
        <Form method="POST" {...form.props}>
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
          />

          <CheckboxField
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
          />

          <CheckboxField
            labelProps={{
              htmlFor: fields.remember.id,
              children: "Remember me",
            }}
            buttonProps={conform.input(fields.remember, { type: "checkbox" })}
            errors={fields.remember.errors}
          />

          <ErrorList errors={form.errors} id={form.errorId} />

          <div className="flex items-center justify-between gap-6">
            <button
              className="w-full border-solid border-1 border-gray-600 rounded-md p-2  hover:bg-gray-800"
              // TODO: Add status state
              // status={isPending ? 'pending' : actionData?.status ?? 'idle'}
              type="submit"
              disabled={isPending}
            >
              Submit
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export function ErrorBoundary() {
  return <GeneralErrorBoundary />;
}
