import React, { useContext } from "react";
import { useGetIdentity } from "@refinedev/core";
import { Layout, Avatar, Typography, Space, Dropdown, Button } from "antd";
import { 
  LogoutOutlined, 
  UserOutlined, 
  MenuUnfoldOutlined, 
  MenuFoldOutlined 
} from "@ant-design/icons";
import { ColorModeContext } from "../contexts/color-mode";
import type { MenuProps } from "antd";

const { Header: AntdHeader } = Layout;
const { Text } = Typography;

interface HeaderProps {
  sticky?: boolean;
  collapsed?: boolean;
  setCollapsed?: (collapsed: boolean) => void;
}

type User = {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  [key: string]: any;
};

export const Header: React.FC<HeaderProps> = ({ 
  collapsed, 
  setCollapsed 
}) => {
  const { mode, setMode } = useContext(ColorModeContext);
  const { data: user } = useGetIdentity<User>();

  const headerStyles = {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "0 24px",
    height: "64px",
    backgroundColor: mode === "light" ? "#fff" : "#121212",
    boxShadow: mode === "light" 
      ? "0 4px 12px rgba(0, 0, 0, 0.08)" 
      : "0 4px 12px rgba(0, 0, 0, 0.3)",
    backdropFilter: "blur(8px)",
    position: "sticky" as const,
    top: 0,
    zIndex: 1000,
    width: "100%",
    borderRadius: 0,
    margin: 0,
    transition: "all 0.3s ease",
  };

  const items: MenuProps["items"] = [
    {
      label: "Profile",
      key: "profile",
      icon: <UserOutlined />,
    },
    {
      label: "Logout",
      key: "logout",
      icon: <LogoutOutlined />,
      danger: true,
    },
  ];

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key === "logout") {
      localStorage.removeItem("supabaseSession");
      window.location.href = "/login";
    }
  };

  return (
    <AntdHeader style={headerStyles} className="app-header-floating">
      <div className="flex items-center h-full flex-1">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed?.(!collapsed)}
          className="lg:hidden"
          style={{ border: 'none' }}
        />

        <div className="flex items-center gap-3 ml-4">
          <img 
            src="/logo.svg" 
            alt="SiloTech Logo" 
            className="h-8 w-8 hidden sm:block"
            style={{ filter: mode === "dark" ? "brightness(1.2)" : "none" }}
          />
          <span 
            className="text-lg font-semibold hidden md:block"
            style={{ 
              background: mode === "dark" 
                ? "linear-gradient(90deg, #fff 0%, #e6e6e6 100%)" 
                : "linear-gradient(90deg, #333 0%, #666 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}
          >
            SiloTech SongWriter
          </span>
        </div>
      </div>

      <Space>
        <Button
          type="text"
          icon={
            mode === "light" ? (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8V16Z"
                  fill="currentColor"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 4V8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16V20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z"
                  fill="currentColor"
                />
              </svg>
            ) : (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16V8Z"
                  fill="currentColor"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20V16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8V4Z"
                  fill="currentColor"
                />
              </svg>
            )
          }
          onClick={() => setMode()}
        />
        
        {user?.email && (
          <Dropdown
            menu={{
              items,
              onClick: handleMenuClick,
            }}
            trigger={["click"]}
          >
            <div className="flex items-center gap-2 cursor-pointer">
              <Avatar 
                src={user?.avatar} 
                alt={user?.name || user?.email}
                icon={<UserOutlined />}
              />
              <Text ellipsis strong className="hidden md:block">
                {user?.name || user?.email}
              </Text>
            </div>
          </Dropdown>
        )}
      </Space>
    </AntdHeader>
  );
};
