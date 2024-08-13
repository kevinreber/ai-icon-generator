import React from "react";
import { PlusCircleIcon as PlusCircleOutlined } from "@heroicons/react/24/outline";
import {
  Typography,
  Button,
  notification,
  Modal,
  Form,
  Input,
  Space,
} from "antd";

import { useRemixFetcher } from "~/hooks";

const CreateCollectionButton = () => {
  const [formInstance] = Form.useForm();
  const [showCreateCollectionModal, setShowCreateCollectionModal] =
    React.useState(false);
  const toggleCreateCollectionModal = () =>
    setShowCreateCollectionModal(!showCreateCollectionModal);

  const { fetcher, isLoadingFetcher } = useRemixFetcher({
    // onSuccess: (response) => {
    //   notification.success({ message: response.data.message });
    // },
    // onError: (error) => {
    //   console.error(error);
    //   notification.error({ message: error.data.message });
    // },
  });

  const isLoadingData = isLoadingFetcher;

  const handleSubmitNewCollection = () => {
    formInstance.submit();
  };

  const handleSubmitForm = (formValues: {
    title: string;
    description: string;
  }) => {
    toggleCreateCollectionModal();

    fetcher.submit(
      { intent: "_create_collection", body: JSON.stringify(formValues) },
      { method: "POST", action: `/api/collections` },
    );
  };

  return (
    <>
      <Button
        className="size-5"
        icon={<PlusCircleOutlined className="size-5" />}
        onClick={toggleCreateCollectionModal}
        loading={isLoadingData}
      >
        Create Collection
      </Button>
      <Modal
        title="Create New Collection"
        open={showCreateCollectionModal}
        onCancel={toggleCreateCollectionModal}
        onOk={handleSubmitNewCollection}
        okText="Create"
      >
        <Form
          form={formInstance}
          onFinish={handleSubmitForm}
          colon={false}
          layout="vertical"
          disabled={isLoadingData}
          initialValues={{ label: undefined, description: undefined }}
        >
          <Form.Item label="Title" name="title" required>
            <Input placeholder='Ex: "My Favorites, Inspiration"' />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input placeholder='Ex: "My Favorites AI generated images"' />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateCollectionButton;
