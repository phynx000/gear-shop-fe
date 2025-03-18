import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";

const ReceiverInfoPage = () => {
    const navigate = useNavigate()
    const { state } = useLocation();
    const [receiverInfo, setReceiverInfo] = useState({
        name: "",
        phone: "",
        address: "",
    });
    const [selectedItems, setSelectedItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [shippingFee, setShippingFee] = useState(45000); // Phí vận chuyển
    const [paymentMethod, setPaymentMethod] = useState("cod"); // Phương thức thanh toán
    const [errors, setErrors] = useState({}); // Lưu trữ lỗi validation



    const [cartItems, setCartItems] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [order, setOrder] = useState(null);
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axios.get("http://localhost:9998/api/cart/view-cart", {
                    withCredentials: true,
                });
                if (response.status === 200) {
                    const itemsWithSelection = response.data.chiTietGioHangs.map((item) => ({
                        ...item,
                        selected: false, quantity: item.soLuong
                    }));
                    setCartItems(itemsWithSelection);
                } else {
                    alert("Có lỗi xảy ra khi lấy giỏ hàng");
                }
            } catch (error) {
                console.error(error);
                alert("Không thể kết nối với API giỏ hàng");
            }
        };
        fetchCart();
    }, []);

    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    console.warn("Không tìm thấy token. Bỏ qua việc gọi API.");
                    return;
                }

                const response = await axios.get("http://localhost:9998/api/home/my-info", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    withCredentials: true,
                });

                if (response.status === 200) {
                    console.log("Info: ", response.data);
                    // Cập nhật receiverInfo với name và phone
                    setReceiverInfo((prevInfo) => ({
                        ...prevInfo,
                        name: `${response.data.lastName} ${response.data.firstName} `, // Gộp firstName và lastName
                        phone: response.data.phone,
                    }));
                } else {
                    console.warn("Có lỗi xảy ra khi gọi API.");
                }
            } catch (error) {
                console.error("Lỗi khi kết nối tới API:", error);
            }
        };

        fetchData();
    }, []);


    useEffect(() => {
        if (state) {
            setSelectedItems(state.selectedItems);
            setTotalPrice(state.totalPrice);
        } else {
            const savedItems = JSON.parse(localStorage.getItem("selectedItems"));
            const savedPrice = localStorage.getItem("totalPrice");
            setSelectedItems(savedItems || []);
            setTotalPrice(savedPrice || 0);
        }
    }, [state]);

    const handlePaymentMethodChange = (e) => {
        const method = e.target.value;
        setPaymentMethod(method);

        // Áp dụng phí vận chuyển cho cả hai phương thức
        setShippingFee(45000); // Ví dụ phí vận chuyển cố định 45k cho cả COD và chuyển khoản
    };


    const validateForm = () => {
        let formErrors = {};
        let isValid = true;

        // Kiểm tra tên
        if (!receiverInfo.name) {
            formErrors.name = "Vui lòng nhập tên người nhận!";
            isValid = false;
        }

        // Kiểm tra số điện thoại (10 chữ số)
        const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;
        if (!receiverInfo.phone || !phoneRegex.test(receiverInfo.phone)) {
            formErrors.phone = "Vui lòng nhập số điện thoại hợp lệ!";
            isValid = false;
        }

        // Kiểm tra địa chỉ
        if (!receiverInfo.address) {
            formErrors.address = "Vui lòng nhập địa chỉ giao hàng!";
            isValid = false;
        }

        // Kiểm tra phương thức thanh toán
        if (!paymentMethod) {
            formErrors.paymentMethod = "Vui lòng chọn phương thức thanh toán!";
            isValid = false;
        }

        setErrors(formErrors);
        return isValid;
    };

    const handleDeleteItem = async (productId) => {
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

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            const orderData = {
                receiverName: receiverInfo.name,
                receiverPhone: receiverInfo.phone,
                receiverAddress: receiverInfo.address,
                sanPhams: selectedItems.map(item => ({
                    ...item.sanPham,
                    quantity: item.quantity // Thêm trường số lượng vào từng sản phẩm
                })),
                totalPrice,
                shippingFee,
                paymentMethod,
                finalTotalPrice: totalPrice + shippingFee,
                // quantity:
                quantity: selectedItems.reduce((total, item) => total + item.soLuong, 0) // Tổng số lượng
            };

            console.log("Order Data:", orderData); // Thêm log để kiểm tra dữ liệu

            try {
                const response = await axios.post("http://localhost:9998/api/orders/create", orderData, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true,
                });
                console.log("Order Data:", JSON.stringify(orderData));
                if (response.status === 200) {
                    // Xóa từng item trong giỏ hàng sau khi xác nhận đơn
                    for (const item of selectedItems) {
                        await handleDeleteItem(item.sanPham.maSanPham); // Gọi hàm xóa item khỏi giỏ
                    }
                    setOrder(response.data.data);
                    setShowModal(true);
                } else {
                    alert("Có lỗi xảy ra khi gửi thông tin đơn hàng");
                }
            } catch (error) {
                console.error(error);
                alert("Không thể kết nối với API đơn hàng");
            }
        } else {
            alert("Vui lòng kiểm tra lại thông tin!");
        }
    };

    const OrderConfirmationModal = ({ show, handleClose, order }) => (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Đặt hàng thành công</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Cảm ơn bạn đã đặt hàng tại cửa hàng của chúng tôi! Dưới đây là thông tin chi tiết về đơn hàng của bạn:</p>
                <p><strong>Mã đơn hàng:</strong> {order.id}</p>
                <p><strong>Tên người nhận:</strong> {order.receiverName}</p>
                <p><strong>Địa chỉ giao hàng:</strong> {order.receiverAddress}</p>
                <p><strong>Số điện thoại:</strong> {order.receiverPhone}</p>
                <p><strong>Phương thức thanh toán:</strong> {order.paymentMethod}</p>
                <p><strong>Tổng giá trị đơn hàng:</strong> {order.totalPrice}</p>
                <p><strong>Phí vận chuyển:</strong> {order.shippingFee}</p>
                <p><strong>Tổng thanh toán:</strong> {order.finalTotalPrice}</p>
                <h5>Sản phẩm đã đặt:</h5>
                {order.sanPhams.map((item, index) => (
                    <div
                        key={index}
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            padding: "15px",
                            marginBottom: "15px",
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                            backgroundColor: "#fff",
                            width: "100%",
                            maxWidth: "350px",
                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                            transition: "transform 0.3s ease",
                        }}
                        className="product-item"
                    >
                        <img
                            src={item.hinhAnh.url || "https://via.placeholder.com/150"}
                            alt={item.tenSanPham}
                            style={{
                                width: "80px",
                                height: "80px",
                                objectFit: "cover",
                                borderRadius: "8px",
                            }}
                        />
                        <div style={{ marginLeft: "15px", flex: "1" }}>
                            <h5 style={{
                                fontSize: "16px",
                                fontWeight: "bold",
                                marginBottom: "5px",
                                color: "#333"
                            }}>
                                {item.tenSanPham}
                            </h5>
                            <p style={{
                                fontSize: "14px",
                                color: "#777",
                                marginBottom: "10px",
                            }}>
                                Số lượng: {item.soLuong}
                            </p>
                            <p style={{
                                fontSize: "14px",
                                color: "#888",
                                textDecoration: "line-through",
                                marginBottom: "5px"
                            }}>
                                Giá gốc:{" "}
                                {(item.chiTietNhapHangs[0]?.donGiaNhap || 0).toLocaleString("vi-VN")}₫
                            </p>
                            <p style={{
                                fontSize: "16px",
                                color: "#e74c3c",
                                fontWeight: "bold",
                            }}>
                                Giá giảm:{" "}
                                {(item.chiTietNhapHangs[0]?.donGiaNhap || 0).toLocaleString("vi-VN")}₫
                            </p>
                        </div>
                    </div>
                ))}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Đóng
                </Button>
            </Modal.Footer>
        </Modal>
    );


    const finalTotalPrice = totalPrice + shippingFee; // Tổng tiền sau khi cộng phí vận chuyển

    return (
        <div className="container my-5" style={{ maxWidth: "900px", margin: "0 auto" }}>
            <h1 className="text-center mb-4" style={{ fontSize: "30px", fontWeight: "bold", color: "#333" }}>
                Thông Tin Đơn Hàng
            </h1>
            <form
                onSubmit={handleFormSubmit}
                style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", padding: "20px", borderRadius: "8px", backgroundColor: "#f9f9f9" }}
            >
                <div className="d-flex flex-wrap justify-content-between">
                    {/* Thông tin người nhận */}
                    <div className="flex-column col-md-5 mb-4" style={{ paddingRight: "20px" }}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label" style={{ fontWeight: "600", fontSize: "16px" }}>Họ và tên</label>
                            <input
                                type="text"
                                id="name"
                                className="form-control"
                                value={receiverInfo.name}
                                onChange={(e) => setReceiverInfo({ ...receiverInfo, name: e.target.value })}
                                required
                                style={{ padding: "10px", fontSize: "14px" }}
                            />
                            {errors.name && <small className="text-danger">{errors.name}</small>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label" style={{ fontWeight: "600", fontSize: "16px" }}>Số điện thoại</label>
                            <input
                                type="text"
                                id="phone"
                                className="form-control"
                                value={receiverInfo.phone}
                                onChange={(e) => setReceiverInfo({ ...receiverInfo, phone: e.target.value })}
                                required
                                style={{ padding: "10px", fontSize: "14px" }}
                            />
                            {errors.phone && <small className="text-danger">{errors.phone}</small>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="address" className="form-label" style={{ fontWeight: "600", fontSize: "16px" }}>Địa chỉ giao hàng</label>
                            <input
                                type="text"
                                id="address"
                                className="form-control"
                                value={receiverInfo.address}
                                onChange={(e) => setReceiverInfo({ ...receiverInfo, address: e.target.value })}
                                required
                                style={{ padding: "10px", fontSize: "14px" }}
                            />
                            {errors.address && <small className="text-danger">{errors.address}</small>}
                        </div>

                        {/* Phương thức thanh toán */}
                        <div className="mb-3">
                            <label htmlFor="paymentMethod" className="form-label" style={{ fontWeight: "600", fontSize: "16px" }}>Phương thức thanh toán</label>
                            <select
                                id="paymentMethod"
                                className="form-control"
                                value={paymentMethod}
                                onChange={handlePaymentMethodChange}
                                required
                                style={{ padding: "10px", fontSize: "14px" }}
                            >
                                <option value="cod">Thanh toán khi nhận hàng (COD)</option>
                                <option value="transfer">Chuyển khoản</option>
                            </select>
                            {errors.paymentMethod && <small className="text-danger">{errors.paymentMethod}</small>}
                        </div>

                        {/* Thông tin chuyển khoản */}
                        {paymentMethod === "transfer" && (
                            <div style={{ marginTop: "15px", padding: "20px", border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "#fff" }}>
                                <h5 style={{ marginBottom: "15px", fontSize: "18px", fontWeight: "600" }}>Thông tin chuyển khoản</h5>
                                <p><strong>Số tài khoản:</strong> 8000132456880</p>
                                <p><strong>Người nhận:</strong> Ngô Quang Phúc</p>
                                <p><strong>Ngân hàng:</strong> MB</p>
                                <p>
                                    <strong>Mã QR thanh toán:</strong>
                                    <img
                                        src="https://i.imgur.com/spvphip.png" // Thay thế bằng URL của mã QR thực tế
                                        alt="QR Code"
                                        style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "8px" }}
                                    />
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Các sản phẩm đã chọn và tổng giá */}
                    <div className="flex-column col-md-6 mb-4">
                        <h5 style={{ fontSize: "20px", fontWeight: "600", marginTop: "20px" }}>Các sản phẩm :</h5>
                        <div className="row row-cols-1 row-cols-md-2 g-4" style={{ marginLeft: '9px', marginTop: '22px' }}>
                            {selectedItems.map((item, index) => (
                                <div
                                    key={index}
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        padding: "15px",
                                        marginBottom: "15px",
                                        border: "1px solid #ddd",
                                        borderRadius: "8px",
                                        backgroundColor: "#fff",
                                        width: "100%",
                                        maxWidth: "350px",
                                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                                        transition: "transform 0.3s ease",
                                    }}
                                    className="product-item"
                                >
                                    <img
                                        src={item.sanPham.hinhAnh.url || "https://via.placeholder.com/150"}
                                        alt={item.sanPham.tenSanPham}
                                        style={{
                                            width: "80px",
                                            height: "80px",
                                            objectFit: "cover",
                                            borderRadius: "8px",
                                        }}
                                    />
                                    <div style={{ marginLeft: "15px", flex: "1" }}>
                                        <h5 style={{
                                            fontSize: "16px",
                                            fontWeight: "bold",
                                            marginBottom: "5px",
                                            color: "#333"
                                        }}>
                                            {item.sanPham.tenSanPham}
                                        </h5>
                                        <p style={{
                                            fontSize: "14px",
                                            color: "#777",
                                            marginBottom: "10px",
                                        }}>
                                            Số lượng: {item.soLuong}
                                        </p>
                                        <p style={{
                                            fontSize: "14px",
                                            color: "#888",
                                            textDecoration: "line-through",
                                            marginBottom: "5px"
                                        }}>
                                            Giá gốc:{" "}
                                            {(item.sanPham.chiTietNhapHangs[0]?.donGiaNhap || 0).toLocaleString("vi-VN")}₫
                                        </p>
                                        <p style={{
                                            fontSize: "16px",
                                            color: "#e74c3c",
                                            fontWeight: "bold",
                                        }}>
                                            Giá giảm:{" "}
                                            {(item.sanPham.chiTietNhapHangs[0]?.donGiaNhap || 0).toLocaleString("vi-VN")}₫
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>


                    </div>
                </div>

                {/* Thông tin tổng giá */}
                <div className="d-flex justify-content-between mt-4" style={{ fontWeight: "600", fontSize: "16px" }}>
                    <p>Tổng tiền:</p>
                    <p>{totalPrice.toLocaleString()} đ</p>
                </div>
                <div className="d-flex justify-content-between">
                    <p>Phí vận chuyển:</p>
                    <p>{shippingFee.toLocaleString()} đ</p>
                </div>
                <div className="d-flex justify-content-between" style={{ fontSize: "18px", fontWeight: "bold" }}>
                    <p>Tổng cộng:</p>
                    <p>{finalTotalPrice.toLocaleString()} đ</p>
                </div>

                {/* Nút submit */}
                <button
                    type="submit"
                    className="btn btn-primary w-100 py-3 mt-4"
                    style={{
                        fontWeight: "bold",
                        fontSize: "18px",
                        borderRadius: "10px",
                        backgroundColor: "#007bff",
                        border: "none",
                    }}
                >
                    Xác nhận đơn hàng
                </button>
            </form>

            {/* Modal cảm ơn */}
            {/* Modal hiển thị thông tin đơn hàng */}
            {order && (
                <OrderConfirmationModal
                    show={showModal}
                    handleClose={() => {
                        setShowModal(false)
                        navigate("/")

                    }}
                    order={order}
                />
            )}
        </div>
    );
};

export default ReceiverInfoPage;