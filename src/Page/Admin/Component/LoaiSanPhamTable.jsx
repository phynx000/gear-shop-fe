import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LoaiSanPhamTable = () => {
    const [loaisanPhams, setLoaiSanPhams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // State cho phân trang
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const [itemsPerPage] = useState(10); // Số lượng sản phẩm mỗi trang

    useEffect(() => {
        // Gọi API để lấy danh sách LoaiSanPham
        axios.get('http://localhost:9998/api/san-pham/category')
            .then((response) => {
                setLoaiSanPhams(response.data.data.loaisanPham || []);
                setLoading(false);
            })
            .catch((error) => {
                setError('Có lỗi xảy ra khi lấy dữ liệu.');
                setLoading(false);
            });
    }, []);

    // Nếu đang tải hoặc có lỗi
    if (loading) return <div>Đang tải dữ liệu...</div>;
    if (error) return <div>{error}</div>;

    // Tính tổng số trang
    const totalPages = Math.ceil(loaisanPhams.length / itemsPerPage);

    // Tạo danh sách các số trang
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    // Xác định dữ liệu hiển thị cho trang hiện tại
    const indexOfLastItem = currentPage * itemsPerPage; // Vị trí của dòng cuối
    const indexOfFirstItem = indexOfLastItem - itemsPerPage; // Vị trí của dòng đầu
    const currentItems = loaisanPhams.slice(indexOfFirstItem, indexOfLastItem); // Lọc các sản phẩm theo trang

    // Hàm để thay đổi trang
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // CSS Inline cho bảng
    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
        overflow: 'scroll',
    };

    const thStyle = {
        backgroundColor: '#f2f2f2',
        padding: '15px',
        textAlign: 'left',
        fontWeight: 'bold',
        fontSize: '16px',
    };

    const tdStyle = {
        padding: '12px',
        textAlign: 'left',
        borderBottom: '1px solid #ddd',
        fontSize: '16px',
    };

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

    return (
        <div style={{ marginTop: 100 }}>
            <h1>Danh Sách Loại Sản Phẩm</h1>
            {loaisanPhams.length === 0 ? (
                <p>Không có dữ liệu.</p>
            ) : (
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={thStyle}>Mã Loại Sản Phẩm</th>
                            <th style={thStyle}>Tên Loại Sản Phẩm</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((loai, index) => (
                            <tr key={index}>
                                <td style={tdStyle}>{loai.maLoaiSanPham}</td>
                                <td style={tdStyle}>{loai.tenLoaiSanPham}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {/* Phân trang */}
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    style={buttonStyle(currentPage === 1, false)}
                >
                    Prev
                </button>
                {pageNumbers.map((page) => (
                    <button
                        key={page}
                        onClick={() => paginate(page)}
                        style={buttonStyle(false, currentPage === page)}
                    >
                        {page}
                    </button>
                ))}
                <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    style={buttonStyle(currentPage === totalPages, false)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default LoaiSanPhamTable;
