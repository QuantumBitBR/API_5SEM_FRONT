import { api, login_api } from "./apiConfig";
import Cookies from "js-cookie";

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
                console.log(data.token)
                this.storeToken(data.token);
                return data;
            } else {
                throw new Error("Unexpected response from server");
            }
        } catch (error: any) {
            if (error.response) {
                if (error.response.status === 403) {
                    return {
                        userId: error.response.userId,
                        changePassword: true,
                        message: "Senha expirada ou inválida. Por favor, redefina sua senha.",
                    };
                }
                const apiMessage = error.response.data?.message || "Erro desconhecido";
                throw new Error(apiMessage);
            }

            throw error;
        }
    }

    async changePassword(idUsuario:string, novaSenha: string) {
        try {
            const response = await login_api.post("/usuario/resetar-senha", {
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

    private storeToken(token: string) {
        Cookies.set("authToken", token, { expires: 7 });
    }
}

export default new LoginService();
