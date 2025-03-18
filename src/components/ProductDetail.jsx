import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom'; // Đảm bảo thêm useLocation ở đây
import ProductItem from '../components/ProductItem'; // Import ProductItem nếu chưa có

const ProductDetail = () => {
    const location = useLocation();
    const { product } = location.state;
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [cart, setCart] = useState(null);  // Lưu trữ giỏ hàng trong state
    const navigate = useNavigate();

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

    const priceAfterDiscount = product.chiTietNhapHangs[0].donGiaNhap * (1 + product.chiTietNhapHangs[0].phanTramLoiNhuan / 100);

    // Hàm thêm sản phẩm vào giỏ hàng
    // const addToCart = async () => {
    //     try {
    //         console.log('Cart before adding:', cart); // Kiểm tra giỏ hàng trước khi thêm sản phẩm
    //         const response = await axios.post('http://localhost:9998/api/cart/add-to-cart', null, {
    //             params: { id: product.maSanPham },
    //             withCredentials: true
    //         });

    //         if (response.data.status === 'success') {
    //             setCart(response.data.data);
    //             console.log('Cart after adding:', response.data.data); // Kiểm tra giỏ hàng sau khi thêm sản phẩm
    //             alert('Sản phẩm đã được thêm vào giỏ hàng!');
    //         } else {
    //             alert('Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng');
    //         }
    //     } catch (error) {
    //         console.error(error);
    //         alert('Không thể kết nối với API giỏ hàng');
    //     }
    // };
    
    const addToCart = async () => {
        try {
            console.log('Cart before adding:', cart); // Kiểm tra giỏ hàng trước khi thêm sản phẩm
            const response = await axios.post('http://localhost:9998/api/cart/add-to-cart', null, {
                params: { id: product.maSanPham },
                withCredentials: true
            });

            if (response.data.status === 'success') {
                setCart(response.data.data);
                console.log('Cart after adding:', response.data.data); // Kiểm tra giỏ hàng sau khi thêm sản phẩm
                alert('Sản phẩm đã được thêm vào giỏ hàng!');
                return true;
            } else {
                alert('Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng');
                return false;
            }
        } catch (error) {
            console.error(error);
            alert('Không thể kết nối với API giỏ hàng');
            return false;
        }
    };
    const viewCart = async () => {
        try {
            const response = await axios.get('http://localhost:9998/api/cart/view-cart', {
                withCredentials: true
            });

            if (response.status === 200) {
                setCart(response.data);
                console.log('Current cart:', response.data);
            } else {
                alert('Có lỗi xảy ra khi lấy giỏ hàng');
            }
        } catch (error) {
            console.error(error);
            alert('Không thể kết nối với API giỏ hàng');
        }
    };

    const clearCart = async () => {
        try {
            const response = await axios.delete('http://localhost:9998/api/cart/clear-cart', {
                withCredentials: true
            });

            if (response.status === 200) {
                setCart(null);
                alert('Giỏ hàng đã được xóa sạch!');
            } else {
                alert('Có lỗi xảy ra khi xóa giỏ hàng');
            }
        } catch (error) {
            console.error(error);
            alert('Không thể kết nối với API giỏ hàng');
        }
    };
    const handleBuyNow = async () => {
        const success = await addToCart();
        if (success) {
            navigate("/cart");
        }
    };

    const getCurrentProducts = () => {
        return productList.sort(() => 0.5 - Math.random()).slice(0, 4);
    };

    return (
        <div className="product-detail container">
            {/* Header Section */}
            <div className="row">
                <div className="col-md-5">
                    <img
                        src={product.hinhAnh.url}
                        alt={product.tenSanPham}
                        style={{ width: "100%" }}
                    />
                </div>
                <div className="col-md-7">
                    <h1 className="product-title">{product.tenSanPham}</h1>
                    <p className="price">
                        <span className="current-price">
                            {product.chiTietNhapHangs[0].donGiaNhap.toLocaleString('vi-VN')}₫
                        </span>
                        <span className="old-price">
                            {priceAfterDiscount.toLocaleString('vi-VN')}₫
                        </span>
                        <span className="discount">
                            -{product.chiTietNhapHangs[0].phanTramLoiNhuan}%
                        </span>
                    </p>
                    <div className="promotion">
                        <h5 className="promotion_heading">🎁 Quà tặng khuyến mãi</h5>
                        <p className="promotion_desc">Miễn phí giao hàng toàn quốc</p>
                    </div>
                    <button className="btn btn-warning btn-lg" style={{ marginRight: 10 }} onClick={addToCart}>
                        🐱‍🏍 THÊM VÀO GIỎ HÀNG
                    </button>
                    <button className="btn btn-danger btn-lg" onClick={handleBuyNow}>
                        MUA NGAY
                    </button>
                    
                    {/* <button onClick={clearCart}>Xóa toàn bộ giỏ hàng</button>
                    <button onClick={viewCart}>Xem giỏ hàng</button> */}
                    <ul className="features">
                        <p>✔ Bảo hành chính hãng 12 tháng.</p>
                        <p>✔ Hỗ trợ đổi trả trong 7 ngày.</p>
                    </ul>
                </div>
            </div>

            {/* Product Info */}
            <div className="product-info mt-4">
                <h3>Thông tin sản phẩm</h3>
                <table className="table table-striped">
                    <tbody>
                        <tr>
                            <th>CPU</th>
                            <td>{product.lapTop.cpu}</td>
                        </tr>
                        <tr>
                            <th>RAM</th>
                            <td>{product.lapTop.ram}GB</td>
                        </tr>
                        <tr>
                            <th>Ổ cứng</th>
                            <td>{product.lapTop.rom}GB SSD</td>
                        </tr>
                        <tr>
                            <th>VGA</th>
                            <td>{product.lapTop.cardDoHoa}</td>
                        </tr>
                        <tr>
                            <th>Màn hình</th>
                            <td>{product.lapTop.manHinh}</td>
                        </tr>
                        <tr>
                            <th>Pin</th>
                            <td>{product.lapTop.pin}Wh</td>
                        </tr>
                        <tr>
                            <th>Màu sắc</th>
                            <td>{product.lapTop.mauSac}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Supplier Info */}
            <div className="supplier-info mt-4">
                <h3>Thông tin nhà cung cấp</h3>
                <p>Tên nhà cung cấp: {product.chiTietNhapHangs[0].nhaCungCap.tenNhaCungCap}</p>
                <p>Địa chỉ: {product.chiTietNhapHangs[0].nhaCungCap.diaChi}</p>
                <p>Email: {product.chiTietNhapHangs[0].nhaCungCap.email}</p>
            </div>

            <div className="supplier-info mt-4">
                <h3>Các sản phẩm khác</h3>

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
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        {getCurrentProducts().map((product, index) => <ProductItem key={index} product={product} />)}
                    </div>
                ) : (
                    <p>Không có sản phẩm nào phù hợp.</p>
                )}
            </div>
        </div>
    );
};

export default ProductDetail;
