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
    async listUsers(idProjeto?: any, idGestor?: number) {
        try {
            const params: any = {};
            
            if (idProjeto !== undefined && idProjeto !== 0) {
                params.idProjeto = idProjeto;
            }
            if (idGestor !== undefined && idProjeto !== 0) {
                params.idGestor = idGestor;
            }
    
            const response = await api.get("/usuario/filtrarprojetogestor", { params });
            return response.data;
        } catch (error) {
            console.error("Erro ao obter dados:", error);
            throw error;
        }
    }    
}

export default new ProjectService();