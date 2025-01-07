import { TodoistApi } from "@doist/todoist-api-typescript" 
const api = new TodoistApi(import.meta.env.VITE_API_KEY)
export const postProject = async (payload) => {
   

    // api.addProject(payload)
    // .then((project) => console.log(project))
    // .catch((error) => console.log(error))
    const projects = await api.addProject(payload); 
    return projects;
};   
export const fetchProjects = async () => {
    const projects = await api.getProjects(); 
    return projects;
}; 
export const updateProject =async (id,payload)=>{
    const projects=await api.updateProject(id,payload);
    // console.log("pppppppppp",projects);
    return projects;

}
export const deleteProject =async (id)=>{
    const projects=await api.deleteProject(id);
    // console.log("pppppppppp",projects);
    // return projects;

}
