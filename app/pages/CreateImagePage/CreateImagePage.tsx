import { Typography, Image, Card, Row, Col, Space } from "antd";
import { CreateImageForm } from "./components";
import { useActionData, useNavigation } from "@remix-run/react";
import { fallbackImageSource } from "~/utils";
import type { ImageType } from "~/types";
import { type CreateImagePageActionData } from "~/routes/create._index";
import { AddImagesToCollectionButton } from "~/components";

const CreateImagePage = () => {
  const actionData = useActionData() as CreateImagePageActionData;
  const navigation = useNavigation();
  const isLoadingData = navigation.state !== "idle";

  console.log(actionData);

  const imagesGenerated = Boolean(actionData && actionData.images);

  return (
    <Row gutter={[16, 16]}>
      <Col span={12}>
        <Typography.Title level={3}>Create Images</Typography.Title>
        <CreateImageForm />
      </Col>
      <Col span={12}>
        <Space style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography.Title level={3}>Images Generated</Typography.Title>
          <AddImagesToCollectionButton images={actionData?.images || []} />
        </Space>

        <Card
          loading={isLoadingData}
          style={{ minHeight: 400 }}
          bodyStyle={{ textAlign: imagesGenerated ? "initial" : "center" }}
        >
          {imagesGenerated ? (
            // <Image.PreviewGroup
            //   preview={{
            //     onChange: (current, prev) =>
            //       console.log(`current index: ${current}, prev index: ${prev}`),
            //   }}
            // >
            <Row gutter={16}>
              {actionData.images.map((image: ImageType) => {
                return (
                  <Col key={image.id}>
                    <div style={{ marginBottom: 10 }}>
                      <Image
                        width={200}
                        src={image.url}
                        alt={image.prompt}
                        fallback={fallbackImageSource}
                        style={{ borderRadius: 12 }}
                        preview
                      />
                    </div>
                  </Col>
                );
              })}
            </Row>
          ) : (
            // </Image.PreviewGroup>
            <Typography.Text italic disabled>
              Images generated will appear here
            </Typography.Text>
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default CreateImagePage;
