import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col, Badge } from 'react-bootstrap';
import { FaBox, FaMoneyBillAlt, FaChartLine, FaStoreAlt, FaCreditCard } from 'react-icons/fa';

const WebsiteStatistics = () => {
    const [statistics, setStatistics] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStatistics = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                console.warn("Không tìm thấy token. Bỏ qua việc gọi API.");
                return;
            }
            try {
                const response = await axios.get('http://localhost:9998/api/admin/summary', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
                const data = response.data;

                if (Array.isArray(data.productsByBrand) &&
                    Array.isArray(data.revenueByBrand) &&
                    Array.isArray(data.bestSellingProductsByBrand) &&
                    Array.isArray(data.productsByCategory) &&
                    Array.isArray(data.bestSellingProductsByCategory) &&
                    Array.isArray(data.ordersByPaymentMethod) &&
                    Array.isArray(data.revenueByPaymentMethod) &&
                    Array.isArray(data.costBySupplier) &&
                    Array.isArray(data.storageCostBySupplier) &&
                    Array.isArray(data.managementCostBySupplier)) {
                    setStatistics(data);
                } else {
                    throw new Error('Dữ liệu không hợp lệ');
                }
            } catch (error) {
                console.error('Có lỗi xảy ra khi lấy dữ liệu thống kê:', error.response ? error.response.data : error.message);
                setError('Có lỗi xảy ra khi lấy dữ liệu thống kê.');
            }
        };

        fetchStatistics();
    }, []);

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    if (!statistics) {
        return <div className="text-center">Đang tải...</div>;
    }

    return (
        <Container className="pt-5" style={{overflowY:'scroll',marginTop:30}}>
            <h2 className="my-4 text-center text-primary">Thống kê toàn bộ website</h2>
            <Row className="g-4">
                {/** Product by Brand */}
                <Col md={4}>
                    <Card className="shadow-lg border-light rounded">
                        <Card.Body>
                            <Card.Title className="text-success"><FaBox /> Sản phẩm theo thương hiệu</Card.Title>
                            <ul className="list-unstyled">
                                {Array.isArray(statistics.productsByBrand) && statistics.productsByBrand.map(([brand, count], index) => (
                                    <li key={index} className="d-flex justify-content-between align-items-center">
                                        <Badge bg="info" pill>{brand}</Badge>
                                        <span>{count} sản phẩm</span>
                                    </li>
                                ))}
                            </ul>
                        </Card.Body>
                    </Card>
                </Col>
                {/** Revenue by Brand */}
                <Col md={4}>
                    <Card className="shadow-lg border-light rounded">
                        <Card.Body>
                            <Card.Title className="text-warning"><FaMoneyBillAlt /> Doanh thu theo thương hiệu</Card.Title>
                            <ul className="list-unstyled">
                                {Array.isArray(statistics.revenueByBrand) && statistics.revenueByBrand.map(([brand, revenue], index) => (
                                    <li key={index} className="d-flex justify-content-between align-items-center">
                                        <Badge bg="success" pill>{brand}</Badge>
                                        <span>{revenue.toLocaleString('vi-VN')}₫</span>
                                    </li>
                                ))}
                            </ul>
                        </Card.Body>
                    </Card>
                </Col>
                {/** Best Selling by Brand */}
                <Col md={4}>
                    <Card className="shadow-lg border-light rounded">
                        <Card.Body>
                            <Card.Title className="text-danger"><FaChartLine /> Sản phẩm bán chạy nhất theo thương hiệu</Card.Title>
                            <ul className="list-unstyled">
                                {Array.isArray(statistics.bestSellingProductsByBrand) && statistics.bestSellingProductsByBrand.map(([brand, product], index) => (
                                    <li key={index} className="d-flex justify-content-between align-items-center">
                                        <Badge bg="warning" pill>{brand}</Badge>
                                        <span>{product}</span>
                                    </li>
                                ))}
                            </ul>
                        </Card.Body>
                    </Card>
                </Col>
                {/** Product by Category */}
                <Col md={4}>
                    <Card className="shadow-lg border-light rounded">
                        <Card.Body>
                            <Card.Title className="text-primary"><FaStoreAlt /> Sản phẩm theo loại sản phẩm</Card.Title>
                            <ul className="list-unstyled">
                                {Array.isArray(statistics.productsByCategory) && statistics.productsByCategory.map(([category, count], index) => (
                                    <li key={index} className="d-flex justify-content-between align-items-center">
                                        <Badge bg="info" pill>{category}</Badge>
                                        <span>{count} sản phẩm</span>
                                    </li>
                                ))}
                            </ul>
                        </Card.Body>
                    </Card>
                </Col>
                {/** Best Selling by Category */}
                <Col md={4}>
                    <Card className="shadow-lg border-light rounded">
                        <Card.Body>
                            <Card.Title className="text-danger"><FaChartLine /> Sản phẩm bán chạy nhất theo loại sản phẩm</Card.Title>
                            <ul className="list-unstyled">
                                {Array.isArray(statistics.bestSellingProductsByCategory) && statistics.bestSellingProductsByCategory.map(([category, product], index) => (
                                    <li key={index} className="d-flex justify-content-between align-items-center">
                                        <Badge bg="danger" pill>{category}</Badge>
                                        <span>{product}</span>
                                    </li>
                                ))}
                            </ul>
                        </Card.Body>
                    </Card>
                </Col>
                {/** Orders by Payment Method */}
                <Col md={4}>
                    <Card className="shadow-lg border-light rounded">
                        <Card.Body>
                            <Card.Title className="text-secondary"><FaCreditCard /> Đơn hàng theo phương thức thanh toán</Card.Title>
                            <ul className="list-unstyled">
                                {Array.isArray(statistics.ordersByPaymentMethod) && statistics.ordersByPaymentMethod.map(([method, count], index) => (
                                    <li key={index} className="d-flex justify-content-between align-items-center">
                                        <Badge bg="secondary" pill>{method}</Badge>
                                        <span>{count} đơn hàng</span>
                                    </li>
                                ))}
                            </ul>
                        </Card.Body>
                    </Card>
                </Col>
                {/** Revenue by Payment Method */}
                <Col md={4}>
                    <Card className="shadow-lg border-light rounded">
                        <Card.Body>
                            <Card.Title className="text-warning"><FaMoneyBillAlt /> Doanh thu theo phương thức thanh toán</Card.Title>
                            <ul className="list-unstyled">
                                {Array.isArray(statistics.revenueByPaymentMethod) && statistics.revenueByPaymentMethod.map(([method, revenue], index) => (
                                    <li key={index} className="d-flex justify-content-between align-items-center">
                                        <Badge bg="success" pill>{method}</Badge>
                                        <span>{revenue.toLocaleString('vi-VN')}₫</span>
                                    </li>
                                ))}
                            </ul>
                        </Card.Body>
                    </Card>
                </Col>
                {/** Cost by Supplier */}
                <Col md={4}>
                    <Card className="shadow-lg border-light rounded">
                        <Card.Body>
                            <Card.Title className="text-info">Chi phí theo nhà cung cấp</Card.Title>
                            <ul className="list-unstyled">
                                {Array.isArray(statistics.costBySupplier) && statistics.costBySupplier.map(([supplier, cost], index) => (
                                    <li key={index} className="d-flex justify-content-between align-items-center">
                                        <Badge bg="info" pill>{supplier}</Badge>
                                        <span>{cost.toLocaleString('vi-VN')}₫</span>
                                    </li>
                                ))}
                            </ul>
                        </Card.Body>
                    </Card>
                </Col>
                {/** Storage Cost by Supplier */}
                <Col md={4}>
                    <Card className="shadow-lg border-light rounded">
                        <Card.Body>
                            <Card.Title className="text-warning">Chi phí lưu kho theo nhà cung cấp</Card.Title>
                            <ul className="list-unstyled">
                                {Array.isArray(statistics.storageCostBySupplier) && statistics.storageCostBySupplier.map(([supplier, cost], index) => (
                                    <li key={index} className="d-flex justify-content-between align-items-center">
                                        <Badge bg="warning" pill>{supplier}</Badge>
                                        <span>{cost.toLocaleString('vi-VN')}₫</span>
                                    </li>
                                ))}
                            </ul>
                        </Card.Body>
                    </Card>
                </Col>
                {/** Management Cost by Supplier */}
                <Col md={4}>
                    <Card className="shadow-lg border-light rounded">
                        <Card.Body>
                            <Card.Title className="text-danger">Chi phí quản lý theo nhà cung cấp</Card.Title>
                            <ul className="list-unstyled">
                                {Array.isArray(statistics.managementCostBySupplier) && statistics.managementCostBySupplier.map(([supplier, cost], index) => (
                                    <li key={index} className="d-flex justify-content-between align-items-center">
                                        <Badge bg="danger" pill>{supplier}</Badge>
                                        <span>{cost.toLocaleString('vi-VN')}₫</span>
                                    </li>
                                ))}
                            </ul>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default WebsiteStatistics;
