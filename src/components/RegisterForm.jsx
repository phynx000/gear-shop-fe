import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        phone: '',
        email: '',
        dob: '', 
        
    });
    const navigate=useNavigate()
    const [errors, setErrors] = useState([]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:9998/register', formData);
            alert(response.data);
            navigate("/login")
            setErrors({}); // Xóa lỗi nếu đăng ký thành công
        } catch (error) {
            if (error.response && error.response.data) {
                const validationErrors = error.response.data.errors;

                // Ánh xạ lỗi đến từng trường dựa vào từ khóa
                const errorMap = {};
                validationErrors.forEach((errorMessage) => {
                    if (errorMessage.includes("Tên là bắt buộc")) errorMap.firstName = errorMessage;
                    if (errorMessage.includes("Họ là bắt buộc")) errorMap.lastName = errorMessage;
                    if (errorMessage.includes("Tên người dùng là bắt buộc")) errorMap.username = errorMessage;
                    if (errorMessage.includes("Mật khẩu nên có ít nhất 8 ký tự")) errorMap.password = errorMessage;
                    if (errorMessage.includes("Mật khẩu là bắt buộc")) errorMap.password = errorMessage;
                    if (errorMessage.includes("Email là bắt buộc")) errorMap.email = errorMessage;
                    if (errorMessage.includes("Số điện thoại không hợp lệ")) errorMap.phone = errorMessage;
                });

                setErrors(errorMap);
            } else {
                console.error('There was an error registering!', error);
            }
        }
    };



    return (
        <div className="card">
            <div className="card-header text-center">
                <span className="display-4">ĐĂNG KÝ TÀI KHOẢN</span>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit} noValidate>
                    <div className="form-group">
                        <label htmlFor="firstName">Tên</label>
                        <input
                            type="text"
                            className="form-control"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                        {errors.firstName && <small className="text-danger">{errors.firstName}</small>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="lastName">Họ</label>
                        <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                        {errors.lastName && <small className="text-danger">{errors.lastName}</small>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="username">Tên đăng nhập</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                        {errors.username && <small className="text-danger">{errors.username}</small>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Mật khẩu</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        {errors.password && <small className="text-danger">{errors.password}</small>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Số điện thoại</label>
                        <input
                            type="tel"
                            className="form-control"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                        {errors.phone && <small className="text-danger">{errors.phone}</small>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        {errors.email && <small className="text-danger">{errors.email}</small>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="dob">Ngày tháng năm sinh</label>
                        <input
                            type="date"
                            className="form-control"
                            id="dob"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">Đăng ký</button>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;