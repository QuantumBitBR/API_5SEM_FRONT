import {api} from "./apiConfig";

class ProjectService{
    async allProjects(){
        try{
            const response = await api.get("projetos/all");
            return response.data;
        }catch (error){
            console.error("Erro to get data:", error);
            throw error;
        }
    }
}

export default new ProjectService();