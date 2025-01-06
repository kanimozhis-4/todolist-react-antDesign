import React from 'react'
import {  Tooltip,Avatar } from "antd";
import {
  
    ScheduleOutlined
  } from "@ant-design/icons";
const Upcoming = () => {
  return (
    <Tooltip
    placement="right"
    title={
      <span>
        Go To Upcoming{" "}
        <span className="bg-gray-600 text-white px-1 rounded mr-1 ">
          G
        </span>
        then{" "}
        <span className="bg-gray-600 text-white px-1 rounded ">U</span>
      </span>
    }
  >
    <div className="flex gap-4 items-center hover:bg-gray-300 hover:rounded cursor-pointer">
      <ScheduleOutlined className="w-7 h-7 text-xl font-semibold text-gray-500"></ScheduleOutlined>
      <span className="font-normal">Upcoming</span>
    </div>
  </Tooltip>
  )
}

export default Upcoming