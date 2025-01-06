import React from "react";
import {  Tooltip,Avatar } from "antd";
function Task() {
  const handleTask =()=>{
    
  }
  return (
    <Tooltip
      placement="right"
      title={
        <span>
          Add Task{" "}
          <span className="bg-gray-600 text-white px-1 rounded ">Q</span>{" "}
        </span>
      }
    >
      <div className="flex gap-4 items-center hover:bg-gray-300 hover:rounded cursor-pointer">
        <Avatar className=" w-7 h-7 bg-red-700 text-lg text-white font-semibold ">
          +
        </Avatar>
        <span className="text-red-700"
        onClick={handleTask}
        >Add Task</span>
      </div>
    </Tooltip>
  );
}

export default Task;
