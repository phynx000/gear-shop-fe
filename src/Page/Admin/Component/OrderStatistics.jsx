import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const OrderStatistics = () => {
    const [statistics, setStatistics] = useState(null);

    useEffect(() => {
        const fetchStatistics = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                console.warn("Không tìm thấy token. Bỏ qua việc gọi API.");
                return;
            }
            try {
                const response = await axios.get("http://localhost:9998/api/admin/orders/summary", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
                setStatistics(response.data);
            } catch (error) {
                console.error("Có lỗi xảy ra khi lấy dữ liệu thống kê:", error.response ? error.response.data : error.message);
            }
        };

        fetchStatistics();
    }, []); // Mảng dependency trống để chỉ chạy một lần khi component mount

    if (!statistics) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Đang tải...</span>
                </div>
                <p>Đang tải dữ liệu...</p>
            </div>
        );
    }

    return (
        <div className="container  " style={{ marginTop: 130 }}>
            <div className="row">
                <div className="col-lg-4 mb-3">
                    <div className="card text-white bg-primary mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Tổng số đơn hàng</h5>
                            <p className="card-text fs-4">{statistics.totalOrders}</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-8 mb-3">
                    <div className="card text-white bg-success">
                        <div className="card-body">
                            <h5 className="card-title">Tổng doanh thu</h5>
                            <p className="card-text fs-4">{statistics.totalRevenue.toLocaleString("vi-VN")}₫</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-header bg-dark text-white">
                    <h5 className="mb-0">Doanh thu theo sản phẩm</h5>
                </div>
                <div className="card-body">
                    <ul className="list-group">
                        {statistics.revenueByProduct.map(([productName, count, revenue], index) => (
                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <strong>{productName}</strong> <br />
                                    {/* <span>{count} sản phẩm</span> */}
                                </div>
                                <span className="badge bg-success fs-6">{revenue.toLocaleString("vi-VN")}₫</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default OrderStatistics;
