import React, { useState } from "react";
import "../../css/filterModel.css";

const ProductFilters = ({ selectedFilters, setSelectedFilters }) => {
    const [activeFilter, setActiveFilter] = useState(null);
    const [brands, setBrands] = useState([]);
    // Danh sách bộ lọc (dễ mở rộng)

    const fetchBrands = async () => {
    
    
    }

    const filters = [
        {
            key: "brand",
            label: "Thương hiệu",
            options: ["Tất cả", "ASUS", "Dell", "HP"],
        },
        {
            key: "price",
            label: "Khoảng giá",
            options: ["Dưới 5 triệu", "5 - 10 triệu", "10 - 20 triệu", "Trên 20 triệu"],
        },
        {
            key: "cpu",
            label: "CPU",
            options: ["Intel Core i3", "Intel Core i5", "Intel Core i7", "AMD Ryzen 5"],
        },
    ];

    // Bật/tắt modal
    const toggleFilter = (filterKey) => {
        setActiveFilter(activeFilter === filterKey ? null : filterKey);
    };

    // Chọn giá trị filter
    const handleSelectFilter = (filterKey, value) => {
        setSelectedFilters((prev) => ({
            ...prev,
            [filterKey]: value,
        }));
        setActiveFilter(null);
    };

    return (
        <div className="row mb-3">
            {filters.map((filter) => (
                <div key={filter.key} className="col-lg-2 col-md-4 position-relative">
                    <button className="btn btn-outline-primary w-100" onClick={() => toggleFilter(filter.key)}>
                        {filter.label}
                    </button>

                    {activeFilter === filter.key && (
                        <div className="filter-modal">
                            <ul>
                                {filter.options.map((option, index) => (
                                    <li key={index} onClick={() => handleSelectFilter(filter.key, option)}>
                                        {option}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ProductFilters;
