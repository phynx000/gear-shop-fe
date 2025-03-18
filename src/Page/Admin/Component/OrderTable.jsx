import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Form } from "react-bootstrap";

const OrderTable = () => {
    const [orders, setOrders] = useState([]); // Dữ liệu đơn hàng
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const itemsPerPage = 7; // Số lượng đơn hàng trên mỗi trang
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    // Gọi API lấy dữ liệu đơn hàng
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.warn("Không tìm thấy token. Bỏ qua việc gọi API.");
            return;
        }
        axios
            .get("http://localhost:9998/api/admin/orders", {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
            .then((response) => {
                setOrders(response.data);
            })
            .catch((error) => {
                console.error("Error fetching orders:", error.response ? error.response.data : error.message);
            });
    }, []);

    // Tính toán dữ liệu phân trang
    const totalPages = Math.ceil(orders.length / itemsPerPage);
    const currentItems = orders.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Xử lý khi chuyển trang
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Hàm xử lý xóa đơn hàng
    const handleDelete = (id) => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.warn("Không tìm thấy token. Bỏ qua việc gọi API.");
            return;
        }
        if (window.confirm("Bạn có chắc muốn xóa đơn hàng này?")) {
            axios
                .post(
                    `http://localhost:9998/api/admin/orders/delete/${id}`,
                    {}, // Dữ liệu rỗng vì đây là yêu cầu xóa
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                .then(() => {
                    alert("Đơn hàng đã được xóa.");
                    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id)); // Xóa khỏi danh sách hiển thị
                })
                .catch((error) => {
                    console.error("Error deleting order:", error.response ? error.response.data : error.message);
                    alert("Xóa đơn hàng thất bại. Vui lòng thử lại.");
                });
        }
    };

    // Hàm xử lý cập nhật đơn hàng
    const handleUpdate = (order) => {
        setSelectedOrder(order);
        setShowUpdateModal(true);
    };

    // Hàm lưu cập nhật đơn hàng
    const handleSaveUpdate = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.warn("Không tìm thấy token. Bỏ qua việc gọi API.");
            return;
        }
        axios
            .put(
                `http://localhost:9998/api/admin/orders/${selectedOrder.id}`,
                selectedOrder, // Dữ liệu form được gửi ở đây
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            .then((response) => {
                setOrders((prevOrders) =>
                    prevOrders.map((order) =>
                        order.id === selectedOrder.id ? response.data.data : order
                    )
                );
                setShowUpdateModal(false);
            })
            .catch((error) => {
                console.error("Error updating order:", error.response ? error.response.data : error.message);
                alert("Cập nhật đơn hàng thất bại. Vui lòng thử lại.");
            });
    };
    // Hàm xử lý thay đổi giá trị trong form cập nhật
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectedOrder({ ...selectedOrder, [name]: value });
    };

    return (
        <div className="container-fluid" style={{ marginTop: 90 }}>
            <h1 className="text-center mb-4">Danh sách đơn hàng</h1>
            <table className="table table-bordered table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>Order ID</th>
                        <th>Receiver Name</th>
                        <th>Receiver Phone</th>
                        <th>Receiver Address</th>
                        <th>Products</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                        <th>Shipping Fee</th>
                        <th>Final Total Price</th>
                        <th>Payment Method</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((order) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.receiverName}</td>
                            <td>{order.receiverPhone}</td>
                            <td>{order.receiverAddress}</td>
                            <td>
                                <ul>
                                    {order.sanPhams.map((product) => (
                                        <div key={product.maSanPham}>
                                            {product.tenSanPham} - {product.loaiSanPham.tenLoaiSanPham} ({product.thuongHieu.tenThuongHieu})
                                        </div>
                                    ))}
                                </ul>
                            </td>
                            <td>{order.quantity.toLocaleString()}</td>
                            <td>{order.totalPrice.toLocaleString()} VND</td>
                            <td>{order.shippingFee.toLocaleString()} VND</td>
                            <td>{order.finalTotalPrice.toLocaleString()} VND</td>
                            <td>{order.paymentMethod.toUpperCase()}</td>
                            <td>
                                <div style={{ display: 'flex' }}>
                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => handleUpdate(order)}
                                    >
                                        Update
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(order.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Phân trang */}
            <nav>
                <ul className="pagination justify-content-center">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <li
                            key={index + 1}
                            className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                        >
                            <button
                                className="page-link"
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Modal cập nhật đơn hàng */}
            {selectedOrder && (
                <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Cập nhật đơn hàng</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formReceiverName">
                                <Form.Label>Tên người nhận</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="receiverName"
                                    value={selectedOrder.receiverName}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formReceiverPhone">
                                <Form.Label>Số điện thoại người nhận</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="receiverPhone"
                                    value={selectedOrder.receiverPhone}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formReceiverAddress">
                                <Form.Label>Địa chỉ người nhận</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="receiverAddress"
                                    value={selectedOrder.receiverAddress}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            {/* <Form.Group controlId="formQuantity">
                                <Form.Label>Số lượng</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="quantity"
                                    value={selectedOrder.quantity}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formTotalPrice">
                                <Form.Label>Tổng giá</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="totalPrice"
                                    value={selectedOrder.totalPrice}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formShippingFee">
                                <Form.Label>Phí vận chuyển</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="shippingFee"
                                    value={selectedOrder.shippingFee}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formFinalTotalPrice">
                                <Form.Label>Tổng giá cuối cùng</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="finalTotalPrice"
                                    value={selectedOrder.finalTotalPrice}
                                    onChange={handleChange}
                                />
                            </Form.Group> */}
                            <Form.Group controlId="formPaymentMethod">
                                <Form.Label>Phương thức thanh toán</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="paymentMethod"
                                    value={selectedOrder.paymentMethod}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
                            Hủy
                        </Button>
                        <Button variant="primary" onClick={handleSaveUpdate}>
                            Lưu
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};

export default OrderTable;