import HomeForm from "components/Home/HomeForm";
import RegistrationForm from "components/Registration/RegistrationForm";
import AddProductPage from "pages/AddProductPage";
import AdminOrdersListPage from "pages/AdminOrdersListPage";
import CartPage from "pages/CartPage";
import EditProductPage from "pages/EditProductPage";
import HomePage from "pages/HomePage";
import LoginPage from "pages/LoginPage";
import NewOrdersListPage from "pages/NewOrdersListPage";
import OrdersListPage from "pages/OrdersListPage";
import ProductListPage from "pages/ProductListPage";
import ProfilePage from "pages/ProfilePage";
import RegistrationPage from "pages/RegistrationPage";
import VerificationListPage from "pages/VerificationListPage";
import { useSelector } from "react-redux";

const { default: LoginForm } = require("components/Login/LoginForm");
const React = require("react");
const { Routes, Route, Navigate } = require("react-router-dom");

const AppRoutes = () => {

    // @ts-ignore
     const user = useSelector((state) => state.user.user);
     // @ts-ignore
     const loggedIn = useSelector((state) => state.user.loggedIn);
     // @ts-ignore
     const userRole = user ? user.userRole : null;

     const isBuyer = userRole == "BUYER";
     const isSeller = userRole == "SELLER";
     const isAdmin = userRole == "ADMIN";

    return (
        <Routes>
        {!loggedIn && (
            <>
                <Route path="/login" element={<LoginPage />}></Route>
                <Route path="/register" element={<RegistrationPage />}></Route>
                <Route path="*" element={<Navigate replace to={"/login"} />}></Route>
            </>
          )}
        {loggedIn && (
            <>
                <Route path="" element={<HomePage />}></Route>
                <Route path="/profile" element={<ProfilePage />}></Route>
                <Route path="*" element={<Navigate replace to={""} />} />
                {isSeller && (
                  <Route path="/add-product" element={<AddProductPage />} />
                )}
                {(isBuyer || isSeller) && (
                  <Route path="/products" element={<ProductListPage />} />
                )}
                {(isBuyer || isSeller) && (
                  <Route path="/orders" element={<OrdersListPage />} />
                )}
                {isSeller && (
                  <Route path="/new-orders" element={<NewOrdersListPage />} />
                )}
                {isSeller && (
                  <Route path="/product-edit" element={<EditProductPage />} />
                )}
                {isAdmin && (
                  <Route path="/admin-orders" element={<AdminOrdersListPage />} />
                )}
                {isAdmin && (
                  <Route path="/verify-users" element={<VerificationListPage />} />
                )}
                {(isBuyer || isSeller) && (
                  <Route path="/cart" element={<CartPage />} />
                )}
                
                
            </>
          )}

        </Routes>
      );
}

export default AppRoutes;