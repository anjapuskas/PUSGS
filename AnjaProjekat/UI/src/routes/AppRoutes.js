import HomeForm from "components/Home/HomeForm";
import RegistrationForm from "components/Registration/RegistrationForm";
import HomePage from "pages/HomePage";
import LoginPage from "pages/LoginPage";
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
                <Route path="*" element={<Navigate replace to={""} />} />
            </>
          )}

        </Routes>
      );
}

export default AppRoutes;