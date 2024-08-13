import React from "react";
import { PencilSquareIcon as EditOutlined } from "@heroicons/react/24/outline";
import { Button, notification, Modal, Form, Input, Space } from "antd";
import type { Collection } from "~/types";
import { useRemixFetcher } from "~/hooks";

const EditCollectionButton = ({ collection }: { collection: Collection }) => {
  const { fetcher, isLoadingFetcher } = useRemixFetcher({
    // onSuccess: (response) => {
    // const message =
    //   response.data.message || "Successfully updated collection";
    // notification.success({ message });
    // },
    onError: (error) => {
      console.error(error);
      // notification.error({ message: error.message });
    },
  });
  const [formInstance] = Form.useForm();
  const [showEditImageModal, setShowEditImageModal] = React.useState(false);
  const toggleEditImageModal = () => setShowEditImageModal(!showEditImageModal);

  const isLoadingData = isLoadingFetcher;

  const handleSubmitEditImageData = () => {
    formInstance.submit();
  };

  const handleSubmitForm = (formValues: { title: string }) => {
    toggleEditImageModal();

    fetcher.submit(
      { intent: "_edit_collection", body: JSON.stringify(formValues) },
      { method: "PATCH", action: `/api/collections/${collection.id}` },
    );
  };

  return (
    <>
      <Button
        size="small"
        icon={<EditOutlined className="size-5"/>}
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
          <Form
            form={formInstance}
            layout="vertical"
            colon={false}
            initialValues={{
              title: collection.title,
              description: collection.description || undefined,
            }}
            onFinish={handleSubmitForm}
          >
            <Form.Item label="Title" name="title">
              <Input placeholder="Enter title of image" />
            </Form.Item>
            <Form.Item label="Description" name="description">
              <Input placeholder="Enter collection description" />
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
      </Modal>
    </>
  );
};

export default EditCollectionButton;
