import React, { useState } from "react";
import axios from "axios";

const AddSupplierForm = () => {
    const [formData, setFormData] = useState({
        tenNCC: "",
        diaChi: "",
        email: "",
    });

    const [errors, setErrors] = useState({
        tenNCC: "",
        diaChi: "",
        email: "",
    });

    const [modalShow, setModalShow] = useState(false);
    const [currentSupplier, setCurrentSupplier] = useState(null);

    const validate = () => {
        let isValid = true;
        const newErrors = {};

        if (!formData.tenNCC.trim()) {
            newErrors.tenNCC = "Tên nhà cung cấp không được để trống.";
            isValid = false;
        }

        if (!formData.diaChi.trim()) {
            newErrors.diaChi = "Địa chỉ không được để trống.";
            isValid = false;
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email không được để trống.";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email không hợp lệ.";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.warn("Không tìm thấy token. Bỏ qua việc gọi API.");
                return;
            }

            const response = await axios.post(
                "http://localhost:9998/api/admin/nhacungcap/them",
                formData, // Dữ liệu form được gửi ở đây
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const { data } = response.data;
            const isUpdated = response.data.isUpdated;

            if (isUpdated) {
                alert("Nhà cung cấp đã tồn tại và thông tin đã được cập nhật!");
            } else {
                alert("Thêm nhà cung cấp thành công!");
            }

            setFormData({ tenNCC: "", diaChi: "", email: "" }); // Reset form
            setErrors({});
        } catch (error) {
            console.error("Error adding supplier:", error);
            alert("Thêm nhà cung cấp thất bại. Vui lòng thử lại.");
        }
    };

    const handleUpdate = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.warn("Không tìm thấy token. Bỏ qua việc gọi API.");
            return;
        }
        try {
            const response = await axios.put(
                `http://localhost:9998/api/admin/nhacungcap/capnhat/${currentSupplier.tenNCC}`,
                formData, // Dữ liệu form được gửi ở đây
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.data.isUpdated) {
                alert("Cập nhật thông tin thành công!");
            } else {
                alert("Nhà cung cấp không tồn tại.");
            }

            setModalShow(false);
            setFormData({ tenNCC: "", diaChi: "", email: "" });
        } catch (error) {
            console.error("Error updating supplier:", error);
            alert("Cập nhật thất bại. Vui lòng thử lại.");
        }
    };

    const handleDelete = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.warn("Không tìm thấy token. Bỏ qua việc gọi API.");
            return;
        }
        try {
            const response = await axios.delete(
                `http://localhost:9998/api/admin/nhacungcap/xoa/${currentSupplier.tenNCC}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.data.isDeleted) {
                alert("Nhà cung cấp đã bị xóa thành công.");
            } else {
                alert("Không tìm thấy nhà cung cấp để xóa.");
            }

            setModalShow(false);
            setFormData({ tenNCC: "", diaChi: "", email: "" });
        } catch (error) {
            console.error("Error deleting supplier:", error);
            alert("Xóa nhà cung cấp thất bại. Vui lòng thử lại.");
        }
    };

    return (
        <div className="container" style={{ marginTop: 100 }}>
            <h1>Thêm Nhà Cung Cấp</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="tenNCC">Tên Nhà Cung Cấp</label>
                    <input
                        type="text"
                        className={`form-control ${errors.tenNCC ? "is-invalid" : ""}`}
                        id="tenNCC"
                        name="tenNCC"
                        value={formData.tenNCC}
                        onChange={handleInputChange}
                    />
                    {errors.tenNCC && <div className="invalid-feedback">{errors.tenNCC}</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="diaChi">Địa Chỉ</label>
                    <input
                        type="text"
                        className={`form-control ${errors.diaChi ? "is-invalid" : ""}`}
                        id="diaChi"
                        name="diaChi"
                        value={formData.diaChi}
                        onChange={handleInputChange}
                    />
                    {errors.diaChi && <div className="invalid-feedback">{errors.diaChi}</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        className={`form-control ${errors.email ? "is-invalid" : ""}`}
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                <button type="submit" className="btn btn-primary">
                    Thêm Nhà Cung Cấp
                </button>
                {/* Cập nhật và xóa button */}
                {/* <button
                    type="button"
                    className="btn btn-warning ml-2"
                    onClick={() => setModalShow(true)}
                >
                    Cập Nhật / Xóa
                </button> */}
            </form>

            {modalShow && (
                <div className="modal show" style={{ display: "block" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Cập Nhật / Xóa Nhà Cung Cấp</h5>
                                <button
                                    type="button"
                                    className="close"
                                    onClick={() => setModalShow(false)}
                                >
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Bạn có muốn cập nhật hay xóa nhà cung cấp này không?</p>
                                <button
                                    className="btn btn-success"
                                    onClick={handleUpdate}
                                >
                                    Cập Nhật
                                </button>
                                <button
                                    className="btn btn-danger ml-2"
                                    onClick={handleDelete}
                                >
                                    Xóa
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddSupplierForm;
