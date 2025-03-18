// CategoryAside component

import React from "react";
import useCategories from "../hooks/useCategory";
import { useEffect } from "react";


const CategoryAside = () => {

    const { categories, loading, error, currentCategory, handleCategoryChange } = useCategories();
    useEffect(() => {
        console.log("CategoryAside mounted");
        return () => console.log("CategoryAside unmounted");
    }, []);

    return (
        <aside className="category-aside">
            <h4>Danh mục</h4>
            <div className="list-group">
                {loading ? (
                    <div>Loading...</div>
                ) : error ? (
                    <div>{error}</div>
                ) : (
                    categories.map((category) => (
                        <button
                            key={category.id}
                            className={`list-group-item list-group-item-action ${
                                currentCategory === String(category.id) ? "active" : ""
                            }`}
                            onClick={() => handleCategoryChange(category.id)}
                        >
                            {category.name}
                        </button>
                    ))
                )}
            </div>
        </aside>
    );
};

export default CategoryAside;
