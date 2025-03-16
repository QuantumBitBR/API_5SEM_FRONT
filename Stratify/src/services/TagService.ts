import api from "./apiConfig";

class TagService{
    async quantityPerTag(id: number){
        try{
            const response = await api.get("fatoProgresso/quantidade-por-etiqueta");
            return response.data;
        }catch (error){
            console.error("Erro to get data:", error);
            throw error;
        }
    }
}

export default new TagService();