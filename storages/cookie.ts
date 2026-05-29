
import Cookies from "js-cookie";

const ACCESS_TOKEN = "access_token";
const REFRESH_TOKEN = "refresh_token";

export const cookieStorage = {
  setAccessToken: (value: string) => {
    Cookies.set(ACCESS_TOKEN, value, {
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
  },

  setRefreshToken: (value: string) => {
    Cookies.set(REFRESH_TOKEN, value, {
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
  },

  getAccessToken: () => {
    return Cookies.get(ACCESS_TOKEN) || null;
  },

  getRefreshToken: () => {
    return Cookies.get(REFRESH_TOKEN) || null;
  },

  clearAll: () => {
    Cookies.remove(ACCESS_TOKEN);
    Cookies.remove(REFRESH_TOKEN);
  },
};
