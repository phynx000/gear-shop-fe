import React from 'react';
 
import "../css/bootstrap.min.css";
import "../css/all.css";
import "../css/index.css";
import "../css/product.css";
const Footer = () => {
    return (
        <div id="footer" className="mt-5 w-100">
            <div className="container">
                <div id="footer-main">
                    <div className="row">
                        {/* Giới thiệu */}
                        <div className="col-md-5 mt-3">
                            <div className="cty-name">
                                <a href="../html/home.html">
                                    <img src="https://file.hstatic.net/200000636033/file/logo_fd11946b31524fbe98765f34f3de0628.svg" style={{ width: '70px' }} alt="logo" />
                                </a>
                                <span className="ten-cty"> Công ty GearVN </span>
                            </div>

                            <div className="cty-about mt-2">
                                <span className="contact-icon">
                                    <span><i className="fa-solid fa-computer"></i></span>
                                </span>
                                <div className="contact-detail">
                                    Chuyên cung cấp các sản phẩm công nghệ, máy tính, linh kiện và phụ kiện chính hãng, hỗ trợ tối ưu cho nhu cầu làm việc và giải trí.
                                </div>
                            </div>

                            <div className="cty-ban-quyen mt-2">
                                <span className="contact-icon">
                                    <i className="fa-solid fa-check"></i>
                                </span>
                                <div className="contact-detail">
                                    © Mọi hình ảnh và thông tin trên website thuộc quyền sở hữu của GearVN.
                                    Mọi giao dịch đều là ảo không thể thanh toán.
                                </div>
                            </div>

                            <div className="cty-muc-dich mt-2">
                                <span className="contact-icon">
                                    <i className="fa-solid fa-school"></i>
                                </span>
                                <div className="contact-detail">
                                    Dự án cung cấp các sản phẩm và dịch vụ công nghệ cho cộng đồng đam mê máy tính, từ các sản phẩm chơi game đến công việc văn phòng.
                                </div>
                            </div>
                        </div>

                        {/* Liên hệ */}
                        <div className="col-md-3 mt-3">
                            <div className="cty-title-contact">
                                <span className="ten-cty">Liên hệ</span>
                            </div>

                            <div className="cty-address mt-2">
                                <span className="contact-icon">
                                    <i className="fa-solid fa-location-dot"></i>
                                </span>
                                <div className="contact-detail">
                                    Địa chỉ: 123 Đường Công Nghệ, Quận 1, TP.HCM
                                </div>
                            </div>

                            <div className="cty-tel mt-2">
                                <span className="contact-icon">
                                    <i className="fa-solid fa-phone"></i>
                                </span>
                                <div className="contact-detail">
                                    <a href="tel:+028 123 4567">Điện thoại: +028 123 4567</a>
                                </div>
                            </div>

                            <div className="cty-mail mt-2">
                                <span className="contact-icon">
                                    <i className="fa-solid fa-envelope"></i>
                                </span>
                                <div className="contact-detail">
                                    <a href="mailto:cskh@gearvn.com">Email: cskh@gearvn.com</a>
                                </div>
                            </div>
                        </div>

                        {/* Theo dõi chúng tôi */}
                        <div className="col-md-4 mt-3">
                            <div className="cty-follow-us mb-3">
                                <span className="ten-cty mb-2">Tương tác với chúng tôi</span>
                                <ul id="bottom-social-media" className="font-size-lagre">
                                    <li className="list-inline-item mx-2"><a href="#"><i className="fab fa-facebook"></i></a></li>
                                    <li className="list-inline-item mx-2"><a href="#"><i className="fab fa-instagram"></i></a></li>
                                    <li className="list-inline-item mx-2"><a href="#"><i className="fab fa-tiktok"></i></a></li>
                                    <li className="list-inline-item mx-2"><a href="#"><i className="fab fa-youtube"></i></a></li>
                                </ul>
                            </div>

                            <div className="mb-3">
                                <span className="ten-cty my-2">Phương thức thanh toán</span>
                                <ul className="nav">
                                    <li className="mx-1"><img style={{width:'70px',height:"30px"}} src="https://theme.hstatic.net/200000722513/1001090675/14/pay_2.png?v=6738" alt="" /></li>
                                    <li className="mx-1"><img style={{width:'70px',height:"30px"}} src="https://theme.hstatic.net/200000722513/1001090675/14/pay_7.png?v=6738" alt="" /></li>
                                    <li className="mx-1"><img style={{width:'70px',height:"30px"}} src="https://theme.hstatic.net/200000722513/1001090675/14/pay_4.png?v=6738" alt="" /></li>
                                </ul>
                            </div>

                            <div className="mb-3">
                                <span className="ten-cty my-2">Phương thức vận chuyển</span>
                                <ul className="nav">
                                    <li className="mx-1"><img style={{width:'70px',height:"30px"}} src="https://theme.hstatic.net/200000722513/1001090675/14/ship_1.png?v=6738" alt="" /></li>
                                    <li className="mx-1"><img style={{width:'70px',height:"30px"}} src="https://theme.hstatic.net/200000722513/1001090675/14/ship_2.png?v=6738" alt="" /></li>
                                    <li className="mx-1"><img style={{width:'70px',height:"30px"}} src="https://theme.hstatic.net/200000722513/1001090675/14/ship_3.png?v=6738" alt="" /></li>
                                    <li className="mx-1"><img style={{width:'70px',height:"30px"}} src="https://theme.hstatic.net/200000722513/1001090675/14/ship_4.png?v=6738" alt="" /></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
 
            </div>
        </div>
    );
};

export default Footer;
