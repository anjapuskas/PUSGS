import HomeForm from "components/Home/HomeForm";
import RegistrationForm from "components/Registration/RegistrationForm";
import AddProductPage from "pages/AddProductPage";
import HomePage from "pages/HomePage";
import LoginPage from "pages/LoginPage";
import ProfilePage from "pages/ProfilePage";
import RegistrationPage from "pages/RegistrationPage";
import { useSelector } from "react-redux";

const { default: LoginForm } = require("components/Login/LoginForm");
const React = require("react");
const { Routes, Route, Navigate } = require("react-router-dom");

const AppRoutes = () => {

    // @ts-ignore
     const state = useSelector((state) => state);
     // @ts-ignore
     const loggedIn = useSelector((state) => state.user.loggedIn);
     // @ts-ignore
     const userRole = useSelector((state) => state.user.user.userRole);

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
                {isSeller && (
                  <Route path="/add-product" element={<AddProductPage />} />
                )}
                <Route path="*" element={<Navigate replace to={""} />} />
            </>
          )}

        </Routes>
      );
}

export default AppRoutes;