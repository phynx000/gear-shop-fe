import React from "react";
import CartComponent from "../components/CartComponent";
import ShoppingCartButton from "../components/ShoppingCartButton";

const Cart = () => {
    return (
        <div>
            <div className="container mt-5">
                <div className="row justify-content-end">
                    <div className="col-md-3">
                        <ShoppingCartButton />
                    </div>
                </div>
            </div>
            <CartComponent />
        </div>
    );
};

export default Cart;
