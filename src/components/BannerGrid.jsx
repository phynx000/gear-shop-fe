import React from "react";

const BannerGrid = () => {
    const banners = [
        { img: "/img/banner4.jpg", title: "Miễn phí nâng cấp", price: "1.880.000đ" },
        { img: "/img/banner5.jpg", title: "Loa hay giá tốt", price: "280.000đ" },
        { img: "/img/banner6.jpg", title: "Laptop GearVN", price: "9.990.000đ" },
        { img: "/img/banner7.jpg", title: "PC i5 4060", price: "14.490.000đ" },
    ];

    return (
        <div className="banner-grid">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "15px" }}>
                {banners.map((banner, index) => (
                    <div className="banner-item" key={index}>
                        <img src={banner.img} alt={banner.title} className="img-fluid" />
                        <div className="banner-info">
                            <h3>{banner.title}</h3>
                            <p>Giá chỉ từ: {banner.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BannerGrid;
