import React, { useState, useEffect } from "react";
import axios from "axios";

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get("http://localhost:9998/api/orders", {
                    withCredentials: true,
                });
                setOrders(response.data);
            } catch (error) {
                console.error(error);
                alert("Không thể kết nối với API đơn hàng");
            }
        };
        fetchOrders();
    }, []);

    const handleOrderClick = async (orderId) => {
        try {
            const response = await axios.get(`http://localhost:9998/api/orders/${orderId}`, {
                withCredentials: true,
            });
            setSelectedOrder(response.data);
        } catch (error) {
            console.error(error);
            alert("Không thể kết nối với API đơn hàng");
        }
    };

    return (
        <div>
            <h1>Danh sách đơn hàng</h1>
            <ul>
                {orders.map(order => (
                    <li key={order.id} onClick={() => handleOrderClick(order.id)}>
                        Đơn hàng #{order.id} - Tổng giá: {order.finalTotalPrice}
                    </li>
                ))}
            </ul>
            {selectedOrder && (
                <div>
                    <h2>Chi tiết đơn hàng #{selectedOrder.id}</h2>
                    <p>Tên người nhận: {selectedOrder.receiverName}</p>
                    <p>Số điện thoại: {selectedOrder.receiverPhone}</p>
                    <p>Địa chỉ: {selectedOrder.receiverAddress}</p>
                    <p>Tổng giá: {selectedOrder.totalPrice}</p>
                    <p>Phí vận chuyển: {selectedOrder.shippingFee}</p>
                    <p>Phương thức thanh toán: {selectedOrder.paymentMethod}</p>
                    <p>Tổng cộng: {selectedOrder.finalTotalPrice}</p>
                    <h3>Sản phẩm:</h3>
                    <ul>
                        {selectedOrder.sanPhams.map(sanPham => (
                            <li key={sanPham.maSanPham}>
                                {sanPham.tenSanPham} - {sanPham.loaiSanPham.tenLoaiSanPham} - {sanPham.thuongHieu.tenThuongHieu}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default OrdersPage;