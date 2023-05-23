const { default: LoginForm } = require("components/Login/LoginForm");
const React = require("react");
const { Routes, Route, Navigate } = require("react-router-dom");

const AppRoutes = () => {

    return (
        <Routes>
            <Route path="/login" element={<LoginForm />}></Route>
            <Route path="*" element={<Navigate replace to={"/login"} />}></Route>
        </Routes>
      );
}

export default AppRoutes;