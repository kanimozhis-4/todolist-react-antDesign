import React, { useContext, useState, useEffect } from "react";
import { Button, Card, Input, DatePicker, Dropdown, Space } from "antd";
import { ProjectsContext } from "../../contexts/ProjectContext";
import moment from "moment";
import _ from "lodash";
import { DownOutlined, CheckOutlined } from "@ant-design/icons";
import { TasksContext } from "../../contexts/TaskContext";
const TaskForm = ({ taskId, projectId ,selectedProject,setEditingTaskId}) => {
  const { allProjects, colorMapping } =
    useContext(ProjectsContext);
  const {
    newTask,
    addNewTask,
    setNewTask,
    allTask,
    editedTask,
  } = useContext(TasksContext);
  const [selectedProjectName, setSelectedProjectName] = useState({
    name: null,
    color: null,
  }); 
  
  let tempTask = {};
  useEffect(() => {
    if (taskId) {
      const taskToEdit = allTask.find((task) => task.id === taskId);
      if (taskToEdit) {
        setNewTask({
          content: taskToEdit.content,
          description: taskToEdit.description,
          due_date: taskToEdit.due?.date
            ? moment(taskToEdit.due.date, "YYYY-MM-DD")
            : null,
          project_id: taskToEdit.project_id,
        });
      }
      tempTask = {
        content: taskToEdit.content,
        description: taskToEdit.description,
        due_date: taskToEdit.due?.date
          ? moment(taskToEdit.due.date, "YYYY-MM-DD")
          : null,
        project_id: taskToEdit.project_id,
      };
    }
  }, []);
  const menuItems = allProjects.map((project) => ({
    key: project.name,
    label: (
      <span
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div>
          <span
            style={{
              color: colorMapping[project.color],
              marginRight: "8px",
            }}
          >
            #
          </span>
          {project.name}
        </div>
        {selectedProjectName?.name === project?.name && (
          <CheckOutlined
            style={{
              color: "red",
            }}
          />
        )}
      </span>
    ),
  }));
  let selectedProjectColor = "";
  if (selectedProject != "") {
    const project = allProjects.find(
      (project) => project.name === selectedProject.name
    );
    selectedProjectColor = project?.color;
  }

  const handleDropdown = (projectName) => {
    const project = allProjects.find(
      (project) => project.name == projectName.key
    );
    const selectedProject = {
      name: projectName.key,
      color: project.color,
    };
    setSelectedProjectName(selectedProject);
    setNewTask((prevTask) => ({
      ...prevTask,
      project_id: project.id,
    }));
    console.log("Selected Project: ", selectedProject);
  };
  const handleInputChange = (value, field) => {
    if (field === "due_date" && value) {
      console.log("valueeee", value, moment(value));
      value = moment(value);
    }
    setNewTask((prevTask) => ({
      ...prevTask,
      [field]: value,
    }));
  };
  const handleTask = async () => {
    const taskToSave = {
      ...newTask,
      project_id: projectId || "2345640986",
      due_date: newTask.due_date
        ? newTask.due_date.format("YYYY-MM-DD")
        : null,
    }; 
    if (taskId === "") {
      await addNewTask(taskToSave);
    } else {
      await editedTask(taskId, newTask);
    }
    setEditingTaskId(null);
  };
  const handleEditCancel = async () => {
    console.log("tempTask", tempTask);
    setNewTask({ ...tempTask });

    setEditingTaskId(null);
  };

  return (
    <Card
      bordered={true}
      style={{ marginTop: "16px" }}
      styles={{ body: { padding: "6px" } }}
    >
      <div className="flex flex-col">
        <Input
          placeholder="Call family Thursday at 7pm p1"
          className="border-none text-sm font-bold placeholder-gray-500 outline-none focus:ring-0"
          value={newTask.content}
          onChange={(e) => handleInputChange(e.target.value, "content")}
        />
        <Input
          placeholder="Description"
          className="border-none outline-none focus:ring-0"
          value={newTask.description}
          onChange={(e) => handleInputChange(e.target.value, "description")}
        />
        <DatePicker
          className="w-[25%] m-2"
          value={newTask.due_date || null}
          onChange={(date) => handleInputChange(date, "due_date")}
        />
        <hr />
        <div className="flex flex-row justify-between">
          <Dropdown
            menu={{
              items: menuItems,
              onClick: handleDropdown,
            }}
            trigger={["click"]}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                {selectedProjectName?.name ? (
                  <span>
                    <span
                      style={{
                        color: colorMapping[selectedProjectName.color],
                        marginRight: "8px",
                      }}
                    >
                      #
                    </span>
                    {selectedProjectName.name}
                  </span>
                ) : (
                  <>
                    {_.isEmpty(selectedProject) ? (
                      "Inbox"
                    ) : (
                      <span>
                        <span
                          style={{
                            color: colorMapping[selectedProjectColor],
                            marginRight: "8px",
                          }}
                        >
                          #
                        </span>
                        {selectedProject.name}
                      </span>
                    )}
                  </>
                )}
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>

          <div className="flex justify-end space-x-2 m-2">
            <Button
              onClick={() => {
                handleEditCancel();
              }}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              style={{
                backgroundColor: newTask.content === "" ? "#f5c6cb" : "#f44336",
                borderColor: newTask.content === "" ? "#f5c6cb" : "#f44336",
              }}
              className={`bg-red-600 `}
              onClick={handleTask}
            >
              {taskId == "" ? "Add task" : "Save Task"}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TaskForm;
