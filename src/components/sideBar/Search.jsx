import React from "react";
import { Tooltip, Avatar } from "antd";
import { SearchOutlined } from "@ant-design/icons";
const Search = () => {
  return (
    <Tooltip
      placement="right"
      title={
        <span>
          Open Quick Find{" "}
          <span className="bg-gray-600 text-white px-1 rounded mr-1 ">
            ctrl
          </span>
          <span className="bg-gray-600 text-white px-1 rounded ">K</span>{" "}
        </span>
      }
    >
      <div className="flex gap-4 items-center hover:bg-gray-300 hover:rounded cursor-pointer">
        <SearchOutlined className="w-7 h-7 text-xl font-semibold text-gray-500"></SearchOutlined>
        <span className="font-normal">Search</span>
      </div>
    </Tooltip>
  );
};

export default Search;
