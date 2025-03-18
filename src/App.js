import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import axios from 'axios';

// Import các thành phần
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./Page/Home";
import SignUp from "./Page/SignUp";
import ProductList from "./Page/ProductList";
import ProductDetails from "./components/ProductDetail";
import Cart from "./Page/Cart";
import Login from "./Page/Login";
import LoginAdmin from "./Page/Admin/LoginAdmin";
import HeaderAdmin from "./Page/Admin/Component/Header";
import HomeAdmin from "./Page/Admin/HomeAdmin";
import SidebarAdmin from "../src/Page/Admin/Component/SidebarAdmin";
import ProductTable from "../src/Page/Admin/Component/ProductTable";
import LoaiSanPhamTable from "./Page/Admin/Component/LoaiSanPhamTable";
import AddProductForm from "./Page/Admin/Component/AddProductForm";
import SupplierTable from "./Page/Admin/Component/SupplierTable";
import AddSupplier from "./Page/Admin/Component/AddSupplierForm";
import BrandTable from "./Page/Admin/Component/BrandTable";
import AddBrandForm from "./Page/Admin/Component/AddBrandForm";
import ReceiverInfoPage from "./Page/ReceiverInfoPage";
import OrderTable from "./Page/Admin/Component/OrderTable";
import OrderStatistics from "./Page/Admin/Component/OrderStatistics";
import WebsiteStatistics from "./Page/Admin/Component/WebsiteStatistics";
import AddUserForm from "./Page/Admin/Component/AddUserForm";
import UserTable from "./Page/Admin/Component/UserTable";

// Layouts
function UserLayout({ children }) {
  return (
    <>
      <Header />
      <div className="content">{children}</div>
      <Footer />
    </>
  );
}

function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      {children}
    </div>
  );
}

