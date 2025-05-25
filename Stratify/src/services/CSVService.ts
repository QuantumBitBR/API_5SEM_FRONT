import { api } from "./apiConfig";

class CSVService {
  async downloadCsvFile(exportType: string, projectId?: number, userId?: number) {
    try {
      const params: any = { exportType };

      if (projectId !== undefined && projectId !== 0) {
        params.projectId = projectId;
      }

      if (userId !== undefined && userId !== 0) {
        params.userId = userId;
      }

      const response = await api.get("/download/csv", {
        params,
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${exportType}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();

    } catch (error) {
      console.error("Erro ao baixar o arquivo CSV:", error);
    }
  }
}

export default new CSVService();
