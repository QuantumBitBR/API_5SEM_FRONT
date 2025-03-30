import api from "./apiConfig";

class LifeTimeService{
    async quantityPerProject(project_id: any){
      try{
            let endpoint = ""
            endpoint = `/fatoeficiencia/projeto/${project_id.id}`;
            const response = await api.get(endpoint);
            return response.data;
        }catch (error){
            console.error("Erro to get data:", error);
            throw error;
        }
    }
}


export default new LifeTimeService();
