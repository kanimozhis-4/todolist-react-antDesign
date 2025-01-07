import { TodoistApi } from "@doist/todoist-api-typescript" 
const api = new TodoistApi(import.meta.env.VITE_API_KEY)  
export const createTask=async(payload)=>{
    const task=await api.addTask(payload)
    return task;

}
export const fetchTask=async()=>{
    const task=await api.getTasks();
   
    return task;
}
export const editTask=async(id,payload)=>{
    const editTask=await api.updateTask(id,payload)
    console.log("taskk",editTask);
    return editTask;
} 
export const deleteTask=async(id)=>{
    // console.log("iiiidddddddddd",id)
    const response=await api.deleteTask(id)
    // if (response.status === 204) {
    //     console.log("Task successfully deleted");
    //     return true; // or any success message you prefer
    // } 
    return true
} 
export const closeTask=async(id)=>{
    const response =await api.closeTask(id)
    return true
}
