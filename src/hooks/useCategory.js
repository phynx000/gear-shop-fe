import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getCategory } from "../services/category_service";

const useCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setLoading(true);
        getCategory()
            .then((data) => {
                console.log("After fetch - Categories:", data);
                setCategories([{ id: 'all', name: 'Tất cả sản phẩm' }, ...data]);
            })
            .catch((error) => setError(error.message))
            .finally(() => setLoading(false));
    }, [location.search]);

    const query = new URLSearchParams(location.search);
    const currentCategory = query.get("category") || "all";

    const handleCategoryChange = (categoryId) => {
        navigate(categoryId === "all" ? "/product" : `/product?category=${categoryId}`);
    };

    return { categories, loading, error, currentCategory, handleCategoryChange };
};

export default useCategories;
