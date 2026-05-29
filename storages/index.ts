const ACCESS_TOKEN = "access_token";
const REFRESH_TOKEN = "refresh_token";

export const tokenStorage = {
  setAccessToken: (value: string) => {
    localStorage.setItem(ACCESS_TOKEN, value);
  },

  setRefreshToken: (value: string) => {
    localStorage.setItem(REFRESH_TOKEN, value);
  },

  getAccessToken: () => {
    if (typeof window === "undefined") return null; return localStorage.getItem("accessToken");
  },

  getRefreshToken: () => {
    return localStorage.getItem(REFRESH_TOKEN);
  },

  clearAll: () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
  },
};