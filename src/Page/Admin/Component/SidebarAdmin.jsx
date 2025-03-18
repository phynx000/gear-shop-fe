import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();
    const [isBannerMenuOpen, setIsBannerMenuOpen] = useState(false);
    const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);
    const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
    const [isOrderMenuOpen, setIsOrderMenuOpen] = useState(false);
    const [isStatisticMenuOpen, setIsStatisticMenuOpen] = useState(false);
    const [isSupplierMenuOpen, setIsSupplierMenuOpen] = useState(false); // Thêm state cho Nhà Cung Cấp
    const [isBrandMenuOpen, setIsBrandMenuOpen] = useState(false);

    // Thêm state cho Quản lý Người Dùng
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const toggleMenu = (menu) => {
        switch (menu) {
            case 'user':
                setIsUserMenuOpen(!isUserMenuOpen);
                break;
            case 'banner':
                setIsBannerMenuOpen(!isBannerMenuOpen);
                break;
            case 'product':
                setIsProductMenuOpen(!isProductMenuOpen);
                break;
            case 'category':
                setIsCategoryMenuOpen(!isCategoryMenuOpen);
                break;
            case 'order':
                setIsOrderMenuOpen(!isOrderMenuOpen);
                break;
            case 'statistic':
                setIsStatisticMenuOpen(!isStatisticMenuOpen);
                break;
            case 'supplier':
                setIsSupplierMenuOpen(!isSupplierMenuOpen); // Toggle Nhà Cung Cấp
                break;
            case 'brand':
                setIsBrandMenuOpen(!isBrandMenuOpen);
                break;

            default:
                break;
        }
    };

    return (
        <aside className="main-sidebar">
            <section className="sidebar">
                <ul className="sidebar-menu" data-widget="tree">

                    {/* Quản lý Người Dùng */}
                    <li className={`treeview ${isUserMenuOpen ? 'active' : ''}`}>
                        <a href="#" onClick={() => toggleMenu('user')}>
                            <i className="fa fa-user"></i>
                            <span>Quản lý Người Dùng</span>
                            <i className="fa fa-angle-left pull-right" style={{ marginLeft: 'auto' }}></i>
                        </a>
                        {isUserMenuOpen && (
                            <ul className="treeview-menu">
                                <li onClick={() => navigate("/admin/userList")}>
                                    <a href="#">
                                        <i className="fa fa-circle-o"></i> Danh Sách Người Dùng
                                    </a>
                                </li>
                                <li onClick={() => navigate("/admin/add-user")}>
                                    <a href="#">
                                        <i className="fa fa-circle-o"></i> Thêm Mới
                                    </a>
                                </li>
                            </ul>
                        )}
                    </li>
                    {/* Quản lý Danh Mục */}
                    {/* <li className={`treeview ${isCategoryMenuOpen ? 'active' : ''}`}>
                        <a href="#" onClick={() => toggleMenu('category')}>
                            <i className="fa fa-th-large"></i>
                            <span>Quản lý Danh Mục</span>
                            <i className="fa fa-angle-left pull-right" style={{ marginLeft: 'auto' }}></i>
                        </a>
                        {isCategoryMenuOpen && (
                            <ul className="treeview-menu">
                                <li onClick={() => navigate("/admin/categoryList")}>
                                    <a href="#">
                                        <i className="fa fa-circle-o"></i> Danh Sách Danh Mục
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i className="fa fa-circle-o"></i> Thêm Mới
                                    </a>
                                </li>
                            </ul>
                        )}
                    </li> */}

                    {/* Quản lý Sản Phẩm */}
                    <li className={`treeview ${isProductMenuOpen ? 'active' : ''}`}>
                        <a href="#" onClick={() => toggleMenu('product')}>
                            <i className="fa fa-cogs"></i>
                            <span>Sản phẩm</span>
                            <i className="fa fa-angle-left pull-right" style={{ marginLeft: 'auto' }}></i>
                        </a>
                        {isProductMenuOpen && (
                            <ul className="treeview-menu">
                                <li onClick={() => navigate("/admin/productList")}>
                                    <a href="#">
                                        <i className="fa fa-circle-o"></i> Danh Sách Sản phẩm
                                    </a>
                                </li>
                                <li onClick={() => navigate("/admin/add-product")}>
                                    <a href="#">
                                        <i className="fa fa-circle-o"></i> Thêm Mới
                                    </a>
                                </li>
                            </ul>
                        )}
                    </li>

                    {/* Quản lý Đơn Hàng */}
                    <li className={`treeview ${isOrderMenuOpen ? 'active' : ''}`}>
                        <a href="#" onClick={() => toggleMenu('order')}>
                            <i className="fa fa-list-alt"></i>
                            <span>Đơn Hàng</span>
                            <i className="fa fa-angle-left pull-right" style={{ marginLeft: 'auto' }}></i>
                        </a>
                        {isOrderMenuOpen && (
                            <ul className="treeview-menu">
                                <li onClick={() => navigate("/admin/orderList")}>
                                    <a href="#">
                                        <i className="fa fa-circle-o"></i> Danh Sách Đơn Hàng
                                    </a>
                                </li>
                                <li onClick={() => navigate("/admin/orderStatistics")}>
                                    <a href="#">
                                        <i className="fa fa-circle-o"></i> Thống Kê Đơn Hàng
                                    </a>
                                </li>
                            </ul>
                        )}
                    </li>

                    {/* Quản lý Nhà Cung Cấp */}
                    <li className={`treeview ${isSupplierMenuOpen ? 'active' : ''}`}>
                        <a href="#" onClick={() => toggleMenu('supplier')}>
                            <i className="fa fa-truck"></i>
                            <span>Quản lý Nhà Cung Cấp</span>
                            <i className="fa fa-angle-left pull-right" style={{ marginLeft: 'auto' }}></i>
                        </a>
                        {isSupplierMenuOpen && (
                            <ul className="treeview-menu">
                                <li onClick={() => navigate("/admin/supplierList")}>
                                    <a href="#">
                                        <i className="fa fa-circle-o"></i> Danh Sách Nhà Cung Cấp
                                    </a>
                                </li>
                                <li onClick={() => navigate("/admin/add-supplier")}>
                                    <a href="#">
                                        <i className="fa fa-circle-o"></i> Thêm Mới
                                    </a>
                                </li>
                            </ul>
                        )}
                    </li>

                    {/* Quản lý Thương Hiệu */}
                    <li className={`treeview ${isBrandMenuOpen ? 'active' : ''}`}>
                        <a href="#" onClick={() => toggleMenu('brand')}>
                            <i className="fa fa-tags"></i>
                            <span>Quản lý Thương Hiệu</span>
                            <i className="fa fa-angle-left pull-right" style={{ marginLeft: 'auto' }}></i>
                        </a>
                        {isBrandMenuOpen && (
                            <ul className="treeview-menu">
                                <li onClick={() => navigate("/admin/brandList")}>
                                    <a href="#">
                                        <i className="fa fa-circle-o"></i> Danh Sách Thương Hiệu
                                    </a>
                                </li>
                                <li onClick={() => navigate("/admin/add-brand")}>
                                    <a href="#">
                                        <i className="fa fa-circle-o"></i> Thêm Mới
                                    </a>
                                </li>
                            </ul>
                        )}
                    </li>

                    {/* Quản lý Thống Kê */}
                    <li className={`treeview ${isStatisticMenuOpen ? 'active' : ''}`}>
                        <a href="#" onClick={() => toggleMenu('statistic')}>
                            <i className="fa fa-bar-chart"></i>
                            <span>Thống Kê</span>
                            <i className="fa fa-angle-left pull-right" style={{ marginLeft: 'auto' }}></i>
                        </a>
                        {isStatisticMenuOpen && (
                            <ul className="treeview-menu">
                                {/* <li>
                                    <a href="#">
                                        <i className="fa fa-circle-o"></i> Tổng Quan
                                    </a>
                                </li> */}
                                <li onClick={() => navigate("/admin/statistics")}>
                                    <a href="#">
                                        <i className="fa fa-circle-o"></i> Chi Tiết
                                    </a>
                                </li>
                            </ul>
                        )}
                    </li>
                </ul>
            </section>
        </aside>
    );
};

export default Sidebar;
