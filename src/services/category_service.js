import axios from 'axios';
import { API_BASE_URL } from '../cons/urls';


export const getCategory = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/categories`);
        return response.data || [];
    } catch (error) {
        console.error('Có lỗi xẩy ra khi lấy dữ liệu DANH MỤC SẢN PHẨM', error);
        throw error;
    }
}