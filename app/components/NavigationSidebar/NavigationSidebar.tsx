import { Avatar, Button, Layout, Space, Typography } from "antd";
import {
  BellOutlined,
  BookOutlined,
  PlusCircleOutlined,
  SearchOutlined,
  ToolOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { UserAvatar } from "~/components";
import { ThemeSwitch } from "../ThemeSwitch";
import PixelStudioIcon from "../PixelStudioIcon/PixelStudioIcon";
import { Link } from "@remix-run/react";
import { useLoggedInUser } from "~/hooks";

const NavigationSidebar = () => {
  // const userData = React.useContext(UserContext);
  const userData = useLoggedInUser();
  const isLoggedIn = Boolean(userData?.id);

  const NAV_LINKS = [
    {
      title: "Explore",
      icon: <SearchOutlined />,
      href: "/explore",
    },
    {
      title: "Collections",
      icon: <BookOutlined />,
      href: "/collections",
    },
    {
      title: "Create",
      icon: <PlusCircleOutlined />,
      href: "/create",
    },
    {
      title: "Profile",
      icon: <UserOutlined />,
      href: `/profile/${userData?.username || ""}`,
    },
    {
      title: "Manage",
      icon: <ToolOutlined />,
      href: "/manage",
    },
  ];

  const navLinksToRender = isLoggedIn
    ? NAV_LINKS
    : [
        {
          title: "Explore",
          icon: <SearchOutlined />,
          href: "/explore",
        },
      ];

  return (
    <>
      <div
        className="hidden md:flex flex-shrink-0 flex-200 fixed top-0 left-0 bottom-0 z-10 bg-black"
        style={{
          borderRight: "rgb(38, 38, 38) 1px solid",
        }}
      >
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1">
            <div className="flex-1 flex flex-col px-3 py-5 overflow-y-auto">
              <div>
                <Link to="/" className="flex px-4 align-baseline">
                  <div className="w-8 mr-3">
                    <PixelStudioIcon />
                  </div>
                  <h2 className="text-2xl m-0">Pixel Studio</h2>
                </Link>
              </div>
              <nav className="mt-10 flex-1 px-2 space-y-1">
                {navLinksToRender.map((link) => (
                  <div>
                    <Link
                      className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-lg font-medium rounded-md"
                      // className="bg-gray-900 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                      to={link.href}
                    >
                      <span className="flex mr-4">{link.icon}</span>
                      {link.title}
                    </Link>
                  </div>
                ))}

                {/* <Link
                  className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-lg font-medium rounded-md"
                  href="#"
                >
                  <BellOutlined />
                  Notifications
                  <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                    3
                  </span>
                </Link> */}
              </nav>
              <div className="flex items-center px-4">
                {isLoggedIn ? (
                  <div>
                    <Space>
                      <UserAvatar />
                      <div className="flex flex-col">
                        <span>{userData?.name}</span>
                        <Typography.Link
                          type="secondary"
                          strong
                          href={`/profile/${userData?.username}`}
                        >
                          {userData?.username}
                        </Typography.Link>
                      </div>
                    </Space>
                  </div>
                ) : (
                  <Button className="w-full" href="/login">
                    Sign In
                  </Button>
                )}

                {/* <img
                  className="rounded-full h-10 w-10"
                  height="40"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "40/40",
                    objectFit: "cover",
                  }}
                  width="40"
                />
                <div className="ml-3">
                  <p className="text-white text-sm font-medium">John Doe</p>
                  <p className="text-gray-400 text-sm">View profile</p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="flex flex-col min-w-0 flex-1 overflow-hidden"
        style={{
          borderBottom: "rgb(38, 38, 38) 1px solid",
        }}
      >
        <div className="md:hidden">
          <div
            className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between bg-black py-4 px-5"
            style={{
              borderBottom: "rgb(38, 38, 38) 1px solid",
            }}
          >
            <div>
              <Link to="/" className="flex align-baseline">
                <div className="w-8 mr-3">
                  <PixelStudioIcon />
                </div>
                <h2 className="text-2xl m-0">Pixel Studio</h2>
              </Link>
            </div>

            {/* <div className="w-3"> */}
            {/* <div className="w-8">
                <PixelStudioIcon />
              </div> */}
            {/* </div> */}
            {isLoggedIn && (
              <div className="flex items-center">
                <UserAvatar />
              </div>
            )}
          </div>
          <div
            className="fixed bottom-0 left-0 right-0 z-10 flex items-center justify-around bg-black py-4"
            style={{
              borderTop: "rgb(38, 38, 38) 1px solid",
            }}
          >
            {navLinksToRender.map((link) => (
              <Link
                className="text-white group flex items-center px-2 py-2 text-medium font-medium rounded-md"
                // className="bg-gray-900 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                to={link.href}
              >
                <span>{link.icon}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavigationSidebar;
