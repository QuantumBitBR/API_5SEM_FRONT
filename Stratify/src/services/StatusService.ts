import api from "./apiConfig";

class StatusService{
    async quantityPerStatus(project_id: any){
        try{
            let endpoint = ""
            if(project_id.id === 0){
                //corrigir endpoint
                endpoint = "fatoProgresso/quantidade-por-etiqueta"
            }else{
                endpoint = `fatoProgresso/quantidade-por-etiqueta?projetoId=${project_id.id}`
            }
            const response = await api.get(endpoint);
            return response.data;
        }catch (error){
            console.error("Erro to get data:", error);
            throw error;
        }
    }
}

export default new StatusService();