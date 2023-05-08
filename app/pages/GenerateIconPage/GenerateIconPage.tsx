import { Typography, Image, Card, Row, Col } from "antd";
import { GenerateIconForm } from "./components";
import { useActionData, useNavigation } from "@remix-run/react";

const GenerateIconPage = () => {
  const actionData = useActionData();
  const navigation = useNavigation();
  const isLoadingData = navigation.state !== "idle";

  console.log(actionData);

  return (
    <Row gutter={[16, 16]}>
      <Col span={12}>
        <Typography.Title level={3}>Generate Icon</Typography.Title>
        <GenerateIconForm />
      </Col>
      <Col span={12}>
        <Typography.Title level={3}>Icons Generated</Typography.Title>
        <Card loading={isLoadingData} style={{ minHeight: 400 }}>
          {actionData && actionData.image ? (
            <Image.PreviewGroup
              preview={{
                onChange: (current, prev) =>
                  console.log(`current index: ${current}, prev index: ${prev}`),
              }}
            >
              <Image
                width={200}
                src={actionData.image}
                alt='Your generated icon'
              />
            </Image.PreviewGroup>
          ) : (
            <Typography.Text italic disabled>
              Icons generated will appear here
            </Typography.Text>
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default GenerateIconPage;
