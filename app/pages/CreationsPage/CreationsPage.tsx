import React from "react";
import { useLoaderData, useNavigation } from "@remix-run/react";
import {
  DeleteOutlined,
  DownloadOutlined,
  LikeOutlined,
  MessageOutlined,
  MoreOutlined,
  StarOutlined,
  TableOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import {
  Typography,
  Image,
  Card,
  Row,
  Col,
  Radio,
  List,
  Space,
  Button,
  Popconfirm,
  Tooltip,
  Popover,
  type RadioChangeEvent,
} from "antd";

const CreationsPage = () => {
  const data = useLoaderData();
  const navigation = useNavigation();
  const isLoadingData = navigation.state !== "idle";
  const imagesCreated = data.data || [];
  const totalImages = imagesCreated.length;
  const [displayImagesStyle, setDisplayImagesStyle] = React.useState("list");

  const handleImageDisplayChange = (event: RadioChangeEvent) => {
    console.log(event.target.value);
    setDisplayImagesStyle(event.target.value);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <Typography.Title level={3}>Creations</Typography.Title>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            maxWidth: 180,
            width: "100%",
            alignItems: "baseline",
          }}
        >
          <Typography.Text>Total Images: {totalImages}</Typography.Text>
          <div>
            <Radio.Group
              onChange={handleImageDisplayChange}
              // defaultValue='list'
              size='small'
              value={displayImagesStyle}
            >
              <Radio.Button value='list'>
                <UnorderedListOutlined />
              </Radio.Button>
              <Radio.Button value='grid'>
                <TableOutlined />
              </Radio.Button>
            </Radio.Group>
          </div>
        </div>
      </div>
      <Card
        loading={isLoadingData}
        style={{ minHeight: totalImages ? "" : 400 }}
        bodyStyle={{ textAlign: imagesCreated ? "initial" : "center" }}
      >
        {totalImages && displayImagesStyle === "grid" ? (
          <Image.PreviewGroup
            preview={{
              onChange: (current, prev) =>
                console.log(`current index: ${current}, prev index: ${prev}`),
            }}
          >
            <Row gutter={16}>
              {imagesCreated.map((image: any) => {
                return (
                  <Col key={image.id}>
                    <div style={{ marginBottom: 10 }}>
                      <Image width={200} src={image.url} alt={image.prompt} />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography.Text
                        ellipsis={{ tooltip: true }}
                        style={{ maxWidth: 160 }}
                      >
                        {image.prompt}
                      </Typography.Text>
                      <Popover
                        content={
                          <Space size='small'>
                            <Space.Compact direction='vertical'>
                              <Tooltip title='Download image'>
                                <Button
                                  size='small'
                                  icon={<DownloadOutlined />}
                                  style={{ border: "none", textAlign: "left" }}
                                >
                                  Download
                                </Button>
                              </Tooltip>
                              <Popconfirm
                                title='Delete this image'
                                description={
                                  <>
                                    Are you sure to delete the image:
                                    <br />
                                    <Typography.Text strong italic>
                                      {image.prompt}
                                    </Typography.Text>
                                    <br />
                                    <br />
                                    This action can not be undone
                                  </>
                                }
                                // onConfirm={confirm}
                                // onCancel={cancel}
                                okText='Yes'
                                cancelText='No'
                              >
                                <Button
                                  size='small'
                                  icon={<DeleteOutlined />}
                                  danger
                                  style={{ border: "none", textAlign: "left" }}
                                >
                                  Delete
                                </Button>
                              </Popconfirm>
                            </Space.Compact>
                          </Space>
                        }
                      >
                        <Button
                          icon={<MoreOutlined rotate={90} />}
                          style={{ border: "none" }}
                        />
                      </Popover>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </Image.PreviewGroup>
        ) : totalImages && displayImagesStyle === "list" ? (
          <List
            itemLayout='vertical'
            size='small'
            // size='large'
            // pagination={{
            //   onChange: (page) => {
            //     console.log(page);
            //   },
            //   pageSize: 3,
            // }}
            dataSource={imagesCreated}
            renderItem={(image: {
              id: string;
              prompt: string;
              url: string;
              createdAt: Date;
            }) => (
              <List.Item
                key={image.id}
                extra={
                  <Space>
                    <Tooltip title='Download image'>
                      <Button
                        icon={<DownloadOutlined />}
                        style={{ border: "none" }}
                      />
                    </Tooltip>
                    <Popconfirm
                      title='Delete this image'
                      description={
                        <>
                          Are you sure to delete the image:
                          <br />
                          <Typography.Text strong italic>
                            {image.prompt}
                          </Typography.Text>
                          <br />
                          <br />
                          This action can not be undone
                        </>
                      }
                      // onConfirm={confirm}
                      // onCancel={cancel}
                      okText='Yes'
                      cancelText='No'
                    >
                      <Button
                        icon={<DeleteOutlined />}
                        danger
                        style={{ border: "none" }}
                      />
                    </Popconfirm>
                  </Space>
                }
              >
                <List.Item.Meta
                  avatar={
                    <Image width={100} src={image.url} alt={image.prompt} />
                  }
                  title={image.prompt}
                  description={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <Button icon={<StarOutlined />} type='link'>
                          156
                        </Button>
                        <Button icon={<LikeOutlined />} type='link'>
                          156
                        </Button>
                        <Button icon={<MessageOutlined />} type='link'>
                          2
                        </Button>
                      </div>
                      <Typography.Text>
                        {new Date(image.createdAt).toLocaleString()}
                      </Typography.Text>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        ) : (
          <Typography.Text italic disabled>
            Icons generated will appear here
          </Typography.Text>
        )}
      </Card>
    </>
  );
};

export default CreationsPage;
