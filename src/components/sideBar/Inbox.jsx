import React from "react";
import {  Tooltip,Avatar } from "antd";
import {
  
    InboxOutlined
  } from "@ant-design/icons";
const Inbox = () => {
  return (
    <Tooltip
            placement="right"
            title={
              <span>
                Go To Inbox{" "}
                <span className="bg-gray-600 text-white px-1 rounded mr-1 ">
                  G
                </span>
                then{" "}
                <span className="bg-gray-600 text-white px-1 rounded ">I</span>
              </span>
            }
          >
            <div className="flex gap-4 items-center hover:bg-gray-300 hover:rounded cursor-pointer">
              <InboxOutlined className="w-7 h-7 text-xl font-semibold text-gray-500"></InboxOutlined>
              <span className="font-normal">Inbox</span>
            </div>
          </Tooltip>
  )
}

export default Inbox