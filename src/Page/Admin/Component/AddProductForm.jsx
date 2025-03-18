import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddProductForm = () => {
    const [formData, setFormData] = useState({
        tenSanPham: '',
        heDieuHanh: '',
        manHinh: '',
        ram: '',
        rom: '',
        cpu: '',
        cardDoHoa: '',
        pin: '',
        trongLuong: '',
        mauSac: '',
        loaiPin: '',
        tinhNangKhac: 'xx',
        tenNCC: '',
        diaChiNCC: 'xx',
        emailNCC: 'xxx@gmail.com',
        tenThuongHieu: '',
        tenHangMuc: '',
        donGiaNhapNCC: '',
        hinhAnh: '',
        chiphiLuuKho: '1000000',
        chiPhiQuanLy: '500000',
        phantramloinhan: '20',
        soLuong: ''
    });

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validate = () => {
        const newErrors = {};

        // Kiểm tra các trường cần chọn từ select
        if (!formData.tenSanPham) newErrors.tenSanPham = 'Tên sản phẩm là bắt buộc';
 
        if (!formData.pin || formData.pin === '') newErrors.pin = 'Dung lượng pin là bắt buộc';
        if (!formData.trongLuong) newErrors.trongLuong = 'Trọng lượng là bắt buộc';
            
            if (!formData.tenNCC) newErrors.tenNCC = 'Tên nhà cung cấp là bắt buộc';
        if (!formData.diaChiNCC) newErrors.diaChiNCC = 'Địa chỉ nhà cung cấp là bắt buộc';
        if (!formData.emailNCC) newErrors.emailNCC = 'Email nhà cung cấp là bắt buộc';
        if (!formData.tenThuongHieu) newErrors.tenThuongHieu = 'Tên thương hiệu là bắt buộc';
        if (!formData.tenHangMuc) newErrors.tenHangMuc = 'Tên hạng mục là bắt buộc';
        if (!formData.donGiaNhapNCC) newErrors.donGiaNhapNCC = 'Đơn giá nhập là bắt buộc';
        if (!formData.hinhAnh) newErrors.hinhAnh = 'URL hình ảnh là bắt buộc';
        if (!formData.chiphiLuuKho) newErrors.chiphiLuuKho = 'Chi phí lưu kho là bắt buộc';
        if (!formData.chiPhiQuanLy) newErrors.chiPhiQuanLy = 'Chi phí quản lý là bắt buộc';
        if (!formData.phantramloinhan) newErrors.phantramloinhan = 'Phần trăm lợi nhuận là bắt buộc';
        if (!formData.tinhNangKhac) newErrors.tinhNangKhac = 'Tính năng khác là bắt buộc';
        if (!formData.soLuong) newErrors.soLuong = 'Số lượng là bắt buộc'; // Kiểm tra trường soLuong
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        alert('Submit');
        console.log("Dữ liệu form: ", formData); // Kiểm tra dữ liệu form

        // Làm sạch dữ liệu form để đảm bảo không có giá trị null hoặc undefined
        const cleanedFormData = Object.keys(formData).reduce((acc, key) => {
            acc[key] = formData[key] === null || formData[key] === undefined || formData[key].trim() === ""
                ? getDefaultValue(key)
                : formData[key];
            return acc;
        }, {});

        if (validate()) {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    console.warn("Không tìm thấy token. Bỏ qua việc gọi API.");
                    return;
                }
                const response = await axios.post('http://localhost:9998/api/admin/sanpham/them-san-pham', cleanedFormData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log("Token:", token);
                console.log("Response: ", response); // Kiểm tra phản hồi từ backend
                alert('Sản phẩm đã được thêm thành công!');

                // Reset formData sau khi thêm sản phẩm thành công
                setFormData({
                    tenSanPham: '',
                    heDieuHanh: '',
                    manHinh: '',
                    ram: '',
                    rom: '',
                    cpu: '',
                    cardDoHoa: '',
                    pin: '',
                    trongLuong: '',
                    mauSac: '',
                    loaiPin: '',
                    tinhNangKhac: 'xx',
                    tenNCC: '',
                    diaChiNCC: 'xx',
                    emailNCC: 'xxx@gmail.com',
                    tenThuongHieu: '',
                    tenHangMuc: '',
                    donGiaNhapNCC: '',
                    hinhAnh: '',
                    chiphiLuuKho: '1000000',
                    chiPhiQuanLy: '500000',
                    phantramloinhan: '20',
                    soLuong: ''
                });
            } catch (error) {
                console.error("Lỗi khi gửi dữ liệu: ", error.response ? error.response.data : error.message);
                alert(`Lỗi khi thêm sản phẩm: ${error.response ? error.response.data.message : error.message}`);
            }
        }
    };

    // Hàm để lấy giá trị mặc định cho các trường khi chúng trống hoặc null
    const getDefaultValue = (key) => {
        switch (key) {
            case 'tenSanPham':
                return 'Tên sản phẩm mặc định';
            case 'heDieuHanh':
                return 'Android';
            case 'manHinh':
                return '6.0 inch';
            case 'ram':
                return '4';
            case 'rom':
                return '64';
            case 'cpu':
                return 'Snapdragon 888';
            case 'cardDoHoa':
                return 'Adreno 650';
            case 'pin':
                return '4000';
            case 'trongLuong':
                return '0.5';
            case 'mauSac':
                return 'Đen';
            case 'loaiPin':
                return 'Lithium';
            case 'donGiaNhapNCC':
                return '5000000';
            case 'hinhAnh':
                return 'https://example.com/image.jpg';
            case 'tenNCC':
                return 'Nhà cung cấp mặc định';
            case 'diaChiNCC':
                return 'Địa chỉ mặc định';
            case 'emailNCC':
                return 'email@nhacungcap.com';
            case 'tenThuongHieu':
                return 'Thương hiệu mặc định';
            case 'tenHangMuc':
                return 'Hạng mục mặc định';
            case 'chiphiLuuKho': return '1000000';
            case 'chiPhiQuanLy': return '500000';
            case 'phantramloinhan': return '20';
            
            default:
                return '';
        }
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



    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',  marginTop:100
 }}>
            <h1 style={{ textAlign: 'center', color: '#333' }}>Thêm Sản Phẩm</h1>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '15px', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))' }}>
                {['tenSanPham', 'heDieuHanh', 'manHinh', 'ram', 'rom', 'cpu', 'cardDoHoa', 'pin', 'trongLuong', 'mauSac', 'loaiPin', 'donGiaNhapNCC', 'hinhAnh'].map((field, index) => (
                    <div key={index}>
                        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>
                            {field === 'tenSanPham' ? 'Tên sản phẩm' :
                                field === 'heDieuHanh' ? 'Hệ điều hành' :
                                    field === 'manHinh' ? 'Màn hình' :
                                        field === 'ram' ? 'RAM (GB)' :
                                            field === 'rom' ? 'ROM (GB)' :
                                                field === 'cpu' ? 'CPU' :
                                                    field === 'cardDoHoa' ? 'Card đồ họa' :
                                                        field === 'pin' ? 'Pin (mAh)' :
                                                            field === 'trongLuong' ? 'Trọng lượng (kg)' :
                                                                field === 'mauSac' ? 'Màu sắc' :
                                                                    field === 'loaiPin' ? 'Loại pin' :
                                                                        field === 'donGiaNhapNCC' ? 'Đơn giá nhập' :
                                                                            'Hình ảnh URL'}
                        </label>

                        {field === 'heDieuHanh' && (
                            <select
                                name={field}
                                value={formData[field]}
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
                                <option value="Windows">Windows</option>
                                <option value="macOS">macOS</option>
                                <option value="Linux">Linux</option>
                                <option value="Android">Android</option>
                                <option value="iOS">iOS</option>
                            </select>
                        )}

                        {field === 'manHinh' && (
                            <select
                                name={field}
                                value={formData[field]}
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
                                <option value="13.3">13.3 inch</option>
                                <option value="15.6">15.6 inch</option>
                                <option value="17.3">17.3 inch</option>
                                <option value="5.5">5.5 inch</option>
                            </select>
                        )}

                        {['ram', 'rom'].includes(field) && (
                            <select
                                name={field}
                                value={formData[field]}
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
                                <option value="4">4 GB</option>
                                <option value="8">8 GB</option>
                                <option value="16">16 GB</option>
                                <option value="32">32 GB</option>
                            </select>
                        )}

                        {field === 'cpu' && (
                            <select
                                name={field}
                                value={formData[field]}
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
                                <option value="Intel">Intel</option>
                                <option value="AMD">AMD</option>
                                <option value="ARM">ARM</option>
                            </select>
                        )}

                        {field === 'cardDoHoa' && (
                            <select
                                name={field}
                                value={formData[field]}
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
                                <option value="NVIDIA">NVIDIA</option>
                                <option value="AMD">AMD</option>
                                <option value="Intel">Intel</option>
                            </select>
                        )}

                        {field === 'mauSac' && (
                            <select
                                name={field}
                                value={formData[field]}
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
                                <option value="Đen">Đen</option>
                                <option value="Trắng">Trắng</option>
                                <option value="Bạc">Bạc</option>
                                <option value="Xanh">Xanh</option>
                                <option value="Đỏ">Đỏ</option>
                            </select>
                        )}

                        {field === 'loaiPin' && (
                            <select
                                name={field}
                                value={formData[field]}
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
                                <option value="Lithium-ion">Lithium-ion</option>
                                <option value="Lithium-Polymer">Lithium-Polymer</option>
                                <option value="NiMH">NiMH</option>
                            </select>
                        )}

                        {field !== 'heDieuHanh' && field !== 'manHinh' && field !== 'ram' && field !== 'rom' && field !== 'cpu' && field !== 'cardDoHoa' && field !== 'mauSac' && field !== 'loaiPin' && (
                            <input
                                type={['ram', 'rom', 'pin', 'trongLuong', 'donGiaNhapNCC'].includes(field) ? 'number' : 'text'}
                                name={field}
                                value={formData[field]}
                                onChange={handleChange}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    fontSize: '16px',
                                    borderRadius: '4px',
                                    border: '1px solid #ddd',
                                    boxSizing: 'border-box'
                                }}
                            />
                        )}

                        {errors[field] && <div style={{ color: 'red', fontSize: '14px' }}>{errors[field]}</div>}
                    </div>
                ))}



                {/* Nhà cung cấp */}
                <div>
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
                <div>
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

                {/* Hiển thị email nhà cung cấp */}
                <div>
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
                <div>
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
                <div>
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
                {/* Add more fields similarly as needed */}
                <div>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Chi phí lưu kho</label>
                    <input
                        type="number"
                        name="chiphiLuuKho"
                        value={formData.chiphiLuuKho}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '16px' }}
                    />
                    {errors.chiphiLuuKho && <div style={{ color: 'red', fontSize: '14px' }}>{errors.chiphiLuuKho}</div>}
                </div>
                <div>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Chi phí quản lý</label>
                    <input
                        type="number"
                        name="chiPhiQuanLy"
                        value={formData.chiPhiQuanLy}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '16px' }}
                    />
                    {errors.chiPhiQuanLy && <div style={{ color: 'red', fontSize: '14px' }}>{errors.chiPhiQuanLy}</div>}
                </div>
                <div>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Phần trăm lợi nhuận</label>
                    <input
                        type="number"
                        name="phantramloinhan"
                        value={formData.phantramloinhan}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '16px' }}
                    />
                    {errors.phantramloinhan && <div style={{ color: 'red', fontSize: '14px' }}>{errors.phantramloinhan}</div>}
                </div>

                {/* Tính năng khác */}
                <div>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Tính năng khác</label>
                    <input
                        type="text"
                        name="tinhNangKhac"
                        value={formData.tinhNangKhac}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '16px' }}
                    />
                    {errors.tinhNangKhac && <div style={{ color: 'red', fontSize: '14px' }}>{errors.tinhNangKhac}</div>}
                </div>
              

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button type="submit" style={{
                        padding: '10px 20px',
                        fontSize: '16px',
                        borderRadius: '4px',
                        border: 'none',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        cursor: 'pointer'
                    }}>
                        Thêm sản phẩm
                    </button>
                </div>
                <div className="form-group">
                    <label htmlFor="soLuong">Số Lượng</label>
                    <input type="number" className="form-control" id="soLuong" name="soLuong" value={formData.soLuong} onChange={handleChange} required />
                    {errors.soLuong && <div className="text-danger">{errors.soLuong}</div>}
                </div>
            </form>
        </div>
    );
};

export default AddProductForm;
