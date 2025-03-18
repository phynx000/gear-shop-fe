import React, { useState } from "react";
import axios from "axios";

const AddBrandForm = () => {
    const [brandName, setBrandName] = useState("");

    // Xử lý khi submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!brandName.trim()) {
            alert("Vui lòng nhập tên thương hiệu!");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.warn("Không tìm thấy token. Bỏ qua việc gọi API.");
                return;
            }

            const response = await axios.post(
                "http://localhost:9998/api/admin/sanpham/thuonghieu/them",
                { tenThuongHieu: brandName },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.data.status === "success" && response.data.isCreated) {
                alert("Thêm thương hiệu thành công!");
                setBrandName(""); // Xóa input sau khi thêm thành công
            } else {
                alert("Thêm thương hiệu thất bại hoặc thương hiệu này đã tồn tại trước đó!");
            }
        } catch (error) {
            console.error("Error adding brand:", error);
            alert("Thêm thương hiệu thất bại!");
        }
    };


    return (
        <div className="container" style={{ marginTop: 100 }}>
            <h2>Thêm Thương Hiệu Mới</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Tên Thương Hiệu</label>
                    <input
                        type="text"
                        className="form-control"
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Thêm
                </button>
            </form>
        </div>
    );
};

export default AddBrandForm;
