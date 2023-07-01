import { Typography, Image, Card, Row, Col } from "antd";
import { GenerateIconForm } from "./components";
import { useActionData, useNavigation } from "@remix-run/react";
import { fallbackImageSource } from "~/utils";

const GenerateIconPage = () => {
  const actionData = useActionData();
  const navigation = useNavigation();
  const isLoadingData = navigation.state !== "idle";

  console.log(actionData);

  const imagesGenerated = actionData && actionData.image ? true : false;

  return (
    <Row gutter={[16, 16]}>
      <Col span={12}>
        <Typography.Title level={3}>Generate Icon</Typography.Title>
        <GenerateIconForm />
      </Col>
      <Col span={12}>
        <Typography.Title level={3}>Icons Generated</Typography.Title>
        <Card
          loading={isLoadingData}
          style={{ minHeight: 400 }}
          bodyStyle={{ textAlign: imagesGenerated ? "initial" : "center" }}
        >
          {imagesGenerated ? (
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
                fallback={fallbackImageSource}
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
