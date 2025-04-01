import React, { useEffect, useState } from "react";
import "../css/bootstrap.min.css";
import "../css/all.css";
import "../css/index.css";
import "../css/product.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom"; // Import useLocation
const Header = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [token, setToken] = useState(null);
    const location = useLocation(); 
    const navigate = useNavigate()
    useEffect(() => {
        // Kiểm tra người dùng đăng nhập từ localStorage
        const user = localStorage.getItem("currentUser");
        const token = localStorage.getItem("token");
        if (user) {
            setCurrentUser(user);
        }
        if (token) {
            console.log("token :",token)
            setToken(token);
        }
        // Kiểm tra trạng thái từ location
        if (location.state?.isLoggedIn) {
            setCurrentUser({ username: location.state.username });
        }
    }, [location])

    const handleLogout = async () => {
        try {
            const refreshToken = localStorage.getItem("refreshToken");
            // console.log("refreshToken :",refreshToken)
            if (!refreshToken) {
                console.warn("Không tìm thấy refresh token.");
                return;
            }
    
            await axios.post("http://localhost:8000/api/logout/", 
                { refresh: refreshToken }, 
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },      
                } 
            );
            
            // Xóa dữ liệu sau khi đăng xuất
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("currentUser");
    
            alert("Đăng xuất thành công!");
            setCurrentUser(null);
            setToken(null);
    
            // Force reload để cập nhật giao diện
            window.location.reload();
        } catch (error) {
            console.error("Lỗi khi đăng xuất:", error);

              // Kiểm tra nếu có phản hồi từ server
              if (error.response) {
                console.error("Phản hồi từ server:", error.response.data);
                alert(`Lỗi từ server: ${error.response.data.detail || "Không xác định"}`);
            } else {
                alert("Lỗi kết nối đến server.");
            }
        }
    };

    return (
        <>
            {/* Top Header */}
            <div className="container-fluid">
                <div className="row text-center" id="top-header">
                    <div className="col-md-3 my-2 p-1">
                        <i className="fa-solid fa-calendar-days"></i>
                        <span id="dateNow">{new Date().toLocaleDateString()}</span>
                    </div>
                    <div className="col-md-3 my-2 p-1">
                        <ul id="top-social-media">
                            <li className="list-inline-item mx-2">
                                <a href="#"><i className="fab fa-facebook"></i></a>
                            </li>
                            <li className="list-inline-item mx-2">
                                <a href="#"><i className="fab fa-instagram"></i></a>
                            </li>
                            <li className="list-inline-item mx-2">
                                <a href="#"><i className="fab fa-tiktok"></i></a>
                            </li>
                            <li className="list-inline-item mx-2">
                                <a href="#"><i className="fab fa-youtube"></i></a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-6 my-2 p-1">
                        <ul id="top-contact">

                            <li className="list-inline-item mx-2" onClick={() => navigate("/cart")}>
                                <a href=" " style={{ textDecoration: 'none' }}>
                                    <i className="fa-solid fa-cart-shopping"></i> Giỏ hàng
                                </a>
                            </li>

                            {!currentUser ? (
                                <>
                                    <li className="list-inline-item mx-2" onClick={() => navigate('/signup')}>
                                        <a href="" style={{ textDecoration: 'none' }}>
                                            <i className="fa-solid fa-key"></i> Đăng ký
                                        </a>
                                    </li>
                                    <li className="list-inline-item mx-2 active" onClick={() => navigate('/login')}>
                                        <a href="" id="logInLink" style={{ textDecoration: 'none' }}>
                                            <i className="fa-solid fa-right-from-bracket"></i> Đăng nhập
                                        </a>
                                    </li>
                                </>
                            ) : (
                                <li className="list-inline-item mx-2" id="logoutItem">
                                    <a href="#!" id="logoutLink" onClick={handleLogout} style={{ textDecoration: 'none' }}>
                                            <i className="fa-solid fa-sign-out-alt"></i> {currentUser.username} - Đăng xuất
                                    </a>
                                </li>
                            )}
                             
                        </ul>
                    </div>
                </div>
            </div>

            {/* Navbar */}
            <nav className="navbar navbar-expand-xl navbar-dark sticky-top p-2" id="navbar-menu">
                <a className="navbar-brand" href="" onClick={() => navigate("/")}>
                    <img src="https://file.hstatic.net/200000636033/file/logo_fd11946b31524fbe98765f34f3de0628.svg" alt="logo" style={{ width: "200px", marginLeft: 20 }} />
                </a>
                {/* <a href="../html/index.html" className="navbar-brand font-weight-bold">
                    TopBag
                </a> */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <i className="fa-solid fa-bars text-dark"></i>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto" id="nav-menu-link">
                        <li className="nav-item active" onClick={() => navigate("/")}>
                            <a className="nav-link" href="">
                                <i className="fa fa-home"></i> TRANG CHỦ
                            </a>
                        </li>
                        <li className="nav-item" onClick={() => navigate("/product")}>
                            <a className="nav-link" href="">
                                <i className="fa fa-shop"></i> CỬA HÀNG
                            </a>
                        </li>
                        {/* <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                                <i className="fa fa-list"></i> SẢN PHẨM
                            </a>
                            <div className="dropdown-menu">
                                <a href="../html/shop.html" className="dropdown-item">
                                    Tất cả sản phẩm
                                </a>
                                <a href="../html/validulich.html" className="dropdown-item active">
                                    Vali Du Lich
                                </a>
                                <a href="../html/valinhomnguyenkhoi.html" className="dropdown-item">
                                    Vali Nhôm Nguyên Khối
                                </a>
                                <a href="../html/valikeovaidu.html" className="dropdown-item">
                                    Vali kéo vải dù
                                </a>
                                <a href="../html/valikeotreem.html" className="dropdown-item">
                                    Vali kéo trẻ em
                                </a>
                                <a href="../html/valikeonhua.html" className="dropdown-item">
                                    Vali kéo nhựa
                                </a>
                                <a href="../html/valikhungnhomkhoasap.html" className="dropdown-item">
                                    Vali kéo khung nhôm khóa sập
                                </a>
                                <a href="../html/valikeosieunhe.html" className="dropdown-item">
                                    Vali kéo siêu nhẹ
                                </a>
                            </div>
                        </li> */}
                        <li className="nav-item"
                            onClick={() => navigate("/cart")}
                        >
                            <a className="nav-link" href="">
                                <i className="fa-solid fa-money-check-dollar"></i> THANH TOÁN
                            </a>
                        </li>
                        {/* <li className="nav-item">
                            <a className="nav-link" href="../html/blog.html">
                                <i className="fa-solid fa-comments"></i> BÀI VIẾT
                            </a>
                        </li> */}
                    </ul>

                    <form id="nav-form-search" className="form-inline ml-auto" action="javascript:void(0);">
                        <div className="input-group" id="input-search-top">
                            {/* <input
                                type="text"
                                name="query"
                                id="query"
                                className="form-control"
                                placeholder="Tìm kiếm ..."
                                required
                            />
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary bg-light" type="submit">
                                    <i className="fas fa-search"></i>
                                </button>
                            </div> */}
                        </div>
                    </form>
                </div>
            </nav>
        </>
    );
};

export default Header;
