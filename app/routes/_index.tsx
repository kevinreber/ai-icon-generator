import { GoogleOutlined } from "@ant-design/icons";
import { Form } from "@remix-run/react";
import { SocialsProvider } from "remix-auth-socials";

const CONTAINER_STYLES = {
  width: "100%",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const BUTTON_STYLES = {
  padding: "15px 25px",
  background: "#dd4b39",
  border: "0",
  outline: "none",
  cursor: "pointer",
  color: "white",
  fontWeight: "bold",
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <Form
        method='post'
        action={`/auth/${SocialsProvider.GOOGLE}`}
        style={CONTAINER_STYLES}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          Please log in
          <button style={BUTTON_STYLES}>
            <GoogleOutlined /> Login with Google
          </button>
        </div>
      </Form>
    </div>
  );
}
