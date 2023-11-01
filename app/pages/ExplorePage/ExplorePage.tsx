import React from "react";
import { useLoaderData } from "@remix-run/react";
import { Typography } from "antd";
import { ImageModal } from "~/components";
import { type ExplorePageLoader } from "~/routes/explore";

/**
 *
 * TODO: Try to get endless scroll working on this page. Use this blog for reference: https://dev.to/vetswhocode/infinite-scroll-with-remix-run-1g7
 */

const ExplorePage = () => {
  const loaderData = useLoaderData<ExplorePageLoader>();
  const images = loaderData.data || [];

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <Typography.Title level={3}>
          Explore AI Generated Images
        </Typography.Title>
      </div>
      <div className="container pt-8 max-w-5xl">
        {/* highlight on hover reference: https://www.hyperui.dev/blog/highlight-hover-effect-with-tailwindcss */}
        <ul className="grid grid-cols-3 gap-1 lg:gap-4 [&:hover>li]:opacity-50">
          {images.map((image) => {
            return (
              <li key={image.id} className="hover:!opacity-100">
                {/* @ts-ignore */}
                <ImageModal imageData={image} />
              </li>
            );
          })}

          {/* <div className="relative overflow-hidden w-full pt-[100%]">
              <img
                src="https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-1-800x800.jpg"
                className="absolute inset-0 object-cover w-full h-full"
                alt="..."
              />
            </div>
            <div className="relative overflow-hidden w-full pt-[100%]">
              <img
                src="https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-1-800x800.jpg"
                className="absolute inset-0 object-cover w-full h-full"
                alt="..."
              />
            </div>
            <div className="relative overflow-hidden w-full pt-[100%]">
              <img
                src="https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-1-800x800.jpg"
                className="absolute inset-0 object-cover w-full h-full"
                alt="..."
              />
            </div>
            <div className="relative overflow-hidden w-full pt-[100%]">
              <img
                src="https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-1-800x800.jpg"
                className="absolute inset-0 object-cover w-full h-full"
                alt="..."
              />
            </div> */}
        </ul>
      </div>
    </>
  );
};

export default ExplorePage;
