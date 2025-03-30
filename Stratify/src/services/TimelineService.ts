import api from "./apiConfig";

class TimelineService{
    async quantityPerTimeline(project_id: any){
        try{
            let endpoint = ""
            if(project_id.id === 0){
                endpoint = "temporais"
            }else{
                endpoint = `temporais?projetoId=${project_id.id}`
            }
            const response = await api.get(endpoint);
            console.log("Response:", response)
            return response.data;
        }catch (error){
            console.error("Erro to get data:", error);
            throw error;
        }
    }
}

export default new TimelineService();