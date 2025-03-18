import axios from 'axios';
import { API_BASE_URL } from '../cons/urls';


export const getProducts = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/products`);
        return response.data || [];
    } catch (error) {
        console.error("Có lỗi xảy ra khi cố gắng lấy dữ liệu sản phẩm");
        throw error;
    }
}


export const getProductsByBrand = async (brandId) => {
    try {
        const url = brandId === 'all'
            ? `${API_BASE_URL}/products`
            : `${API_BASE_URL}/products?brand=${brandId}`;

        const response = await axios.get(url);
        return response.data; // Trả về data thô để xử lý ở component
    } catch (error) {
        throw new Error('Lỗi khi lấy dữ liệu sản phẩm');
    }
};

export const getProductsByCategory = async (category) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/products/category/${category}/`);
        return response.data || [];
    }
    catch (error) {
        console.error('Error fetching products by category', error);
        return [];
        
    }

}



export const getBrands = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/brands`);
        return response.data;
    } catch (error) {
        console.error('Error fetching brands', error);
        return []; // Trả về mảng rỗng nếu lỗi

    }
}
