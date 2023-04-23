import { Typography, Image, Card } from "antd";
import { GenerateIconForm } from "./components";
import { useActionData, useNavigation } from "@remix-run/react";

const GenerateIconPage = () => {
  const actionData = useActionData();
  const navigation = useNavigation();
  const isLoadingData = navigation.state !== "idle";

  console.log(actionData);

  return (
    <div>
      <section>
        <Typography.Title level={3}>Generate Icon</Typography.Title>
        <GenerateIconForm />
      </section>
      <section>
        <Typography.Title level={3}>Icons Generated</Typography.Title>
        <Card loading={isLoadingData}>
          {actionData && actionData.imageUrl ? (
            <Image.PreviewGroup
              preview={{
                onChange: (current, prev) =>
                  console.log(`current index: ${current}, prev index: ${prev}`),
              }}
            >
              <Image
                width={200}
                src={actionData.imageUrl}
                alt='Your generated icon'
              />
            </Image.PreviewGroup>
          ) : (
            <Typography.Text italic disabled>
              Icons generated will appear here
            </Typography.Text>
          )}
        </Card>
      </section>
    </div>
  );
};

export default GenerateIconPage;
