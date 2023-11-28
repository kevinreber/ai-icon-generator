import {
  type LoaderFunctionArgs,
  json,
  MetaFunction,
  DataFunctionArgs,
  redirect,
} from "@remix-run/node";
import { authenticator } from "~/services/auth.server";
import GoogleLoginButton from "~/components/GoogleLoginButton";
import {
  EmailSchema,
  PasswordSchema,
  UsernameSchema,
  checkHoneypot,
  validateCSRF,
  sessionStorage,
} from "~/utils";
import { z } from "zod";
import { getFieldsetConstraint, parse } from "@conform-to/zod";
import { Form, useActionData } from "@remix-run/react";
import { AuthenticityTokenInput } from "remix-utils/csrf/react";
import { HoneypotInputs } from "remix-utils/honeypot/react";
import { useForm, conform } from "@conform-to/react";
import { useIsPending } from "~/hooks";
import { ErrorList } from "~/components";
import { prisma } from "~/services/prisma.server";
import bcrypt from "bcryptjs";

export const meta: MetaFunction<typeof loader> = () => {
  return [{ title: "User Login" }];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticator.isAuthenticated(request, {
    successRedirect: "/explore",
  });

  return json({});
};

const LoginFormSchema = z.object({
  username: UsernameSchema,
  password: PasswordSchema,
});

export async function action({ request }: DataFunctionArgs) {
  const formData = await request.formData();
  await validateCSRF(formData, request.headers);
  checkHoneypot(formData);
  const submission = await parse(formData, {
    schema: (intent) =>
      LoginFormSchema.transform(async (data, ctx) => {
        if (intent !== "submit") return { ...data, user: null };

        const usernameAndPassword = await prisma.user.findUnique({
          select: { id: true, password: { select: { hash: true } } },
          where: { username: data.username },
        });
        if (!usernameAndPassword || !usernameAndPassword.password) {
          ctx.addIssue({
            code: "custom",
            message: "Invalid email or password",
          });
          return z.NEVER;
        }

        const isValid = await bcrypt.compare(
          data.password,
          usernameAndPassword.password.hash,
        );

        if (!isValid) {
          ctx.addIssue({
            code: "custom",
            message: "Invalid email or password",
          });
          return z.NEVER;
        }

        // verify the password (we'll do this later)
        return { ...data, user: { id: usernameAndPassword.id } };
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

  const { user } = submission.value;

  const cookieSession = await sessionStorage.getSession(
    request.headers.get("cookie"),
  );
  cookieSession.set("userId", user.id);

  return redirect("/", {
    headers: {
      "set-cookie": await sessionStorage.commitSession(cookieSession),
    },
  });
}

export default function Index() {
  const actionData = useActionData<typeof action>();
  const isPending = useIsPending();

  const [form, fields] = useForm({
    id: "login-form",
    constraint: getFieldsetConstraint(LoginFormSchema),
    lastSubmission: actionData?.submission,
    onValidate({ formData }) {
      return parse(formData, { schema: LoginFormSchema });
    },
    shouldRevalidate: "onBlur",
  });

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          {/* <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          /> */}
          {/* <h1 className="text-center text-1xl">AI Image Generator</h1> */}
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-600">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-[#24292F] px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <Form className="space-y-6" method="POST" {...form.props}>
              <AuthenticityTokenInput />
              <HoneypotInputs />
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id={fields.username.id}
                    {...conform.input(fields.username)}
                    type="username"
                    placeholder="Enter username..."
                    className="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-300 text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id={fields.password.id}
                    {...conform.input(fields.password)}
                    type="password"
                    placeholder="Enter password..."
                    className="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-300 text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-3 block text-sm leading-6"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm leading-6">
                  {/* ! TODO */}
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <ErrorList errors={form.errors} id={form.errorId} />
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  //   TODO: Add loading state
                  //   status={isPending ? 'pending' : actionData?.status ?? 'idle'}
                  disabled={isPending}
                >
                  Sign in
                </button>
              </div>
            </Form>

            <div>
              <div className="relative mt-10">
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="w-full border-t " />
                </div>
                <div className="relative flex justify-center text-sm font-medium leading-6">
                  <span className=" bg-[#24292F]">Or continue with</span>
                </div>
              </div>

              <div className="mt-6">
                <GoogleLoginButton />
              </div>
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
        </div>
      </div>
    </>
  );
}
