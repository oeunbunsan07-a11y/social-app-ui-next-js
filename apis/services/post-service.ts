import { apiInstance } from "../core";

class PostService {
    private apiInstance : any;

    constructor(apiInstance : any){
        this.apiInstance = apiInstance;
    };

    async getPosts (){
        const res = await this.apiInstance.get("/posts/feed");
        return res.data;
    };

    // GET USER SPECIFIC POSTS (For Profile Pages)
    async getUserPosts(userId : any){
        // bio, profile_pic_url, cover_pic_url 
        const res = await this.apiInstance.get(`/posts/user/${userId}`);
        return res.data;
    };
}

export const postService = new PostService(apiInstance);