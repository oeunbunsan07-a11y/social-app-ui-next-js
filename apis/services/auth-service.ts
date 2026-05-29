import { tokenStorage } from "@/storages";
import { apiInstance } from "../core";
import Cookies from "js-cookie";
import { cookieStorage } from "@/storages/cookie";

class AuthService {
    private apiInstance: any;
    constructor(apiInstance: any) {
        this.apiInstance = apiInstance;
    };

    async register(payload: any) {
        const res = await this.apiInstance.post("/auth/register", payload);
        return res.data;
    };

    async login(payload: any) {
        const res = await this.apiInstance.post("/auth/login", payload);
        const { access_token, refresh_token } = res.data;

        // Save Both token to the storage.
        // tokenStorage.setAccessToken(access_token);
        // tokenStorage.setRefreshToken(refresh_token);

        // Save the token from client side to server side in order to use it in middleware.ts
        cookieStorage.setAccessToken(access_token);
        cookieStorage.setRefreshToken(refresh_token);
        
        return res.data;
    }
};

export const authService = new AuthService(apiInstance);