import React, { useContext, useState } from "react";
import { Layout, Button} from "antd";
import {
  LayoutOutlined,
} from "@ant-design/icons";

import "antd/dist/reset.css"; 
import "../index.css"; 
import SideBar from "./SideBar";

import DisplayContent from "./Display/DisplayContent";
import { ProjectsContext } from "../contexts/ProjectContext";


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
    
        <DisplayContent></DisplayContent>
        
      
    </Layout> 
    
  );
}

export default HomePage;
