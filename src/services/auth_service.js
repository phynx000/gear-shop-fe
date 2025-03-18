import axios from "axios";
import { API_BASE_URL } from "../cons/urls";


export const register = async (userData) => {
    return await axios.post(`${API_BASE_URL}register/`, userData);
};

export const login = async (credentials) => {
    const response = await axios.post(`${API_BASE_URL}login/`, credentials);
    if (response.data.access) {
        localStorage.setItem("token", response.data.access);
        localStorage.setItem("refreshToken", response.data.refresh);
        return response.data.user;
    }
    throw new Error("Đăng nhập thất bại!");
};

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
};
