import { Navigate, Route, Routes } from "react-router-dom";
import LoginScreen from "../components/auth/LoginScreen";
import RegisterScreen from "../components/auth/RegisterScreen";
import "../components/auth/auth.css";

const AuthRouter = () => {
  const routeConfig = [
    { path: "/auth/register", element: <RegisterScreen /> },
    { path: "/auth/login", element: <LoginScreen /> },
    { path: "*", element: <Navigate replace to="/auth/login" /> },
  ];

  return (
    <main className="content">
      <Routes>
        {routeConfig.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </main>
  );
};

export default AuthRouter;
