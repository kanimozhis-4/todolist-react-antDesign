import React, { useContext, useState } from "react";
import { Layout, Menu, Button, Tooltip } from "antd";
import {
  LayoutOutlined,
} from "@ant-design/icons";
import { BellOutlined } from "@ant-design/icons"; // Bell icon from Ant Design
import { Badge, Avatar, Typography } from "antd";

import "antd/dist/reset.css"; // Ensure Ant Design styles are imported
import "../index.css"; // Include Tailwind styles
import Task from "./sideBar/Task";
import Search from "./sideBar/Search";
import Inbox from "./sideBar/Inbox";
import Today from "./sideBar/Today";
import Upcoming from "./sideBar/Upcoming";
import FilterLabel from "./sideBar/FilterLabel";
import Favorites from "./sideBar/favorites/Favorites";
import Projects from "./sideBar/projects/Projects";
import { ProjectsContext } from "../contexts/ProjectContext";

// const { Header, Content, Footer } = Layout;
const { Sider, Content, Header } = Layout;
const SideBar = () => {
  const {collapsed, toggleSidebar}=useContext(ProjectsContext)
  // console.log("in",collapsed);
 
  return (
    <Sider
      trigger={null} // Disable default trigger
      collapsed={collapsed}
      collapsible
      width={280}
      collapsedWidth={0} 
      style={{ backgroundColor: 'rgb(242, 238, 235)' }}
      className={`${collapsed ? "shadow-lg p-0" : "p-4"}`}
    >
      <div className="flex flex-col gap-6 group">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between  items-center gap-2 ">
            <Avatar className="w-7 h-7 text-sm font-semibold text-white bg-blue-800">
              K
            </Avatar>
            <div className="text-sm font-bold">skanimozhi48</div>
            <Tooltip
              title={
                <span>
                  Open Notifications{" "}
                  <span className="bg-gray-600 text-white px-1 rounded mr-1">
                    O
                  </span>
                  then{" "}
                  <span className="bg-gray-600 text-white px-1 rounded ">
                    N
                  </span>
                </span>
              }
              trigger="hover"
            >
              <Badge>
                <BellOutlined className="text-xl text-gray-600 "></BellOutlined>
              </Badge>
            </Tooltip>
            <Tooltip
              title={
                <span>
                  Open/close sidebar{" "}
                  <span className="bg-gray-600 text-white px-1 rounded ">
                    M
                  </span>{" "}
                </span>
              }
            >
              <div>
                <Button
                  type="text"
                  className="text-gray-600"
                  onClick={toggleSidebar}
                  icon={<LayoutOutlined />}
                />
              </div>
            </Tooltip>
          </div>
          <Task/>
          <Search/>
          <Inbox/>
         <Today/>
         <Upcoming/>
         <FilterLabel/>
        </div>
        <div className="flex flex-col gap-6">
          <Favorites />
           <Projects  />
        </div>
      </div>
    </Sider>
  );
};

export default SideBar;
