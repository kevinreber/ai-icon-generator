import { createFromIconfontCN } from "@ant-design/icons";
import { useIsPending } from "~/hooks";
import { Form } from "@remix-run/react";
import { AuthenticityTokenInput } from "remix-utils/csrf/react";

const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js",
});

const LogOutButton = () => {
  const isPending = useIsPending();

  return (
    <Form action="/logout" method="POST">
      <button
        type="submit"
        style={{ width: 130 }}
        className="w-full border-solid border-1 border-gray-600 rounded-md p-2  hover:bg-gray-800"
        disabled={isPending}
      >
        <AuthenticityTokenInput />
        <IconFont type="icon-tuichu" /> Logout
      </button>
    </Form>
  );
};

export default LogOutButton;
