import api from "./apiConfig";

class LifeTimeService{
    async quantityPerProject(project_id: any){
      console.log(project_id);
      try{
            let endpoint = ""
          console.log(project_id.id);
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
