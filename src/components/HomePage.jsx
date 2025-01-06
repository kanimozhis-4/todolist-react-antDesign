import React, { useContext, useState } from "react";
import { Layout, Button} from "antd";
import {
  MenuOutlined,
  EllipsisOutlined,
  LayoutOutlined,
  MessageOutlined,
  // PlusOutlined
} from "@ant-design/icons";

import "antd/dist/reset.css"; // Ensure Ant Design styles are imported
import "../index.css"; // Include Tailwind styles
import SideBar from "./SideBar";

import DisplayContent from "./Display/DisplayContent";
import { ProjectsContext } from "../contexts/ProjectContext";

// const { Header, Content, Footer } = Layout;
const { Sider, Content, Header } = Layout;

function HomePage() {
  const {collapsed,toggleSidebar}=useContext(ProjectsContext)
 
  return (
    <Layout className="min-h-screen ">
      <SideBar 
      />
      {collapsed && (
        <div>
          <Button
            type="text"
            className="text-gray-600  m-2 ml-6"
            onClick={toggleSidebar}
            icon={<LayoutOutlined />}
          />
        </div>
      )}
      {/* <Layout>
        <Header className=" p-3 h-auto bg-gray-100">
          <div className="flex justify-end gap-2 items-center ">
            <div className="flex gap-2">
              <MenuOutlined />
              <span>View</span>
            </div>

            {<MessageOutlined className="ml-6" />}
            {<EllipsisOutlined className="text-xl" />}
          </div>
        </Header>   */}
        <DisplayContent></DisplayContent>
        
      {/* </Layout>  */}
      
    </Layout> 
    
  );
}

export default HomePage;