function ProtectedRoute({ children, roleRequired }) {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("Không tìm thấy token. Bỏ qua việc gọi API.");
        return;
      }

      try {
        const response = await axios.get("http://localhost:9998/api/home/my-info", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        const userRole = response.data.role;
        setUserRole(userRole);

        if (userRole !== roleRequired) {
          window.location.href = "/";
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
      }
    };

    fetchUserRole();
  }, [roleRequired]);

  if (userRole === null) {
    return <div>Loading...</div>;
  }

  return userRole === roleRequired ? children : <Navigate to="/" />;
}

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Tuyến đường dành cho người dùng */}
          <Route
            path="/"
            element={
              <UserLayout>
                <Home />
              </UserLayout>
            }
          />
          <Route
            path="/signup"
            element={
              <UserLayout>
                <SignUp />
              </UserLayout>
            }
          />
          <Route
            path="/login"
            element={
              <UserLayout>
                <Login />
              </UserLayout>
            }
          />
          <Route
            path="/product"
            element={
              <UserLayout>
                <ProductList />
              </UserLayout>
            }
          />
          <Route
            path="/product-detail/:id"
            element={
              <UserLayout>
                <ProductDetails />
              </UserLayout>
            }
          />
          <Route
            path="/cart"
            element={
              <UserLayout>
                <Cart />
              </UserLayout>
            }
          />
          <Route
            path="/receiver-info"
            element={
              <UserLayout>
                <ReceiverInfoPage />
              </UserLayout>
            }
          />

          {/* Tuyến đường dành cho quản trị */}
          <Route
            path="/admin/login"
            element={
              <AdminLayout>
                <LoginAdmin />
              </AdminLayout>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute roleRequired="ADMIN">
                <AdminLayout>
                  <HeaderAdmin />
                  <div style={{ display: 'flex' }}>
                    <div style={{ width: '20%' }}>
                      <SidebarAdmin />
                    </div>
                    <div style={{ width: '80%' }}>
                      <HomeAdmin />
                    </div>
                  </div>
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/categoryList"
            element={
              <ProtectedRoute roleRequired="ADMIN">
                <AdminLayout>
                  <HeaderAdmin />
                  <div style={{ display: 'flex' }}>
                    <div style={{ width: '17%' }}>
                      <SidebarAdmin />
                    </div>
                    <div style={{ width: '80%' }}>
                      <LoaiSanPhamTable />
                    </div>
                  </div>
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/productList"
            element={
              <ProtectedRoute roleRequired="ADMIN">
                <AdminLayout>
                  <HeaderAdmin />
                  <div style={{ display: 'flex' }}>
                    <div style={{ width: '17%' }}>
                      <SidebarAdmin />
                    </div>
                    <div style={{ width: '80%' }}>
                      <ProductTable />
                    </div>
                  </div>
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/add-product"
            element={
              <ProtectedRoute roleRequired="ADMIN">
                <AdminLayout>
                  <HeaderAdmin />
                  <div style={{ display: 'flex' }}>
                    <div style={{ width: '17%' }}>
                      <SidebarAdmin />
                    </div>
                    <div style={{ width: '80%' }}>
                      <AddProductForm />
                    </div>
                  </div>
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/supplierList"
            element={
              <ProtectedRoute roleRequired="ADMIN">
                <AdminLayout>
                  <HeaderAdmin />
                  <div style={{ display: 'flex' }}>
                    <div style={{ width: '17%' }}>
                      <SidebarAdmin />
                    </div>
                    <div style={{ width: '80%' }}>
                      <SupplierTable />
                    </div>
                  </div>
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/add-supplier"
            element={
              <ProtectedRoute roleRequired="ADMIN">
                <AdminLayout>
                  <HeaderAdmin />
                  <div style={{ display: 'flex' }}>
                    <div style={{ width: '17%' }}>
                      <SidebarAdmin />
                    </div>
                    <div style={{ width: '80%' }}>
                      <AddSupplier />
                    </div>
                  </div>
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/brandList"
            element={
              <ProtectedRoute roleRequired="ADMIN">
                <AdminLayout>
                  <HeaderAdmin />
                  <div style={{ display: 'flex' }}>
                    <div style={{ width: '17%' }}>
                      <SidebarAdmin />
                    </div>
                    <div style={{ width: '80%' }}>
                      <BrandTable />
                    </div>
                  </div>
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/add-brand"
            element={
              <ProtectedRoute roleRequired="ADMIN">
                <AdminLayout>
                  <HeaderAdmin />
                  <div style={{ display: 'flex' }}>
                    <div style={{ width: '17%' }}>
                      <SidebarAdmin />
                    </div>
                    <div style={{ width: '80%' }}>
                      <AddBrandForm />
                    </div>
                  </div>
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/userList"
            element={
              <ProtectedRoute roleRequired="ADMIN">
                <AdminLayout>
                  <HeaderAdmin />
                  <div style={{ display: 'flex' }}>
                    <div style={{ width: '17%' }}>
                      <SidebarAdmin />
                    </div>
                    <div style={{ width: '80%' }}>
                      <UserTable />
                    </div>
                  </div>
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/add-user"
            element={
              <ProtectedRoute roleRequired="ADMIN">
                <AdminLayout>
                  <HeaderAdmin />
                  <div style={{ display: 'flex' }}>
                    <div style={{ width: '17%' }}>
                      <SidebarAdmin />
                    </div>
                    <div style={{ width: '80%' }}>
                      <AddUserForm />
                    </div>
                  </div>
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/orderList"
            element={
              <ProtectedRoute roleRequired="ADMIN">
                <AdminLayout>
                  <HeaderAdmin />
                  <div style={{ display: 'flex' }}>
                    <div style={{ width: '17%' }}>
                      <SidebarAdmin />
                    </div>
                    <div style={{ width: '80%' }}>
                      <OrderTable />
                    </div>
                  </div>
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/orderStatistics"
            element={
              <ProtectedRoute roleRequired="ADMIN">
                <AdminLayout>
                  <HeaderAdmin />
                  <div style={{ display: 'flex' }}>
                    <div style={{ width: '17%' }}>
                      <SidebarAdmin />
                    </div>
                    <div style={{ width: '80%' }}>
                      <OrderStatistics />
                    </div>
                  </div>
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/statistics"
            element={
              <ProtectedRoute roleRequired="ADMIN">
                <AdminLayout>
                  <HeaderAdmin />
                  <div style={{ display: 'flex' }}>
                    <div style={{ width: '17%' }}>
                      <SidebarAdmin />
                    </div>
                    <div style={{ width: '80%' }}>
                      <WebsiteStatistics />
                    </div>
                  </div>
                </AdminLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
