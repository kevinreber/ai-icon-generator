import { Typography, Card, Space } from "antd";
import { CreateImageForm } from "./components";
import { useActionData, useNavigation } from "@remix-run/react";
import type { ImageType } from "~/types";
import { type CreateImagePageActionData } from "~/routes/create._index";
import { AddImagesToCollectionButton } from "~/components";
import PageContainer from "~/components/PageContainer";

import React from "react";

const CreateImagePage = () => {
  const actionData = useActionData() as CreateImagePageActionData;
  const navigation = useNavigation();
  const isLoadingData = navigation.state !== "idle";

  console.log(actionData);

  const imagesGenerated = Boolean(actionData && actionData.images);

  return (
    <PageContainer className="mb-20">
      <div className="flex flex-col lg:flex-row lg:justify-between h-full">
        <div className="flex flex-col lg:p-4 w-full">
          <Typography.Title level={3}>Create Images</Typography.Title>
          <CreateImageForm />
        </div>

        <div className="flex flex-col lg:p-4 w-full">
          <Space className="flex justify-between">
            <Typography.Title level={3}>Images Generated</Typography.Title>
            <AddImagesToCollectionButton images={actionData?.images || []} />
          </Space>

          <Card
            loading={isLoadingData}
            style={{ minHeight: 493 }}
            bodyStyle={{
              textAlign: imagesGenerated ? "initial" : "center",
              height: "100%",
              width: "100%",
            }}
          >
            {imagesGenerated ? (
              <div className="flex flex-wrap w-full h-full gap-4">
                {actionData.images.map((image: ImageType) => {
                  return (
                    <React.Fragment key={image.id}>
                      <div
                        className="relative overflow-hidden max-w-[200px] max-h-[200px] w-full"
                        // !? TODO: Should open up Modal where users can edit image
                        // onClick={() => handleImageClick(image)}
                      >
                        <a href={`/p/${image.id}`} target="_blank">
                          <img
                            className="inset-0 object-cover absolute w-full h-full"
                            src={image.thumbnailURL}
                            alt={image.prompt}
                          />
                        </a>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            ) : (
              <Typography.Text italic disabled>
                Images generated will appear here
              </Typography.Text>
            )}
          </Card>
        </div>
      </div>
    </PageContainer>
  );
};

export default CreateImagePage;
