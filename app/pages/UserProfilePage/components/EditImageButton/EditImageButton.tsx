import React from "react";
import { EditOutlined } from "@ant-design/icons";
import {
  Typography,
  Button,
  notification,
  Modal,
  Form,
  Input,
  Image,
  Space,
} from "antd";
import type { ImageType } from "~/types";
import { useRemixFetcher } from "~/hooks";
import { fallbackImageSource } from "~/utils";

const EditImageButton = ({ image }: { image: ImageType }) => {
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
  const [showEditImageModal, setShowEditImageModal] = React.useState(false);
  const toggleEditImageModal = () => setShowEditImageModal(!showEditImageModal);

  const isLoadingData = isLoadingFetcher;

  const handleSubmitEditImageData = () => {
    formInstance.submit();
  };

  const handleSubmitForm = (formValues: { title: string }) => {
    console.log(formValues);
    toggleEditImageModal();

    fetcher.submit(
      { intent: "image-edit-image-data", body: JSON.stringify(formValues) },
      { method: "PATCH", action: `/api/image/${image.id}?index` },
    );
  };

  return (
    <>
      <Button
        size="small"
        icon={<EditOutlined />}
        style={{ border: "none", textAlign: "left" }}
        loading={isLoadingData}
        onClick={toggleEditImageModal}
      >
        Edit
      </Button>
      <Modal
        open={showEditImageModal}
        footer={false}
        onCancel={toggleEditImageModal}
      >
        <div>
          <div
            style={{
              background: "#000",
              width: "100%",
              textAlign: "center",
            }}
          >
            <Image
              width={300}
              src={image.thumbnailURL}
              alt={image.title}
              fallback={fallbackImageSource}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div style={{ padding: 20 }}>
            <div style={{ marginBottom: 12 }}>
              <Typography.Text>Edit Image</Typography.Text>
            </div>
            <Form
              form={formInstance}
              layout="vertical"
              colon={false}
              initialValues={{ title: image.title || undefined }}
              onFinish={handleSubmitForm}
            >
              <Form.Item label="Title" name="title">
                <Input placeholder="Enter title of image" />
              </Form.Item>
              <Form.Item label="Engine Model">
                <Typography.Text italic>{image.model}</Typography.Text>
              </Form.Item>
              <Form.Item label="Prompt">
                <Typography.Text italic>{image.prompt}</Typography.Text>
              </Form.Item>
            </Form>
            <footer style={{ display: "flex", justifyContent: "flex-end" }}>
              <Space>
                <Button onClick={toggleEditImageModal}>Cancel</Button>
                <Button onClick={handleSubmitEditImageData} type="primary">
                  OK
                </Button>
              </Space>
            </footer>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default EditImageButton;
