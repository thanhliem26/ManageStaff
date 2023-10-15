import { Menu } from "antd";
import { MenuItem, getItem } from "./constants";
import authApi from "@/api/auth";
import { useEffect, useState } from "react";
import { iconMenu } from "@/constants/index";
import { Skeleton } from "antd";

const skeleton = [
  getItem("Sketon", "1", <Skeleton active avatar />),
  getItem("Sketon", "2", <Skeleton active avatar />),
  getItem("Sketon", "3", <Skeleton active avatar />),
];

const MenuNavbar = () => {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  const handleGetMenu = async () => {
    try {
      setLoading(true);

      const { metadata } = await authApi.menu();

      const menu = metadata.map((item: metadataMenu) => {
        const IconComponent = iconMenu[item.icon];

        return getItem(item.label, item.id, <IconComponent />);
      });

      setMenu(menu);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetMenu();
  }, []);

  return (
    <>
      <Menu
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="dark"
        items={loading ? skeleton : menu}
      />
    </>
  );
};

export default MenuNavbar;
