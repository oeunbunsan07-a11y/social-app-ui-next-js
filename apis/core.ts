import axios from "axios";
import { cookieStorage } from "@/storages/cookie";

const baseURL = "http://localhost:8080/api";

export const apiInstance = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json"
    }
});

// Attach token automatically
apiInstance.interceptors.request.use(async (config) => {
    const token = cookieStorage.getAccessToken();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// Handle expired token
apiInstance.interceptors.response.use(
    (response) => {
        // For successful responses (status 200-299)
        // You can access response.data.message here
        return response;
    },
    async (error) => {
        // For error responses (status 400-599)
        if (error.response) {
            // The request was made and the server responded with an error status
            const status = error.response?.status;
            const data = error.response.data;

            // You can access error.message here
            console.log("Error message:", data.message);

            const originalRequest = error.config;

            // Skip refresh endpoint itself
            const isRefreshRequest =
                originalRequest.url?.includes("/refresh");

            // Handle 401 Unauthorized and prevent infinite loop
            if ((status === 401 && !originalRequest._retry && !isRefreshRequest)) {
                originalRequest._retry = true;

                try {
                    const refreshToken = cookieStorage.getRefreshToken();

                    const response = await axios.post(
                        `${baseURL}/auth/refresh`,
                        {
                            "refresh_token": refreshToken
                        }, // request body
                    );

                    const newAccessToken = response.data.access_token;


                    // tokenStorage.setAccessToken(newAccessToken);
                    cookieStorage.setAccessToken(newAccessToken);

                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                    return apiInstance(originalRequest);
                } catch (err) {
                    // In case of refresh token 7days expired.
                    // Login again
                    // tokenStorage.clearAll();
                    cookieStorage.clearAll();

                }
            }
            // Return the error response data so you can access it in your catch block
            return Promise.reject(error.response.data);
        } else if (error.request) {
            // The request was made but no response received
            console.log("No response received:", error.request);
            return Promise.reject({ message: "No response from server" });
        } else {
            // Something happened in setting up the request
            console.log("Error:", error.message);
            return Promise.reject({ message: error.message });
        }
    },
);

