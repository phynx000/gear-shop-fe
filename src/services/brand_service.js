import axios from 'axios';
import { API_BASE_URL } from '../cons/urls';

const get_brand_by_category = async (category_id) => {
    try{ 
        const response = await axios.get(`${API_BASE_URL}/brands/${category_id}`);
        return response.data || [];
    } catch (error) {
        console.error("Có lỗi xảy ra khi lấy danh sách thương hiệu", error);
        return [];
    }
}