import React, { createElement, useState } from "react";
import { Layout, Menu, Avatar } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import "./index.scss";
import navItems from "../../utilities/navItems";
import { useNavigate } from "react-router-dom";

const { Content, Header, Sider } = Layout;

const Dashboard = ({ childern }) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const currentUser = localStorage.getItem("current_user");
  const currentUserEmail = localStorage.getItem("current_user_email");

  const onMenuChange = ({ key }) => {
    if (key === "logout") {
      localStorage.removeItem("access_token");
      localStorage.removeItem("current_user");
      localStorage.removeItem("current_user_email");
      return navigate(`/login`);
    }
    return navigate(`/${key}`);
  };

  return (
    <Layout className="dashboard">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        {collapsed ? (
          <div className="logo-space">
            {currentUser ? (
              <Avatar
                style={{
                  backgroundColor: "#f56a00",
                  verticalAlign: "middle",
                }}
              >
                {currentUser.slice(0, 1).toUpperCase()}
              </Avatar>
            ) : (
              <h1>C</h1>
            )}
          </div>
        ) : (
          <div className="logo-space">
            {currentUser ? (
              <Avatar
                style={{
                  backgroundColor: "#f56a00",
                  verticalAlign: "middle",
                }}
              >
                {currentUser.slice(0, 1).toUpperCase()}
              </Avatar>
            ) : (
              <h1>Campus App</h1>
            )}
            <h2>{currentUser}</h2>
            <span>@{currentUserEmail || "campus"}</span>
          </div>
        )}

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["deposit"]}
          items={navItems}
          onClick={onMenuChange}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: "trigger",
            onClick: () => setCollapsed(!collapsed),
          })}
        </Header>
        <Content
          className="site-layout-background"
          style={{ margin: "24px 16px", padding: 24, minHeight: 280 }}
        >
          {childern}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
