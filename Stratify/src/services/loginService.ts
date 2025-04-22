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
                const { token, user } = response.data;
                this.storeToken(token);
                return user;
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
