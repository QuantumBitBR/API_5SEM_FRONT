import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

class tokenService {
    private readonly tokenKey = "authToken";

    public storeToken(token: string): void {
        Cookies.set(this.tokenKey, token, { expires: 7 });
    }

    public getToken(): string | undefined {
        return Cookies.get(this.tokenKey);
    }

    public removeToken(): void {
        Cookies.remove(this.tokenKey);
    }

    public decodeToken(token?: string): any | null {
        try {
            const jwt = token || this.getToken();
            return jwt ? jwtDecode(jwt) : null;
        } catch (error) {
            console.error("Error decoding token:", error);
            return null;
        }
    }
}

export default new tokenService();
