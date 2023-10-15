import React, { useState } from "react";
import { Layout } from "antd";
import { Outlet, Navigate } from "react-router-dom";
import { isUserLoggedIn } from "@/utils/index";
import SideBar from "@/components/sideBarComponent";
import NavbarComponent from "@/components/navbarComponent";

const AdminLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  if (!isUserLoggedIn()) {
    return <Navigate to="/login" />;
  }

  return (
    <Layout className="layout__admin-private">
      <SideBar collapsed={collapsed} setCollapsed={setCollapsed}/>
      <NavbarComponent collapsed={collapsed} setCollapsed={setCollapsed}>
        <Outlet />
      </NavbarComponent>
    </Layout>
  );
};

export default AdminLayout;
