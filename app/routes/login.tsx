import {
  type LoaderFunctionArgs,
  json,
  MetaFunction,
  DataFunctionArgs,
  redirect,
} from "@remix-run/node";
import {
  SESSION_KEY,
  USER_ID_KEY,
  authenticator,
  login,
  requireAnonymous,
} from "~/services/auth.server";
import GoogleLoginButton from "~/components/GoogleLoginButton";
import {
  PasswordSchema,
  UsernameSchema,
  checkHoneypot,
  validateCSRF,
  sessionStorage,
  getSessionExpirationDate,
  getSessionUserId,
} from "~/utils";
import { z } from "zod";
import { getFieldsetConstraint, parse } from "@conform-to/zod";
import { Form, Link, useActionData, useSearchParams } from "@remix-run/react";
import { AuthenticityTokenInput } from "remix-utils/csrf/react";
import { safeRedirect } from "remix-utils/safe-redirect";
import { HoneypotInputs } from "remix-utils/honeypot/react";
import { useForm, conform } from "@conform-to/react";
import { useIsPending } from "~/hooks";
import { ErrorList, Field } from "~/components";
import { prisma } from "~/services/prisma.server";
import { isValidPassword } from "~/utils/isValidPassword.server";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import PageContainer from "~/components/PageContainer";
import PixelStudioIcon from "~/components/PixelStudioIcon/PixelStudioIcon";

export const meta: MetaFunction<typeof loader> = () => {
  return [{ title: "User Login" }];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // ! TODO: Need to revisit this, session may not be storing userId as expected
  await requireAnonymous(request);

  // TODO: after we implement other forms of login (Ex: SSO), we can use this to check if user is authenticated
  await authenticator.isAuthenticated(request, {
    successRedirect: "/explore",
  });

  return json({});
};

const LoginFormSchema = z.object({
  username: UsernameSchema,
  password: PasswordSchema,
  redirectTo: z.string().optional(),
  remember: z.boolean().optional(),
});

export async function action({ request }: DataFunctionArgs) {
  await requireAnonymous(request);

  const formData = await request.formData();
  await validateCSRF(formData, request.headers);
  checkHoneypot(formData);

  const submission = await parse(formData, {
    schema: (intent) =>
      LoginFormSchema.transform(async (data, ctx) => {
        if (intent !== "submit") return { ...data, user: null };

        const user = await login(data);
        if (!user) {
          ctx.addIssue({
            code: "custom",
            message: "Invalid username or password",
          });
          return z.NEVER;
        }

        return { ...data, user };
      }),
    async: true,
  });

  // get the password off the payload that's sent back
  delete submission.payload.password;

  if (submission.intent !== "submit") {
    // @ts-expect-error - conform should probably have support for doing this
    delete submission.value?.password;
    return json({ status: "idle", submission } as const);
  }
  if (!submission.value?.user) {
    return json({ status: "error", submission } as const, { status: 400 });
  }

  const { user, remember, redirectTo } = submission.value;

  const cookieSession = await sessionStorage.getSession(
    request.headers.get("cookie"),
  );
  cookieSession.set(USER_ID_KEY, user.id);
  console.log("Success!!!!!!!!!!!!!!!!!!!!!!!!!");
  console.log(cookieSession.data);

  return redirect(safeRedirect(redirectTo), {
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
    id: "login-form",
    constraint: getFieldsetConstraint(LoginFormSchema),
    defaultValue: { redirectTo },
    lastSubmission: actionData?.submission,
    onValidate({ formData }) {
      return parse(formData, { schema: LoginFormSchema });
    },
    shouldRevalidate: "onBlur",
  });

  return (
    <PageContainer>
      <div className="flex min-h-full flex-1 flex-col justify-center pb-8 sm:px-6 lg:px-8 pt-0">
        <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center">
          <div className="w-16 mb-2">
            <PixelStudioIcon />
          </div>
          {/* <h2 className="text-center text-2xl font-bold leading-9 tracking-tight">
            Pixel Studio AI{" "}
          </h2> */}
          <h2 className="text-2xl m-0">Pixel Studio AI</h2>

          <h1 className="mt-6 text-center text-1xl">Sign in to your account</h1>
        </div>

        <Card className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-[#24292F] px-6 py-12 shadow sm:rounded-lg sm:px-12">
            {/* <Form className="space-y-6" method="POST" {...form.props}>
              <AuthenticityTokenInput />
              <HoneypotInputs />
              <div>
                <Field
                  labelProps={{ children: "Username" }}
                  inputProps={{
                    ...conform.input(fields.username),
                    autoFocus: true,
                    className: "lowercase",
                  }}
                  errors={fields.username.errors}
                />

                <Field
                  labelProps={{ children: "Password" }}
                  inputProps={conform.input(fields.password, {
                    type: "password",
                  })}
                  errors={fields.password.errors}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded"
                    // className="h-4 w-4 rounded border-gray-300 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-3 block text-sm leading-6"
                  >
                    Remember me
                  </label>
                </div> */}

            {/* <div className="text-sm leading-6">
                  <Link
                    to="/forgot-password"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </Link>
                </div> */}
            {/* </div> */}

            {/* <input
                {...conform.input(fields.redirectTo, { type: "hidden" })}
              /> */}

            {/* <ErrorList errors={form.errors} id={form.errorId} />
              <div>
                <Button
                  type="submit"
                  className="flex w-full justify-center px-3 py-1.5 text-sm font-semibold leading-6"
                  variant="outline"
                  //   TODO: Add loading state
                  //   status={isPending ? 'pending' : actionData?.status ?? 'idle'}
                  disabled={isPending}
                >
                  Sign in
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

              <p className="text-center text-sm text-gray-200">Sign in with</p>
              <div className="mt-6 w-full">
                <GoogleLoginButton />
              </div>
              {/* <div className="mt-6 w-full">
                <p className="text-center text-sm text-gray-500">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="font-semibold leading-6 text-white"
                  >
                    Sign up
                  </Link>
                </p>
              </div> */}
            </div>
          </div>

          {/* TODO */}
          {/* <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <a
              href="#"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Start a 14 day free trial
            </a>
          </p> */}
        </Card>
      </div>

      {/* <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-6">
            <GoogleLoginButton />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Create account</Button>
        </CardFooter>
        <div className="relative">
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
        </div>
      </Card> */}
    </PageContainer>
  );
}
