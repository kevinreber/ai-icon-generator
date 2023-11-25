import React from "react";
import { Form, useLoaderData, useSearchParams } from "@remix-run/react";
import { Typography } from "antd";
import { ImageV2 } from "~/components";
import { type ExplorePageLoader } from "~/routes/explore";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

/**
 *
 * TODO: Try to get endless scroll working on this page. Use this blog for reference: https://dev.to/vetswhocode/infinite-scroll-with-remix-run-1g7
 */

const ExplorePage = () => {
  const loaderData = useLoaderData<ExplorePageLoader>();
  const images = loaderData.data || [];
  const [searchParams] = useSearchParams();
  const initialSearchTerm = searchParams.get("q") || "";
  const [searchTerm, setSearchTerm] = React.useState(initialSearchTerm);

  return (
    <>
      <div className="flex flex-col justify-between w-full">
        <Typography.Title level={3}>Explore</Typography.Title>
        <div className="w-full max-w-5xl">
          <Form action="/explore" method="GET">
            <div className="mt-2 flex rounded-md shadow-sm">
              <div className="relative flex flex-grow items-stretch focus-within:z-10">
                <input
                  type="text"
                  name="q"
                  id="q"
                  className="bg-inherit block w-full rounded-l-md border-0 py-1.5 px-2 text-white ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-600"
              >
                <MagnifyingGlassIcon
                  className="-ml-0.5 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </button>
            </div>
          </Form>
        </div>
      </div>
      <div className="container pt-8 max-w-5xl">
        {/* highlight on hover reference: https://www.hyperui.dev/blog/highlight-hover-effect-with-tailwindcss */}
        <ul className="grid grid-cols-3 gap-1 lg:gap-4">
          {images.map((image) => {
            return (
              <li key={image.id} className="hover:!opacity-60">
                <ImageV2 imageData={image} />
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default ExplorePage;
