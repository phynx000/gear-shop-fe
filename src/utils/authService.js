import axios from 'axios';

const API_URL = 'http://localhost:9998';

const refreshToken = async () => {
    const refreshToken = localStorage.getItem('token');
    const response = await axios.post(`${API_URL}/refresh`, { token: refreshToken });
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
    }
    return response.data;
};
const logout = async () => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            console.warn("Không tìm thấy token. Bỏ qua việc gọi API.");
            return;
        }

        const response = await axios.post("http://localhost:9998/auth/logout", {

            token: token,

            withCredentials: true,
        });
        if (response.status === 200) {

            localStorage.removeItem("currentUser");
            alert("Đăng xuất thành công!");
            localStorage.removeItem("token");
            // window.location.href = "../html/index.html"; // Hoặc đổi sang route phù hợp với React Router
            window.location.href = "/login";
        }


    }
    catch (error) {
        console.error("Lỗi khi kết nối tới API:", error);
    }
};

export default {
    refreshToken, logout
};