import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

const SupplierTable = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState(null);
    const [formData, setFormData] = useState({ id: "", tenNCC: "", diaChi: "", email: "" });
    const [searchTerm, setSearchTerm] = useState(""); // Thêm state tìm kiếm

    // Fetch nhà cung cấp
    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const response = await axios.get("http://localhost:9998/api/san-pham/nhacungcap");
                setSuppliers(response.data.data.nhacungcap);
            } catch (error) {
                console.error("Error fetching suppliers:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSuppliers();
    }, []);

    // Xóa nhà cung cấp
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Bạn có chắc muốn xóa nhà cung cấp này không?");
        if (confirmDelete) {
            const token = localStorage.getItem("token");
            if (!token) {
                console.warn("Không tìm thấy token. Bỏ qua việc gọi API.");
                return;
            }
            try {
                await axios.delete(`http://localhost:9998/api/admin/nhacungcap/xoa/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
                alert("Xóa nhà cung cấp thành công!");
                setSuppliers(suppliers.filter((supplier) => supplier.maNhaCungCap !== id));
            } catch (error) {
                console.error("Error deleting supplier:", error);
                alert("Xóa nhà cung cấp thất bại!");
            }
        }
    };

    // Mở modal cập nhật
    const handleUpdate = (supplier) => {
        setSelectedSupplier(supplier);
        setFormData({
            tenNCC: supplier.tenNhaCungCap,
            diaChi: supplier.diaChi,
            email: supplier.email,
        });
        setShowModal(true);
    };

    // Cập nhật dữ liệu form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Submit cập nhật nhà cung cấp
    const handleUpdateSubmit = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.warn("Không tìm thấy token. Bỏ qua việc gọi API.");
                return;
            }
            const response = await axios.put(
                `http://localhost:9998/api/admin/nhacungcap/capnhat/${selectedSupplier.maNhaCungCap}`,
                formData, // Dữ liệu form được gửi ở đây
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.data.isUpdated) {
                alert("Cập nhật thành công!");
                // Cập nhật danh sách nhà cung cấp
                setSuppliers(
                    suppliers.map((supplier) =>
                        supplier.maNhaCungCap === selectedSupplier.maNhaCungCap
                            ? response.data.data
                            : supplier
                    )
                );
            } else {
                alert("Không tìm thấy nhà cung cấp để cập nhật.");
            }
        } catch (error) {
            console.error("Cập nhật thất bại:", error.response ? error.response.data : error.message);
            alert("Cập nhật thất bại!");
        }
    };

    // Lọc danh sách nhà cung cấp theo tên
    // const filteredSuppliers = suppliers.filter(supplier =>
    //     supplier.tenNhaCungCap.toLowerCase().includes(searchTerm.toLowerCase())
    // );
    const filteredSuppliers = suppliers.filter(supplier =>
        supplier.tenNhaCungCap && supplier.tenNhaCungCap.toLowerCase().includes(searchTerm.toLowerCase())
    );


    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container" style={{ marginTop: 100 }}>
            <h1>Danh Sách Nhà Cung Cấp</h1>

            {/* Ô tìm kiếm */}
            <input
                type="text"
                className="form-control"
                placeholder="Tìm kiếm theo tên nhà cung cấp..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ marginBottom: '20px', width: '300px' }}
            />

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên Nhà Cung Cấp</th>
                        <th>Địa Chỉ</th>
                        <th>Email</th>
                        <th>Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredSuppliers.map((supplier, index) => (
                        <tr key={supplier.maNhaCungCap}>
                            <td>{index + 1}</td>
                            <td>{supplier.tenNhaCungCap}</td>
                            <td>{supplier.diaChi}</td>
                            <td>{supplier.email}</td>
                            <td>
                                <div style={{ display: "flex" }}>
                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={() => handleUpdate(supplier)}
                                    >
                                        Cập nhật
                                    </button>
                                    &nbsp;
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(supplier.maNhaCungCap)}
                                    >
                                        Xóa
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal Cập Nhật */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Cập Nhật Nhà Cung Cấp</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label>Tên Nhà Cung Cấp</label>
                        <input
                            type="text"
                            className="form-control"
                            name="tenNCC"
                            value={formData.tenNCC}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Địa Chỉ</label>
                        <input
                            type="text"
                            className="form-control"
                            name="diaChi"
                            value={formData.diaChi}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={handleUpdateSubmit}>
                        Lưu Thay Đổi
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default SupplierTable;
