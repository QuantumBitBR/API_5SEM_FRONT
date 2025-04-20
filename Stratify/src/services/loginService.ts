import {api, login_api} from "./apiConfig";
import Cookies from "js-cookie";

class LoginService{
    async doLogin(email: string, senha: string) {
        try {
            if (!email || !senha) {
                throw new Error("Email e senha são obrigatórios.");
            }
    
            const response = await login_api.post("/auth", {
                email,
                senha,
            });
    
            if (response.status === 200) {
                const { token, user } = response.data;
                Cookies.set("authToken", token, { expires: 7 });
                return user;
            } else {
                throw new Error("Credenciais inválidas.");
            }
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                throw new Error("E-mail ou senha incorretos.");
            }
    
            throw error;
        }
    }
}


export default new LoginService();