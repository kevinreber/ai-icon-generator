import React from "react";
import { notification, Typography } from "antd";

const CopyToClipboardButton = ({ stringToCopy }: { stringToCopy: string }) => {
  const handleCopyToClipboard = () => {
    notification.success({
      message: <Typography.Paragraph strong>Copied to clipboard:</Typography.Paragraph>,
      description: <Typography.Paragraph>{stringToCopy}</Typography.Paragraph>,
    });
  };

  return (
    <>
      <Typography.Text copyable={{ text: stringToCopy, onCopy: handleCopyToClipboard }} />
    </>
  );
};

export default CopyToClipboardButton;
