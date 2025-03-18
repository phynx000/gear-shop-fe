import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductItem from '../components/ProductItem';

const BestSellers = () => {
    const [productList, setProductList] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [currentCategory, setCurrentCategory] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    const [loading, setLoading] = useState(false);
    const [loaisanPhams, setLoaiSanPhams] = useState([]);
    const [error, setError] = useState(null);
    // useEffect(() => {
    //     const fetchProducts = async () => {
    //         setLoading(true);
    //         try {
    //             const response = await axios.get('http://localhost:9998/api/san-pham/laptop');
    //             const products = response.data.data.sanphams || [];
    //             setProductList(products);
    //         } catch (error) {
    //             setError('Có lỗi xảy ra khi lấy dữ liệu sản phẩm.');
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    //     fetchProducts();
    // }, []);
    const getCurrentProducts = () => {
        return productList.slice(0, 4); // Lấy 4 sản phẩm đầu tiên
    };

    return (
        <div className="container-fluid my-4">
            <div className="row">
                <div className="col">
                    <form>
                        <fieldset className="pr-1 pl-1 pb-3">
                            <legend className="text-center">
                                <i className="fa fa-star text-warning"></i>
                                SẢN PHẨM BÁN CHẠY
                                <i className="fa fa-star text-warning"></i>
                            </legend>

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
                                        <div style={{ display:'flex'}}>

                                            {getCurrentProducts().map((product, index) => <ProductItem key={index} product={product} />)}
                                        </div>
                            ) : (
                                <p>Không có sản phẩm nào phù hợp.</p>
                            )}
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    );

};

export default BestSellers;
