import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

const ProductTable = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");

    const [formData, setFormData] = useState({
        tenSanPham: "",
        heDieuHanh: "",
        manHinh: "",
        hinhAnh: "",
        ram: "",
        rom: "",
        cpu: "",
        cardDoHoa: "",
        pin: "",
        trongLuong: "",
        mauSac: "",
        loaiPin: "",
        tinhNangKhac: "",
        tenNCC: "",
        diaChiNCC: "",
        emailNCC: "",
        tenThuongHieu: "",
        tenHangMuc: "",
        donGiaNhapNCC: "",
        chiphiLuuKho: "",
        chiPhiQuanLy: "",
        phantramloinhan: "",
        soLuong: ""
    });
    const buttonStyle = (isDisabled, isActive) => ({
        padding: '8px 16px',
        margin: '0 5px',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: isDisabled
            ? '#ccc'
            : isActive
                ? '#0056b3'
                : '#007bff',
        color: isDisabled ? '#666' : '#fff',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        fontSize: '14px',
        transition: 'background-color 0.3s ease',
    });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; // Change this to the number of items you want per page

    useEffect(() => {
        const fetchProducts = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                console.warn("Không tìm thấy token. Bỏ qua việc gọi API.");
                return;
            }
            try {
                const response = await axios.get("http://localhost:9998/api/admin/sanpham/laptop", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
                setProducts(response.data.data.sanphams || []);
            } catch (error) {
                console.error("Error fetching products:", error.response ? error.response.data : error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const [errors, setErrors] = useState({});
    const [nhacungcaps, setNhaCungCaps] = useState([]);
    const [thuonghieus, setThuongHieus] = useState([]);
    const [loaisanphams, setLoaiSanPhams] = useState([]);
    useEffect(() => {
        // Lấy danh sách nhà cung cấp, thương hiệu, và loại sản phẩm từ backend
        axios.get('http://localhost:9998/api/san-pham/nhacungcap')
            .then(response => setNhaCungCaps(response.data.data.nhacungcap));
        axios.get('http://localhost:9998/api/san-pham/thuonghieu')
            .then(response => setThuongHieus(response.data.data.thuonghieu));
        axios.get('http://localhost:9998/api/san-pham/category')
            .then(response => setLoaiSanPhams(response.data.data.loaisanPham));
    }, []);

    const fetchProducts = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.warn("Không tìm thấy token. Bỏ qua việc gọi API.");
            return;
        }
        try {
            const response = await axios.get("http://localhost:9998/api/admin/sanpham/laptop", {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            setProducts(response.data.data.sanphams || []);
        } catch (error) {
            console.error("Error fetching products:", error.response ? error.response.data : error.message);
        } finally {
            setLoading(false);
        }
    };
    const handleUpdate = (product) => {
        setSelectedProduct(product);
        setFormData({
            tenSanPham: product.tenSanPham,
            heDieuHanh: product.lapTop?.heDieuHanh,
            manHinh: product.lapTop?.manHinh,
            hinhAnh: product.hinhAnh?.url,
            ram: product.lapTop?.ram,
            rom: product.lapTop?.rom,
            cpu: product.lapTop?.cpu,
            cardDoHoa: product.lapTop?.cardDoHoa,
            pin: product.lapTop?.pin,
            trongLuong: product.lapTop?.trongLuong,
            mauSac: product.lapTop?.mauSac,
            loaiPin: product.lapTop?.loaiPin,
            tinhNangKhac: product.lapTop?.tinhNangKhac,
            tenNCC: product.chiTietNhapHangs?.[0]?.nhaCungCap?.tenNhaCungCap || '',
            diaChiNCC: product.chiTietNhapHangs?.[0]?.nhaCungCap?.diaChi || '',
            emailNCC: product.chiTietNhapHangs?.[0]?.nhaCungCap?.email || '',
            tenThuongHieu: product.thuongHieu?.tenThuongHieu || '',
            tenHangMuc: product.loaiSanPham?.tenLoaiSanPham || '',
            donGiaNhapNCC: product.chiTietNhapHangs?.[0]?.donGiaNhap || '',
            chiphiLuuKho: product.chiTietNhapHangs?.[0]?.chiPhiLuuKho || '',
            chiPhiQuanLy: product.chiTietNhapHangs?.[0]?.chiPhiQuanLy || '',
            phantramloinhan: product.chiTietNhapHangs?.[0]?.phanTramLoiNhuan || '',
            soLuong: product.chiTietNhapHangs?.[0]?.soLuong || ''
        });
        setShowModal(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUpdateSubmit = async () => {
        try {
            const response = await axios.put(
                `http://localhost:9998/api/admin/sanpham/update/${selectedProduct.id}`,
                formData
            );
            if (response.data.isUpdated) {
                alert("Cập nhật thành công!");
                setProducts(
                    products.map((product) =>
                        product.id === selectedProduct.id
                            ? { ...product, ...response.data.data }
                            : product
                    )
                );
                setShowModal(false);
            } else {
                alert("Không tìm thấy sản phẩm để cập nhật.");
            }
        } catch (error) {
            console.error("Cập nhật thất bại:", error);
            alert("Cập nhật thất bại!");
        }
    };
    // const handleSave = async () => {
    //     try {
    //         // Gửi dữ liệu formData lên API để cập nhật sản phẩm
    //         const response = await axios.put(
    //             `http://localhost:9998/api/admin/sanpham/update/${selectedProduct.maSanPham}`,
    //             formData
    //         );

    //         // Kiểm tra trạng thái trả về từ API
    //         if (response.data.status === "success") {
    //             // Nếu cập nhật thành công, thông báo và cập nhật lại danh sách sản phẩm
    //             alert("Cập nhật thành công!");
    //             fetchProducts()
    //             // Cập nhật sản phẩm trong state
    //             setProducts(
    //                 products.map((product) =>
    //                     product.maSanPham === selectedProduct.maSanPham
    //                         ? { ...product, ...formData } // Cập nhật sản phẩm với formData
    //                         : product
    //                 )
    //             );

    //             // Đóng modal
    //             setShowModal(false);
    //         } else {
    //             alert("Cập nhật thất bại, không tìm thấy sản phẩm.");
    //         }
    //     } catch (error) {
    //         console.error("Cập nhật thất bại:", error.response || error);
    //         alert("Có lỗi xảy ra khi cập nhật sản phẩm!");
    //     }
    // };

    const handleSave = async () => {
        try {
            const updatedData = {
                tenSanPham: formData.tenSanPham,
                heDieuHanh: formData.heDieuHanh,
                manHinh: formData.manHinh,
                hinhAnh: formData.hinhAnh,
                ram: formData.ram,
                rom: formData.rom,
                cpu: formData.cpu,
                cardDoHoa: formData.cardDoHoa,
                pin: formData.pin,
                trongLuong: formData.trongLuong,
                mauSac: formData.mauSac,
                loaiPin: formData.loaiPin,
                tinhNangKhac: formData.tinhNangKhac,
                tenNCC: formData.tenNCC,
                diaChiNCC: formData.diaChiNCC,
                emailNCC: formData.emailNCC,
                tenThuongHieu: formData.tenThuongHieu,
                tenHangMuc: formData.tenHangMuc,
                donGiaNhapNCC: formData.donGiaNhapNCC,
                chiphiLuuKho: formData.chiphiLuuKho,
                chiPhiQuanLy: formData.chiPhiQuanLy,
                phantramloinhan: formData.phantramloinhan,
                soLuong: formData.soLuong
            };
            const token = localStorage.getItem("token");
            if (!token) {
                console.warn("Không tìm thấy token. Bỏ qua việc gọi API.");
                return;
            }
            const response = await axios.put(
                `http://localhost:9998/api/admin/sanpham/update/${selectedProduct.maSanPham}`,
                updatedData, // Dữ liệu form được gửi ở đây
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.data.status === "success") {
                alert("Cập nhật thành công!");
                fetchProducts();
                setProducts(
                    products.map((product) =>
                        product.maSanPham === selectedProduct.maSanPham
                            ? { ...product, ...updatedData }
                            : product
                    )
                );
                setShowModal(false);
            } else {
                alert("Cập nhật thất bại!");
            }
        } catch (error) {
            console.error("Cập nhật thất bại:", error.response ? error.response.data : error.message);
            alert("Có lỗi xảy ra khi cập nhật sản phẩm!");
        }
    };




    // Xử lý xóa sản phẩm
    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
            const token = localStorage.getItem("token");
            if (!token) {
                console.warn("Không tìm thấy token. Bỏ qua việc gọi API.");
                return;
            }
            try {
                const response = await axios.delete(
                    `http://localhost:9998/api/admin/sanpham/xoa/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                if (response.data.status === "success") {
                    alert("Xóa sản phẩm thành công!");
                    // Cập nhật lại danh sách sản phẩm sau khi xóa
                    setProducts((prevProducts) => prevProducts.filter((product) => product.maSanPham !== id));
                } else {
                    alert("Xóa sản phẩm thất bại!");
                }
            } catch (error) {
                console.error("Error deleting product:", error.response ? error.response.data : error.message);
                alert("Xóa sản phẩm thất bại!");
            }
        }
    };



    const paginateProducts = () => {
        const indexOfLastProduct = currentPage * itemsPerPage;
        const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
        return products.slice(indexOfFirstProduct, indexOfLastProduct);
    };

    const totalPages = Math.ceil(products.length / itemsPerPage);

    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    if (loading) {
        return <div>Đang tải dữ liệu...</div>;
    }
    const handlePageChange = (pageNumber) => {
        // Cập nhật state cho trang hiện tại
        setCurrentPage(pageNumber);
    };
    const handleNCCChange = (e) => {
        const selectedTenNCC = e.target.value;
        const selectedNCC = nhacungcaps.find(ncc => ncc.tenNhaCungCap === selectedTenNCC);

        setFormData({
            ...formData,
            tenNCC: selectedTenNCC,
            diaChiNCC: selectedNCC ? selectedNCC.diaChi : '',
            emailNCC: selectedNCC ? selectedNCC.email : '',
        });
    };


    const filteredProducts = products.filter((product) =>
        product.tenSanPham.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const paginateFilteredProducts = () => {
        const indexOfLastProduct = currentPage * itemsPerPage;
        const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
        return filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    };

    return (
        <div className="container-fluid " style={{ marginTop: 100 }}>

            <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                <input
                    type="text"
                    placeholder="Tìm kiếm sản phẩm..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        width: '50%',
                        padding: '10px',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                        fontSize: '16px',
                    }}
                />
            </div>
            <h1>Danh Sách Sản Phẩm</h1>
            {products.length === 0 ? (
                <p>Không có sản phẩm nào.</p>
            ) : (
                <>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tên Sản Phẩm</th>
                                <th>Loại Sản Phẩm</th>
                                <th>Thương Hiệu</th>
                                <th>Hình Ảnh</th>
                                <th>Nhà Cung Cấp</th>
                                <th>Giá Nhập</th>
                                <th>Chi Phí</th>
                                <th>Tính Năng Khác</th>
                                <th>Số Lượng </th>
                                <th>Hành Động</th>
                            </tr>
                        </thead>
                        <tbody>
                                {paginateFilteredProducts().map((product, index) => (
                                <tr key={product.id}>
                                    <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                                    <td>{product.tenSanPham}</td>
                                    <td>{product.loaiSanPham?.tenLoaiSanPham}</td>
                                    <td>{product.thuongHieu?.tenThuongHieu}</td>
                                    <td>
                                        <img
                                            src={product.hinhAnh?.url}
                                            alt={product.tenSanPham}
                                            style={{ width: "80px", height: "75px", objectFit: "cover" }}
                                        />
                                    </td>
                                    <td>{product.chiTietNhapHangs[0]?.nhaCungCap?.tenNhaCungCap}</td>
                                    <td>{product.chiTietNhapHangs[0]?.donGiaNhap}</td>
                                    <td>{product.chiTietNhapHangs[0]?.chiPhiLuuKho}</td>
                                    <td>{product.lapTop?.tinhNangKhac}</td>
                                    <td>{product.chiTietNhapHangs[0]?.soLuong}</td>
                                    <td>
                                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>

                                            <button className="btn btn-primary"
                                                style={{ width: "90px", height: "50px", textAlign: "center" }}
                                                onClick={() => handleUpdate(product)}>
                                                Cập nhật
                                            </button>
                                            <button className="btn btn-danger" onClick={() => handleDelete(product.maSanPham)}>
                                                Xóa
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination Controls */}
                    <div style={{ marginTop: '20px', textAlign: 'center' }}>
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            style={buttonStyle(currentPage === 1, false)}
                        >
                            Prev
                        </button>

                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                onClick={() => handlePageChange(index + 1)}
                                style={buttonStyle(false, currentPage === index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}

                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            style={buttonStyle(currentPage === totalPages, false)}
                        >
                            Next
                        </button>
                    </div>

                </>
            )}

            {/* Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Cập nhật sản phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <label>Tên Sản Phẩm</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="tenSanPham"
                                    value={formData.tenSanPham}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group col-md-4">
                                <label>Hệ Điều Hành</label>
                                <select
                                    className="form-control"
                                    name="heDieuHanh"
                                    value={formData.heDieuHanh}
                                    onChange={handleInputChange}
                                >
                                    <option value="Windows">Windows</option>
                                    <option value="macOS">macOS</option>
                                    <option value="Linux">Linux</option>
                                    <option value="Android">Android</option>
                                    <option value="iOS">iOS</option>
                                </select>
                            </div>
                            <div className="form-group col-md-4">
                                <label>Màn Hình</label>
                                <select
                                    className="form-control"
                                    name="manHinh"
                                    value={formData.manHinh}
                                    onChange={handleInputChange}
                                >
                                    <option value="13.3">13.3 inch</option>
                                    <option value="15.6">15.6 inch</option>
                                    <option value="17.3">17.3 inch</option>
                                    <option value="5.5">5.5 inch</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <label>Hình Ảnh</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="hinhAnh"
                                    value={formData.hinhAnh}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group col-md-4">
                                <label>RAM</label>
                                <select
                                    className="form-control"
                                    name="ram"
                                    value={formData.ram}
                                    onChange={handleInputChange}
                                >
                                    <option value="4">4 GB</option>
                                    <option value="8">8 GB</option>
                                    <option value="16">16 GB</option>
                                    <option value="32">32 GB</option>
                                </select>
                            </div>
                            <div className="form-group col-md-4">
                                <label>ROM</label>
                                <select
                                    className="form-control"
                                    name="rom"
                                    value={formData.rom}
                                    onChange={handleInputChange}
                                >
                                    <option value="64">64 GB</option>
                                    <option value="128">128 GB</option>
                                    <option value="256">256 GB</option>
                                    <option value="512">512 GB</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <label>CPU</label>
                                <select
                                    className="form-control"
                                    name="cpu"
                                    value={formData.cpu}
                                    onChange={handleInputChange}
                                >
                                    <option value="Intel">Intel</option>
                                    <option value="AMD">AMD</option>
                                    <option value="ARM">ARM</option>
                                </select>
                            </div>
                            <div className="form-group col-md-4">
                                <label>Card Đồ Họa</label>
                                <select
                                    className="form-control"
                                    name="cardDoHoa"
                                    value={formData.cardDoHoa}
                                    onChange={handleInputChange}
                                >
                                    <option value="NVIDIA">NVIDIA</option>
                                    <option value="AMD">AMD</option>
                                    <option value="Intel">Intel</option>
                                </select>
                            </div>
                            <div className="form-group col-md-4">
                                <label>Pin</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="pin"
                                    value={formData.pin}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <label>Trọng Lượng</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="trongLuong"
                                    value={formData.trongLuong}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group col-md-4">
                                <label>Màu Sắc</label>
                                <select
                                    className="form-control"
                                    name="mauSac"
                                    value={formData.mauSac}
                                    onChange={handleInputChange}
                                >
                                    <option value="Đen">Đen</option>
                                    <option value="Trắng">Trắng</option>
                                    <option value="Bạc">Bạc</option>
                                    <option value="Xanh">Xanh</option>
                                    <option value="Đỏ">Đỏ</option>
                                </select>
                            </div>
                            <div className="form-group col-md-4">
                                <label>Loại Pin</label>
                                <select
                                    className="form-control"
                                    name="loaiPin"
                                    value={formData.loaiPin}
                                    onChange={handleInputChange}
                                >
                                    <option value="Lithium-ion">Lithium-ion</option>
                                    <option value="Lithium-Polymer">Lithium-Polymer</option>
                                    <option value="NiMH">NiMH</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <label>Tính Năng Khác</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="tinhNangKhac"
                                    value={formData.tinhNangKhac}
                                    onChange={handleInputChange}
                                />
                            </div>
                            {/* Nhà cung cấp */}
                            <div className="form-group col-md-4">
                                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Tên nhà cung cấp</label>
                                <select
                                    name="tenNCC"
                                    value={formData.tenNCC}
                                    onChange={handleNCCChange}
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        fontSize: '16px',
                                        borderRadius: '4px',
                                        border: '1px solid #ddd',
                                        boxSizing: 'border-box'
                                    }}
                                >
                                    <option value="">Chọn nhà cung cấp</option>
                                    {nhacungcaps.map((ncc) => (
                                        <option key={ncc.maNhaCungCap} value={ncc.tenNhaCungCap}>{ncc.tenNhaCungCap}</option>
                                    ))}
                                </select>
                                {errors.tenNCC && <div style={{ color: 'red', fontSize: '14px' }}>{errors.tenNCC}</div>}
                            </div>

                            {/* Hiển thị địa chỉ nhà cung cấp */}
                            <div className="form-group col-md-4">
                                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Địa chỉ nhà cung cấp</label>
                                <input
                                    type="text"
                                    name="diaChiNCC"
                                    value={formData.diaChiNCC}
                                    readOnly
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        fontSize: '16px',
                                        borderRadius: '4px',
                                        border: '1px solid #ddd',
                                        boxSizing: 'border-box',
                                        backgroundColor: '#f1f1f1'
                                    }}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Email nhà cung cấp</label>
                                <input
                                    type="email"
                                    name="emailNCC"
                                    value={formData.emailNCC}
                                    readOnly
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        fontSize: '16px',
                                        borderRadius: '4px',
                                        border: '1px solid #ddd',
                                        boxSizing: 'border-box',
                                        backgroundColor: '#f1f1f1'
                                    }}
                                />
                            </div>

                            {/* Thương hiệu */}
                            <div className="form-group col-md-4">
                                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Tên thương hiệu</label>
                                <select
                                    name="tenThuongHieu"
                                    value={formData.tenThuongHieu}
                                    onChange={handleChange}
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        fontSize: '16px',
                                        borderRadius: '4px',
                                        border: '1px solid #ddd',
                                        boxSizing: 'border-box'
                                    }}
                                >
                                    <option value="">Chọn thương hiệu</option>
                                    {thuonghieus.map((thuonghieu) => (
                                        <option key={thuonghieu.maThuongHieu} value={thuonghieu.tenThuongHieu}>{thuonghieu.tenThuongHieu}</option>
                                    ))}
                                </select>
                                {errors.tenThuongHieu && <div style={{ color: 'red', fontSize: '14px' }}>{errors.tenThuongHieu}</div>}
                            </div>

                            {/* Hạng mục */}
                            <div className="form-group col-md-4">
                                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Tên hạng mục</label>
                                <select
                                    name="tenHangMuc"
                                    value={formData.tenHangMuc}
                                    onChange={handleChange}
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        fontSize: '16px',
                                        borderRadius: '4px',
                                        border: '1px solid #ddd',
                                        boxSizing: 'border-box'
                                    }}
                                >
                                    <option value="">Chọn hạng mục</option>
                                    {loaisanphams.map((loaisp) => (
                                        <option key={loaisp.maLoaiSanPham} value={loaisp.tenLoaiSanPham}>{loaisp.tenLoaiSanPham}</option>
                                    ))}
                                </select>
                                {errors.tenHangMuc && <div style={{ color: 'red', fontSize: '14px' }}>{errors.tenHangMuc}</div>}
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <label>Đơn Giá Nhập Nhà Cung Cấp</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="donGiaNhapNCC"
                                    value={formData.donGiaNhapNCC}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group col-md-4">
                                <label>Chi Phí Lưu Kho</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="chiphiLuuKho"
                                    value={formData.chiphiLuuKho}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group col-md-4">
                                <label>Chi Phí Quản Lý</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="chiPhiQuanLy"
                                    value={formData.chiPhiQuanLy}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group col-md-4">
                                <label>Phần Trăm Lợi Nhuận</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="phantramloinhan"
                                    value={formData.phantramloinhan}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group col-md-4">
                                <label>Số Lượng </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="soLuong"
                                    value={formData.soLuong}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Đóng</Button>
                    <Button variant="primary" onClick={handleSave}>Lưu</Button>
                </Modal.Footer>
            </Modal>


        </div>  
    );
};

export default ProductTable;
