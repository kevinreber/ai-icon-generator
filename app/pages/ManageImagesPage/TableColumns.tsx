import { Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { ImageType } from "~/types";
import {
  DeleteImageButton,
  DownloadImageButton,
  EditImageButton,
} from "./components";
import { ToggleIsImagePrivateButton } from "./components/ToggleIsImagePrivateButton";
import { CopyToClipboardButton, ImageModal } from "~/components";

export const TABLE_COLUMNS: ColumnsType<ImageType> = [
  {
    title: "Image",
    dataIndex: "title",
    render: (_, record) => (
      <div className="flex items-center">
        <div className="h-24 w-24 flex-shrink-0">
          {/* <img className="h-24 w-24" src={record.url} alt={record.prompt} /> */}
          <ImageModal imageData={record} />
        </div>
        <div className="ml-4">
          <div className="font-medium ">{record.title || "Untitled"}</div>
          <div className="mt-1 text-gray-500">
            {record.prompt}{" "}
            <CopyToClipboardButton stringToCopy={record.prompt} />
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Private",
    dataIndex: "private",
    render: (_, record) => <ToggleIsImagePrivateButton image={record} />,
  },
  {
    title: "Created",
    dataIndex: "createdAt",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    render: (_, record) => {
      return (
        <Space>
          <EditImageButton image={record} />
          <DownloadImageButton image={record} />
          <DeleteImageButton image={record} />
        </Space>
      );
    },
  },
];
