import HomeForm from "components/Home/HomeForm";
import RegistrationForm from "components/Registration/RegistrationForm";
import { useSelector } from "react-redux";

const { default: LoginForm } = require("components/Login/LoginForm");
const React = require("react");
const { Routes, Route, Navigate } = require("react-router-dom");

const AppRoutes = () => {

    // @ts-ignore
    const loggedIn = useSelector((state) => state.user.isLoggedIn);

    return (
        <Routes>
        {!loggedIn && (
            <>
                <Route path="/login" element={<LoginForm />}></Route>
                <Route path="/register" element={<RegistrationForm />}></Route>
                <Route path="*" element={<Navigate replace to={"/login"} />}></Route>
            </>
          )}
        {loggedIn && (
            <>
                <Route path="" element={<HomeForm />}></Route>
                <Route path="*" element={<Navigate replace to={""} />}></Route>
            </>
          )}

        </Routes>
      );
}

export default AppRoutes;