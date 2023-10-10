import { Layout } from "antd";
import {
  Outlet,
  Navigate
} from "react-router-dom";
import { isUserLoggedIn } from "@/utils/index";
// import { NavBar, SideBar } from "../components";

const { Content } = Layout;
export default function AdminLayout() {
  if (!isUserLoggedIn()) {
      return <Navigate to='/login' />
  }
  return (
    <Layout >
      {/* <NavBar /> */}
      <div className="private-page">
        Private page
        {/* <SideBar /> */}
        <Content>
          <Outlet />
        </Content>
      </div>
    </Layout>
  );
}
