import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductItem from '../components/ProductItem';
import { useNavigate } from 'react-router-dom';
 
 
 
const FlashSale = () => {
    const navigate= useNavigate()
    const [timeLeft, setTimeLeft] = useState(3600); // Giả sử thời gian còn lại là 3600 giây (1 giờ)
    const [productList, setProductList] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [currentCategory, setCurrentCategory] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    const [loading, setLoading] = useState(false);
    const [loaisanPhams, setLoaiSanPhams] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:9998/api/san-pham/laptop');
                const products = response.data.data.sanphams || [];
                setProductList(products);
            } catch (error) {
                setError('Có lỗi xảy ra khi lấy dữ liệu sản phẩm.');
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);
    const getCurrentProducts = () => {
        return productList.slice(4, 12); // Lấy 4 sản phẩm đầu tiên
    };
    useEffect(() => {
        const countdownInterval = setInterval(() => {
            setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);

        return () => clearInterval(countdownInterval); // Dọn dẹp khi component bị unmount
    }, []);

    // Hàm chuyển đổi giây thành định dạng phút:giây
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${minutes}:${sec < 10 ? '0' : ''}${sec}`;
    };

        return (
            <div className="container-fluid p-3" id="flash-sale">
                <div className="p-4" style={{ border: '5px dashed tomato' }}>
                    <h2 className="text-center display-4">
                        <i className="fas fa-bolt"></i> Flash Sale - Sản phẩm giảm giá <i className="fas fa-bolt"></i>
                    </h2>
                    <div className="row mb-3" id="flash-sale-top">
                        <div className="countdown-timer">
                            <div id="countdown">{formatTime(timeLeft)}</div>
                        </div>
                        <div id="flash-sale-more " onClick={()=>navigate("/product")}>
                            <a href=""><span>Xem thêm &gt;</span></a>
                        </div>
                    </div>
                    <div className="row" id="flash-sale-main">
                        {loading ? (
                            <div className="text-center w-100">
                                <button className="btn btn-primary" type="button" disabled>
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    Đang tải sản phẩm...
                                </button>
                            </div>
                        ) : error ? (
                            <div className="alert alert-danger">{error}</div>
                        ) : productList.length > 0 ? (
                                    <div style={{ display: 'flex', justifyContent:'space-between',overflowY:'scroll' }}>

                                {getCurrentProducts().map((product, index) => <ProductItem key={index} product={product} />)}
                            </div>
                        ) : (
                            <p>Không có sản phẩm nào phù hợp.</p>
                        )}
                    </div>
                </div>
            </div>
        );
};

export default FlashSale;
