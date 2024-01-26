import { createFromIconfontCN } from "@ant-design/icons";
import { useIsPending } from "~/hooks";
import { Form } from "@remix-run/react";
import { AuthenticityTokenInput } from "remix-utils/csrf/react";
import { Button } from "@/components/ui/button";

const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js",
});

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
        <IconFont type="icon-tuichu" /> Logout
      </Button>
    </Form>
  );
};

export default LogOutButton;
