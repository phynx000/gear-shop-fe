import React, { useState, useEffect } from "react";

const ShoppingCartButton = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(cart);
    }, []);

    return (
        <div className="shopping-cart">
            <button
                className="btn shopping-cart-btn dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
            >
                <span className="num-item-in-cart rounded-circle">
                    {cartItems.length}
                </span>
                <i className="fa-solid fa-cart-plus"></i>
            </button>
            <div
                className="dropdown-menu dropdown-menu-right"
                aria-labelledby="dropdownMenuButton"
            >
                {cartItems.length === 0 ? (
                    <div className="dropdown-item figure text-center rounded-0 p-3 mx-auto empty-cart-message">
                        <div className="figure-caption text-bg text-big">
                            Chưa có sản phẩm nào trong giỏ hàng
                        </div>
                    </div>
                ) : (
                    cartItems.map((item, index) => (
                        <div key={index} className="dropdown-item">
                            {item.name} - {item.quantity} x {item.price}₫
                        </div>
                    ))
                )}
                <a
                    href="../html/gio-hang.html"
                    className="btn w-100 text-md mx-auto mt-3 pay-btn"
                >
                    Thanh toán
                </a>
            </div>
        </div>
    );
};

export default ShoppingCartButton;
