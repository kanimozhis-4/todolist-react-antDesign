import React from 'react'
import {  Tooltip,Avatar } from "antd";
import {
  
    CalendarOutlined
  } from "@ant-design/icons";
const Today = () => {
  return (
    <Tooltip
    placement="right"
    title={
      <span>
        Go To Today{" "}
        <span className="bg-gray-600 text-white px-1 rounded mr-1 ">
          G
        </span>
        then{" "}
        <span className="bg-gray-600 text-white px-1 rounded ">T</span>
      </span>
    }
  >
    <div className="flex gap-4 items-center relative  hover:bg-gray-300 hover:rounded cursor-pointer">
      <CalendarOutlined className="w-7 h-7 text-xl font-semibold text-gray-500" />

      <span className="font-normal">Today</span>
    </div>
  </Tooltip>
  )
}

export default Today