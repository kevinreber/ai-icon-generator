import React from "react";
import { Form, Switch } from "antd";
import type { ImageType } from "~/types";
import { useRemixFetcher } from "~/hooks";

const ToggleIsImagePrivateButton = ({ image }: { image: ImageType }) => {
  const { fetcher, isLoadingFetcher } = useRemixFetcher({
    // onSuccess: (response) => {
    //   notification.success({ message: response.data.message });
    // },
    // onError: (error) => {
    //   console.error(error);
    //   notification.error({ message: error.data.message });
    // },
  });
  const [formInstance] = Form.useForm();

  const isLoadingData = isLoadingFetcher;

  const handleSubmitEditImageData = () => {
    formInstance.submit();
  };

  const handleSubmitForm = (formValues: { title: string }) => {
    fetcher.submit(
      { intent: "image-edit-image-privacy", body: JSON.stringify(formValues) },
      { method: "PATCH", action: `/api/image/${image.id}?index` },
    );
  };

  return (
    <Form
      form={formInstance}
      colon={false}
      initialValues={{
        private: image.private,
      }}
      onFinish={handleSubmitForm}
      disabled={isLoadingData}
    >
      <Form.Item
        label="Private"
        name="private"
        valuePropName="checked"
        style={{ margin: 0 }}
      >
        <Switch
          size="small"
          loading={isLoadingData}
          onClick={handleSubmitEditImageData}
        />
      </Form.Item>
    </Form>
  );
};

export default ToggleIsImagePrivateButton;
