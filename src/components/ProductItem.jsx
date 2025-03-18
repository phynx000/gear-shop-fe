
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductItem = ({ product, productImage}) => {
    const navigate = useNavigate();
    const firstImage = product.images.length > 0 ? product.images[0].image : "https://via.placeholder.com/150";
    

    return (
        <div className="col-md-4 col-lg-3 col-6 my-1 px-1">
            <div className="product-card">
                <div className="product-content d-flex flex-column">
                    <img src={firstImage} alt={product.name} className="card-img-top"  />
                    <div className="product-title">{product.name}</div>
                    <div className="product-price">{product.price.toLocaleString()}đ</div>
                </div>
            </div>
        </div>
    );
};

export default ProductItem;
