import React, { useContext, useState,  useEffect } from "react";
import { Modal, Form, Input, Switch, Button, Select, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { ProjectsContext } from "../../../contexts/ProjectContext";
const ProjectForm = ({ isVisible }) => {
  const {
    colorMapping,
    handleOk,
    handleCancel,
    handleColorChange,
    newProject,
    setNewProject,
  } = useContext(ProjectsContext);
  const tempProject={...newProject};
  
  return (
    <Modal
      title={
        <div>
          <div className="flex items-center">
            <span>Add Project</span>
            <Tooltip title="Need help?">
              <InfoCircleOutlined className="ml-2 cursor-pointer" />
            </Tooltip>
          </div>
          <hr className="my-2 border-t border-gray-100" />
        </div>
      }
      open={isVisible}
      onCancel={()=>{ console.log(tempProject,"ttttttttt");setNewProject({...tempProject});handleCancel()}}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="add"
          type="primary"
          className="bg-red-700"
          disabled={newProject.name === ""}
          onClick={() => {
            handleOk();
          }}
          style={{
            backgroundColor: newProject.name === "" ? "#f5c6cb" : "#f44336",
            borderColor: newProject.name === "" ? "#f5c6cb" : "#f44336",
          }}
        >
          {newProject?.id ? "Save" : "Add"}
        </Button>,
      ]}
    >
      <Form
        name={newProject?.id ? "editProjectForm" : "createProjectForm"}
        layout="vertical"
        style={{ maxWidth: 600 }}
        initialValues={{
          Name: newProject.name,
          Color: newProject.color,
        }}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Form.Item
          label={<span style={{ fontWeight: "bold" }}>Name</span>}
          name="Name"
          validateTrigger={["onBlur", "onChange"]}
        >
          <Input
            value={newProject.name}
            onChange={(e) =>
              setNewProject({ ...newProject, name: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item
          label={<span style={{ fontWeight: "bold" }}>Color</span>}
          name="Color"
        >
          <Select
            style={{ width: 200 }}
            value={newProject.color}
            onChange={handleColorChange}
            placeholder="Select a color"
          >
            {Object.entries(colorMapping).map(([name, hex]) => (
              <Select.Option key={name} value={name}>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <span
                    style={{
                      width: "16px",
                      height: "16px",
                      backgroundColor: hex,
                      borderRadius: "50%",
                      border: "1px solid #ddd",
                    }}
                  ></span>
                  {name}
                </div>
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="isFavorite"
          valuePropName="checked"
          style={{ marginBottom: 0 }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Switch
              checked={newProject.is_favorite}
              onChange={(checked) =>
                setNewProject({ ...newProject, is_favorite: checked })
              }
            />
            <span>Add to Favorites</span>
          </div>
        </Form.Item>
        <Form.Item>
          <hr className="mt-6 border-t border-gray-100" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProjectForm;
