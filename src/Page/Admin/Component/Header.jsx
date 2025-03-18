import React, { useState, useEffect } from "react";
import axios from "axios";
import { Dropdown } from "react-bootstrap"; // Import Dropdown component từ React-Bootstrap
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate()

    const [admin, setAdmin] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [token, setToken] = useState(null);
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            console.warn("Không tìm thấy token. Bỏ qua việc gọi API.");
            return;
        }

        const fetchAdminInfo = async () => {
            try {
                const response = await axios.get("http://localhost:9998/api/home/my-info", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                });

                setAdmin(response.data);
            } catch (error) {
                console.error("Có lỗi khi lấy thông tin admin: ", error);
            }
        };

        fetchAdminInfo();
    }, []);

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.warn("Không tìm thấy token. Bỏ qua việc gọi API.");
                return;
            }

            const response = await axios.post("http://localhost:9998/auth/logout", {

                token: token,

                withCredentials: true,
            });
            if (response.status === 200) {

                localStorage.removeItem("currentUser");
                alert("Đăng xuất thành công!");
                setCurrentUser(null);
                setToken(null)
                localStorage.removeItem("token");
                // window.location.href = "../html/index.html"; // Hoặc đổi sang route phù hợp với React Router
                navigate("/")
            }


        }
        catch (error) {
            console.error("Lỗi khi kết nối tới API:", error);
        }
    }

    return (
        <header className="main-header" style={{
            display: 'flex', justifyContent: 'space-between', padding: '10px 10px',
            position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000
        }}>
            {/* Logo */}
            <div className="logo-container">
                <a href="/admin" className="logo">
                    <img src="https://file.hstatic.net/200000636033/file/logo_fd11946b31524fbe98765f34f3de0628.svg" alt="logo" style={{ width: "200px", marginLeft: 20 }} />
                </a>
            </div>

            {/* Header Navbar */}
            <nav className="navbar navbar-expand-lg navbar-light  ">
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        {/* Admin Account */}
                        <li className="nav-item">
                            <Dropdown>
                                <Dropdown.Toggle
                                    // variant="success"
                                    id="dropdown-basic"
                                    className="nav-link dropdown-toggle"
                                >
                                    {/* <img
                                        src={admin ? "../../../assets/images/avatar2.png" : "../../../assets/images/avatar2.png"}
                                        className="user-image"
                                        alt="Admin"
                                    /> */}
                                    <span className="d-none d-lg-inline" style={{color:'black'}}>{admin ? `${admin.firstName} ${admin.lastName}` : "Loading..."}</span>
                                </Dropdown.Toggle>

                                <Dropdown.Menu style={{backgroundColor:'red'}}>
                                    <Dropdown.Item href="" onClick={handleLogout}>Sign out</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;
