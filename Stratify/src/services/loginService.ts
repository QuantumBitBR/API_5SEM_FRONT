import { api, login_api } from "./apiConfig";
import Cookies from "js-cookie";
import tokenService from "./tokenService";
class LoginService {
    async doLogin(email: string, senha: string) {
        try {
            if (!email || !senha) {
                throw new Error("Missing required fields");
            }

            const response = await login_api.post("/auth", {
                email,
                senha,
            });

            if (response.status === 200) {
                const data = response.data;
                tokenService.storeToken(data.token);
                return data;
            } else {
                throw new Error("Unexpected response from server");
            }
        } catch (error: any) {
            if (error.response) {
                const apiMessage = error.response.data?.message || "Erro desconhecido";
                throw new Error(apiMessage);
            }

            throw error;
        }
    }

    async changePassword(idUsuario: number, novaSenha: string) {
        try {
            const response = await api.put("/usuario/resetar-senha", {
                idUsuario,
                novaSenha,
            });

            if (response.status === 200) {
                return true;
            } else {
                throw new Error("Unexpected response from server");
            }
        } catch (error: any) {
            if (error.response) {
                const apiMessage = error.response.data?.message || "Erro desconhecido";
                throw new Error(apiMessage);
            }

            throw error;
        }
    }
}

export default new LoginService();
