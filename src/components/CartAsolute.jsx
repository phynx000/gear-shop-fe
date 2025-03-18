import React, { useState } from 'react';

const CartAsolute = () => {
    const [cartItems, setCartItems] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Điều khiển trạng thái mở/đóng dropdown

    const addToCart = (product) => {
        setCartItems([...cartItems, product]);
    };

    // Hàm toggle dropdown
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // CSS inline cho dropdown để đảm bảo nó nằm bên trái nút
    const dropdownStyles = {
        position: 'absolute',
        right: '1119px', // Bạn có thể điều chỉnh giá trị này nếu cần
        left: '-258px', // Điều chỉnh khoảng cách từ bên trái
        top: '100%', // Dropdown sẽ xuất hiện dưới nút
        zIndex: 1000,
        width: '310px',
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 6px',
        padding: '10px',
        backgroundColor: 'rgb(255, 255, 255)',
        borderRadius: '5px',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '300px',
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-end">
                <div className="col-md-3">
                    <div className="shopping-cart">
                        <button
                            className="btn shopping-cart-btn dropdown-toggle"
                            type="button"
                            onClick={toggleDropdown}  // Mở/đóng dropdown khi nhấn nút
                            aria-haspopup="true"
                            aria-expanded={isDropdownOpen ? 'true' : 'false'}>
                            <span className="num-item-in-cart rounded-circle">{cartItems.length}</span>
                            <i className="fa-solid fa-cart-plus"></i>
                        </button>
                        {isDropdownOpen && (
                            <div className="dropdown-menu" style={dropdownStyles}> {/* Áp dụng CSS inline */}
                                <div className="cart-items-container">
                                    {cartItems.length === 0 ? (
                                        <div className="dropdown-item figure text-center rounded-0 p-3 mx-auto empty-cart-message">
                                            Chưa có sản phẩm nào trong giỏ hàng
                                        </div>
                                    ) : (
                                        cartItems.map((item, index) => (
                                            <div key={index} className="dropdown-item">
                                                <p>{item.name}</p>
                                            </div>
                                        ))
                                    )}
                                </div>
                                <a href="../html/gio-hang.html" className="btn w-100 text-md mx-auto mt-3 pay-btn">Thanh toán</a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartAsolute;
