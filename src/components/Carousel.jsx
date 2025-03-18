import React, { useEffect, useState } from "react";
 

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const images = [
        "https://file.hstatic.net/200000722513/file/thang_11_laptop_asus_gearvn_800x400.jpg",
        "https://file.hstatic.net/200000722513/file/uu_dai_soc_banner_web_slider_800x400.png",
        "https://file.hstatic.net/200000722513/file/thang_11_laptop_asus_rog800x400.jpg",
        "https://file.hstatic.net/200000722513/file/t10_amd_banner_hlw_800_x_400_131e1c6d5c294fe8ad9051d43fc733c2.png"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 6000); // Chuyển ảnh sau 3 giây

        return () => clearInterval(interval); // Clear interval khi component unmount
    }, [images.length]);

    return (
        <div className="carousel">
            <div className="carousel-images">
                {images.map((src, index) => (
                    <img
                        key={index}
                        src={src}
                        className={`carousel-image ${currentIndex === index ? "active" : ""}`}
                        alt={`carousel-${index + 1}`}
                    />
                ))}
            </div>
            {/* <div className="carousel-indicators">
                {images.map((_, index) => (
                    <button
                        key={index}
                        className={`indicator ${currentIndex === index ? "active" : ""}`}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div> */}
        </div>
    );
};

export default Carousel;
