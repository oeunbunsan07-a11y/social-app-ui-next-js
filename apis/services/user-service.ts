import { apiInstance } from "../core";

class UserService {
    private apiInstance : any;

    constructor(apiInstance : any){
        this.apiInstance = apiInstance;
    };

    async getProfile (){
        const res = await this.apiInstance.get("/user/profile");
        return res.data;
    };

    async updateProfile(payload : any){
        // bio, profile_pic_url, cover_pic_url 
        const res = await this.apiInstance.put("/user/profile", payload);
        return res.data;
    };
}

export const userService = new UserService(apiInstance);