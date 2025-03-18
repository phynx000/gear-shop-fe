import React, { useState } from "react";
  // Import file CSS riêng để tuỳ chỉnh giao diện

const LoginAdmin = () => {
    const [UserName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Xử lý logic đăng nhập
        if (!UserName || !password) {
            alert("Vui lòng nhập đầy đủ thông tin!");
        } else {
            alert(`Đăng nhập thành công! UserName: ${UserName}, Remember Me: ${rememberMe}`);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="login-title">Admin Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="UserName">UserName:</label>
                        <input
                            type="text"
                            id="UserName"
                            className="form-control"
                            placeholder="Enter your UserName"
                            value={UserName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="form-group remember-me">
                        <label>
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />{" "}
                            Remember Me
                        </label>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">
                        Sign In
                    </button>
                </form>
              
                <div className="links">
                    <a href="#">Forgot your password?</a>
                    <br />
                    <a href="#">Create a new account</a>
                </div>
            </div>
        </div>
    );
};

export default LoginAdmin;
