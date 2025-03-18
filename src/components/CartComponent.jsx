import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

const CartComponent = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axios.get("http://localhost:9998/api/cart/view-cart", {
                    withCredentials: true,
                });
                if (response.status === 200) {
                    const itemsWithSelection = response.data.chiTietGioHangs.map((item) => ({
                        ...item,
                        selected: false,
                    }));
                    setCartItems(itemsWithSelection);
                } else {
                    // alert("Có lỗi xảy ra khi lấy giỏ hàng");
                }
            } catch (error) {
                console.error(error);
                // alert("Không thể kết nối với API giỏ hàng");
            }
        };
        fetchCart();
    }, []);

    const handleCheckboxChange = (index) => {
        const newCartItems = [...cartItems];
        newCartItems[index].selected = !newCartItems[index].selected;
        setCartItems(newCartItems);
    };

    const handleIncreaseQuantity = async (index) => {
        const productId = cartItems[index].sanPham.maSanPham;
        try {
            const response = await axios.post('http://localhost:9998/api/cart/increase-quantity', null, {
                params: { id: productId },
                withCredentials: true
            });
            if (response.status === 200) {
                setCartItems(response.data.chiTietGioHangs);
            } else {
                alert(response.data || "Có lỗi xảy ra khi tăng số lượng sản phẩm");

            }
        } catch (error) {
            console.error(error);
            alert(error.response?.data || "Không thể kết nối với API giỏ hàng");
        }
    };

    const handleDecreaseQuantity = async (index) => {
        const productId = cartItems[index].sanPham.maSanPham;
        try {
            const response = await axios.post('http://localhost:9998/api/cart/decrease-quantity', null, {
                params: { id: productId },
                withCredentials: true
            });
            if (response.status === 200) {
                setCartItems(response.data.chiTietGioHangs);
            } else {
                alert(response.data || "Có lỗi xảy ra khi giảm số lượng sản phẩm");
            }
        } catch (error) {
            console.error(error);
            alert(error.response?.data || "Không thể kết nối với API giỏ hàng");
        }
    };

    const handleDeleteItem = async (index) => {
        const productId = cartItems[index].sanPham.maSanPham;
        try {
            const response = await axios.delete('http://localhost:9998/api/cart/remove-from-cart', {
                params: { id: productId },
                withCredentials: true
            });
            if (response.status === 200) {
                setCartItems(response.data.chiTietGioHangs);
            } else {
                alert(response.data || "Có lỗi xảy ra khi xóa sản phẩm khỏi giỏ hàng");
            }
        } catch (error) {
            console.error(error);
            alert(error.response?.data || "Không thể kết nối với API giỏ hàng");
        }
    };



    const totalPrice = cartItems
        .filter((item) => item.selected)
        .reduce(
            (total, item) =>
                total + item.soLuong * (item?.sanPham?.chiTietNhapHangs[0]?.donGiaNhap || 0),
            0
        );

    const clearCart = async () => {
        try {
            const response = await axios.delete('http://localhost:9998/api/cart/clear-cart', {
                withCredentials: true
            });

            if (response.status === 200) {
                setCartItems([]); // Xóa hết sản phẩm trong giỏ hàng
                alert('Giỏ hàng đã được xóa sạch!');
            } else {
                alert('Có lỗi xảy ra khi xóa giỏ hàng');
            }
        } catch (error) {
            console.error(error);
            alert('Không thể kết nối với API giỏ hàng');
        }
    };

    const handleCheckout = async () => {
        const selectedItems = cartItems.filter((item) => item.selected);
        if (selectedItems.length === 0) {
            alert("Vui lòng chọn ít nhất một sản phẩm để thanh toán!");
            return;
        }

        // // Thực hiện thanh toán (bạn có thể thay đổi hành động này)
        // alert("Thanh toán thành công!");

        // // Xóa các sản phẩm đã chọn khỏi giỏ hàng
        // for (const item of selectedItems) {
        //     await handleDeleteItem(cartItems.indexOf(item));
        // }

        // Truyền các thông tin giỏ hàng đã chọn qua navigate
        navigate("/receiver-info", {
            state: {
                selectedItems,
                totalPrice,
            },
        });

        // Lưu thông tin giỏ hàng đã chọn vào localStorage nếu cần
        localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
        localStorage.setItem("totalPrice", totalPrice);
    };

    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">Giỏ Hàng</h1>
            <div className="row">
                <div className="col-lg-8">


                    {/* {cartItems.map((item, index) => {
                        const product = item.sanPham;
                        const supplier = product?.chiTietNhapHangs?.[0];

                        return (
                            <div
                                key={index}
                                className="d-flex align-items-center justify-content-between p-3 mb-3 border rounded shadow-sm"
                                style={{ backgroundColor: "#fff" }}
                            >
                                <input
                                    type="checkbox"
                                    checked={item.selected}
                                    onChange={() => handleCheckboxChange(index)}
                                />
                                <img
                                    src={product?.hinhAnh?.url || "placeholder-image-url.jpg"}
                                    alt={product?.tenSanPham || "Tên sản phẩm"}
                                    className="img-thumbnail"
                                    style={{ width: "80px", height: "80px", objectFit: "cover" }}
                                />
                                <div className="flex-grow-1 mx-3">
                                    <h6 className="mb-1">{product?.tenSanPham || "Tên sản phẩm"}</h6>
                                    <p className="mb-1 text-muted">
                                        Giá gốc:{" "}
                                        <del style={{ textDecoration: "line-through" }}>
                                            {(
                                                supplier?.donGiaNhap *
                                                (1 + supplier?.phanTramLoiNhuan / 100) || 0
                                            ).toLocaleString("vi-VN")}₫
                                        </del>
                                    </p>
                                    <p className="fw-bold text-danger">
                                        Giá giảm:{" "}
                                        {(supplier?.donGiaNhap || 0).toLocaleString("vi-VN")}₫
                                    </p>
                                </div>
                                <div className="d-flex align-items-center">
                                    <button
                                        className="btn btn-outline-secondary btn-sm me-2"
                                        onClick={() => handleDecreaseQuantity(index)}
                                    >
                                        -
                                    </button>
                                    <span className="fw-bold">{item.soLuong || 0}</span>
                                    <button
                                        className="btn btn-outline-secondary btn-sm ms-2"
                                        onClick={() => handleIncreaseQuantity(index)}
                                    >
                                        +
                                    </button>
                                </div>
                                <button
                                    className="btn btn-danger btn-sm ms-3"
                                    onClick={() => handleDeleteItem(index)}
                                >
                                    <FaTrash /> Xoá
                                </button>
                            </div>
                        );
                    })} */}
                    {cartItems.length === 0 ? (
                        <div className="alert alert-info" role="alert">
                            Giỏ hàng của bạn đang trống.
                        </div>
                    ) : (
                        cartItems.map((item, index) => {
                            const product = item.sanPham;
                            const supplier = product?.chiTietNhapHangs?.[0];

                            return (
                                <div
                                    key={index}
                                    className="d-flex align-items-center justify-content-between p-3 mb-3 border rounded shadow-sm"
                                    style={{ backgroundColor: "#fff" }}
                                >
                                    <input
                                        type="checkbox"
                                        checked={item.selected}
                                        onChange={() => handleCheckboxChange(index)}
                                    />
                                    <img
                                        src={product?.hinhAnh?.url || "placeholder-image-url.jpg"}
                                        alt={product?.tenSanPham || "Tên sản phẩm"}
                                        className="img-thumbnail"
                                        style={{ width: "80px", height: "80px", objectFit: "cover" }}
                                    />
                                    <div className="flex-grow-1 mx-3">
                                        <h6 className="mb-1">{product?.tenSanPham || "Tên sản phẩm"}</h6>
                                        <p className="mb-1 text-muted">
                                            Giá gốc:{" "}
                                            <del style={{ textDecoration: "line-through" }}>
                                                {(
                                                    supplier?.donGiaNhap *
                                                    (1 + supplier?.phanTramLoiNhuan / 100) || 0
                                                ).toLocaleString("vi-VN")}₫
                                            </del>
                                        </p>
                                        <p className="fw-bold text-danger">
                                            Giá giảm:{" "}
                                            {(supplier?.donGiaNhap || 0).toLocaleString("vi-VN")}₫
                                        </p>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <button
                                            className="btn btn-outline-secondary btn-sm me-2"
                                            onClick={() => handleDecreaseQuantity(index)}
                                        >
                                            -
                                        </button>
                                        <span className="fw-bold">{item.soLuong || 0}</span>
                                        <button
                                            className="btn btn-outline-secondary btn-sm ms-2"
                                            onClick={() => handleIncreaseQuantity(index)}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button
                                        className="btn btn-danger btn-sm ms-3"
                                        onClick={() => handleDeleteItem(index)}
                                    >
                                        <FaTrash /> Xoá
                                    </button>
                                </div>
                            );
                        })
                    )}
                </div>
                <div className="col-lg-4">
                    <div className="card shadow-lg">
                        <div className="card-header bg-success text-white text-uppercase">
                            <h5>Thanh toán</h5>
                        </div>
                        <div className="card-body">
                            <p className="fw-bold">
                                Tổng tiền:{" "}
                                <span className="text-danger">
                                    {totalPrice.toLocaleString("vi-VN")}₫
                                </span>
                            </p>
                            <button
                                className="btn btn-success w-100 mb-3"
                                onClick={handleCheckout}
                            >
                                Thanh toán
                            </button>
                            <button
                                className="btn btn-primary w-100"
                                onClick={() => navigate("/product")}
                            >
                                Tiếp tục mua sắm
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartComponent;