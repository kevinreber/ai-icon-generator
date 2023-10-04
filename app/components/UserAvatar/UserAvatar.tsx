import React from "react";
import {
  Popover,
  Button,
  Avatar,
  Space,
  Modal,
  Form,
  Input,
  notification,
  Typography,
} from "antd";
import {
  DollarOutlined,
  EditOutlined,
  UserOutlined,
  createFromIconfontCN,
} from "@ant-design/icons";
import { useRemixFetcher } from "~/hooks";
import { UserContext } from "~/context";

const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js",
});

const UserAvatar = () => {
  const userData = React.useContext(UserContext);

  const { fetcher, isLoadingFetcher } = useRemixFetcher({
    // onSuccess: (response) => {
    //   notification.success({ message: response.message });
    // },
    // onError: (response) => {
    //   notification.error({ message: response.message });
    // },
  });
  const [formInstance] = Form.useForm();
  const [showEditProfileModal, setShowEditProfileModal] = React.useState(false);

  const handleLogOut = () => {
    fetcher.submit(
      { intent: "user-log-out" },
      { method: "post", action: "/logout" }
    );
    notification.success({ message: "Successfully logged out" });
  };

  const handleSubmitEditUserData = () => {
    formInstance.submit();
  };

  const handleSubmitForm = (values: { username: string }) => {
    console.log(values);
    handleToggleModal();
    fetcher.submit(
      { intent: "user-update-user-data", body: JSON.stringify(values) },
      { method: "patch", action: "/api/user?index" }
    );

    console.log("Fetcher");
    console.log(fetcher);
  };

  const handleToggleModal = () => {
    setShowEditProfileModal(!showEditProfileModal);
  };

  return (
    <>
      <Popover
        placement='bottomRight'
        title={
          <Space>
            <Avatar style={{ cursor: "pointer" }} icon={<UserOutlined />} />
            <div style={{ display: "flex", flexDirection: "column" }}>
              {/* <Space direction='vertical' size='small'> */}
              <span>{userData.name}</span>
              <Typography.Link strong href={`/profile/${userData.id}`}>
                {userData.username}
              </Typography.Link>
            </div>
          </Space>
        }
        content={
          <Space align='center' direction='vertical' style={{ width: "100%" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Typography.Text>
                <DollarOutlined style={{ marginRight: 4 }} />
                {userData.credits} Credits
              </Typography.Text>
              <Button size='small' href='/checkout' type='link'>
                Buy Credits
              </Button>
            </div>
            <Button
              style={{ width: 130 }}
              icon={<EditOutlined />}
              onClick={handleToggleModal}
            >
              Edit Profile
            </Button>
            <Button
              style={{ width: 130 }}
              icon={<IconFont type='icon-tuichu' />}
              onClick={handleLogOut}
            >
              Logout
            </Button>
          </Space>
        }
        trigger='click'
      >
        <Avatar
          style={{ cursor: isLoadingFetcher ? "wait" : "pointer" }}
          icon={<UserOutlined />}
        />
      </Popover>
      <Modal
        title='Edit Profile'
        open={showEditProfileModal}
        onOk={handleSubmitEditUserData}
        onCancel={handleToggleModal}
      >
        <Form
          form={formInstance}
          layout='vertical'
          colon={false}
          initialValues={{ username: userData.username || undefined }}
          onFinish={handleSubmitForm}
        >
          <Avatar size='large' icon={<UserOutlined />} />
          {/* TODO */}
          {/* <Form.Item label='Avatar' name='avatar'> */}
          {/* </Form.Item> */}
          <Form.Item label='Username' name='username'>
            <Input placeholder='Enter username' />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UserAvatar;
