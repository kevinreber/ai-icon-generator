import { ArrowLeftIcon as LogoutIcon } from "@heroicons/react/24/outline";
import { useIsPending } from "~/hooks";
import { Form } from "@remix-run/react";
import { AuthenticityTokenInput } from "remix-utils/csrf/react";
import { Button } from "@/components/ui/button";

const LogOutButton = () => {
  const isPending = useIsPending();

  return (
    <Form action="/logout" method="POST">
      <Button
        type="submit"
        className="w-full  rounded-md p-2  hover:bg-gray-800"
        disabled={isPending}
        variant="outline"
      >
        <AuthenticityTokenInput />
        <LogoutIcon className="size-5" /> Logout
      </Button>
    </Form>
  );
};

export default LogOutButton;
