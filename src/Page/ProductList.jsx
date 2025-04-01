// ProductList component: Hiển thị danh sách sản phẩm theo danh mục
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProductItem from "../components/ProductItem";
import ProductFilters from "../components/filterBar/FilterBar";
import useCategories from "../hooks/useCategory";
import { getProducts, getProductsByCategory } from "../services/product_service";
import CategoryAside from "../components/CategoryAside";


const ProductList = () => {
    const { currentCategory, handleCategoryChange } = useCategories();
    const [productList, setProductList] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const location = useLocation();

    // Fetch danh sách sản phẩm theo danh mục
    useEffect(() => {
        setLoading(true);
        (currentCategory === "all" ? getProducts() : getProductsByCategory(currentCategory))
            .then((data) => setProductList(Array.isArray(data) ? data : []))
            .catch((error) => setError(error.message))
            .finally(() => setLoading(false));
    }, [currentCategory]);

    useEffect(() => {
        setFilteredProducts(productList);
        setCurrentPage(1);
    }, [productList]);

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const getCurrentProducts = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({
            top: document.getElementById("productList").offsetTop,
            behavior: "smooth",
        });
    };

    return (
        <div className="row" style={{ margin: "20px 20px" }}>
            <div className="col-md-3 d-none d-sm-block" id="aside">
                <div style={{ margin: "0 20px 0 0" }}>
                    <div className="list-group">
                        <CategoryAside />
                    </div>
                </div>
            </div>
            <div className="col-md-9 col-sm-12">

                {/* HÀNG CHỨA BỘ LỌC */}
    <div className="row mb-3 p-3 bg-light border rounded">
            <ProductFilters />
            </div>
                <div id="productList" className="row">
                    {loading ? (
                        <div className="text-center w-100">
                            <button className="btn btn-primary" type="button" disabled>
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                Đang tải sản phẩm...
                            </button>
                        </div>
                    ) : error ? (
                        <div className="alert alert-danger">{error}</div>
                    ) : filteredProducts.length > 0 ? (
                        getCurrentProducts().map((product, index) => <ProductItem key={index} product={product} />)
                    ) : (
                        <p>Không có sản phẩm nào phù hợp.</p>
                    )}
                </div>

                {totalPages > 1 && !loading && (
                    <ul id="pagination" className="pagination justify-content-center">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <li key={page} className={`page-item ${page === currentPage ? "active" : ""}`}>
                                <button className="page-link" onClick={() => handlePageChange(page)}>
                                    {page}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default ProductList;
