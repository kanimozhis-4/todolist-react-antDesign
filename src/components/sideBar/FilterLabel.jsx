import React from 'react'
import {  Tooltip,Avatar } from "antd";
import {
  
    AppstoreOutlined
  } from "@ant-design/icons";
const FilterLabel = () => {
  return (
    <Tooltip
    placement="right"
    title={
      <span>
        Go To Filters & Labels
        <span className="bg-gray-600 text-white px-1 rounded ml-1 mr-1">
          G
        </span>
        then{" "}
        <span className="bg-gray-600 text-white px-1 rounded ">V</span>
      </span>
    }
  >
    <div className="flex gap-4 items-center hover:bg-gray-300 hover:rounded cursor-pointer">
      <AppstoreOutlined className="w-7 h-7 text-xl font-semibold text-gray-500"></AppstoreOutlined>
      <span className="font-normal">Filters & Labels</span>
    </div>
  </Tooltip>
  )
}

export default FilterLabel