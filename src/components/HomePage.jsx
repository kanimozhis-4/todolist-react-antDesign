import React, { useState } from "react";
import { Layout, Button} from "antd";
import {
  LayoutOutlined,
} from "@ant-design/icons";

import "antd/dist/reset.css"; 
import "../index.css"; 
import SideBar from "./SideBar";

import DisplayContent from "./Display/DisplayContent";


function HomePage() {
  const [collapsed, setCollapsed] = useState(false);
 
  return (
    <Layout className="min-h-screen ">
      <SideBar collapsed={collapsed}
      setCollapsed={setCollapsed}
      />
      {collapsed && (
        <div>
          <Button
            type="text"
            className="text-gray-600  m-2 ml-6"
            onClick={()=>setCollapsed(!collapsed)}
            icon={<LayoutOutlined />}
          />
        </div>
      )}
    
        <DisplayContent collapsed={collapsed}
      setCollapsed={setCollapsed}></DisplayContent>
        
      
    </Layout> 
    
  );
}

export default HomePage;
