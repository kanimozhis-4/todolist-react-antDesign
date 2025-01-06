// import React ,{useEffect,useState} from 'react'
// import { TodoistApi } from "@doist/todoist-api-typescript" 


// function API() {
//     // const [count,setCount]=useState(0)
//     const api = new TodoistApi(import.meta.env.VITE_API_KEY)
//     const getInitialData=()=>{ 

//         // get all project
//     //     api.getProjects()
//     // .then((projects) => console.log(projects))
//     // .catch((error) => console.log(error))

//     //    create project
//         // api.addProject({ name: "abdul-sumaya-rithvana" , color:"violet",is_favorite:true})
//         // .then((project) => console.log(project))
//         // .catch((error) => console.log(error))
//         api.addProject({name: 'hjjkjkjk', color: "red", is_favorite: true})
//         .then((project) => console.log(project))
//         .catch((error) => console.log(error))
         
//     // //   get project
//     //     api.getProject("2345685133")
//     //     .then((project) => console.log(project))
//     //     .catch((error) => console.log(error))
//     } 
   
    

//   return (
//     <>
//         <div>API 
            
//         </div> 
//         <button className='border-black-200 bg-gray-100 p-4' onClick={getInitialData}>click here</button>
//     </>
//   )
// }

// export default API

import React, { useState, useContext } from 'react';
import { Layout, Card, Button, Input } from 'antd';
import { ProjectsContext } from '../contexts/ProjectContext';
import { PlusOutlined } from '@ant-design/icons';

const { Content } = Layout;

const DisplayContents = () => {
  const [isBoxVisible, setIsBoxVisible] = useState(false); // Controls visibility of the task box
  const [taskName, setTaskName] = useState(""); // State for task input
  const { selectedProject } = useContext(ProjectsContext);

  // Toggle visibility of the box when + icon is clicked
  const toggleBoxVisibility = () => {
    setIsBoxVisible(!isBoxVisible);
  };

  // Handle task input change
  const handleTaskNameChange = (e) => {
    setTaskName(e.target.value);
  };

  // Handle Save action
  const handleSave = () => {
    console.log('Task created:', taskName);
    setTaskName(""); // Clear the input field
    setIsBoxVisible(false); // Close the box after saving
  };

  return (
    <Content>
      <div className="flex flex-col items-center m-4 space-y-4">
        <span className="text-xl font-bold">{selectedProject}</span>
        <div className="flex flex-row space-x-2">
          <PlusOutlined
            className="text-red-500 cursor-pointer"
            onClick={toggleBoxVisibility} // Toggle the box visibility
          />
          <h5 className="text-gray-500">Add Task</h5>
        </div>

        {/* Conditionally render the Card */}
        {isBoxVisible && (
          <Card
            title="Create New Task"
            bordered={true}
            style={{ width: '100%', marginTop: '16px' }}
            extra={<Button onClick={() => setIsBoxVisible(false)}>Cancel</Button>}
          >
            <div className="flex flex-col space-y-4">
              <Input
                placeholder="Task name"
                value={taskName}
                onChange={handleTaskNameChange}
              />
              <div className="flex justify-end space-x-2">
                <Button onClick={() => setIsBoxVisible(false)}>Cancel</Button>
                <Button type="primary" onClick={handleSave}>Save</Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </Content>
  );
};

export default DisplayContents;
