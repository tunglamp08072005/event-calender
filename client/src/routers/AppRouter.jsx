import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import AuthRouter from "./AuthRouter";
import CalendarScreen from "../components/calendar/CalendarScreen";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { startChecking } from "../actions/auth";
import LoadingScreen from "../components/ui/LoadingScreen";

const AppRouter = () => {
  const dispatch = useDispatch();
  const authState = useSelector(state => state.auth);
  const { checking, id } = authState;

  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);

  if (checking) return <LoadingScreen />;

  const isAuthenticated = Boolean(id);

  return (
    <Router>
      <Routes>
        <Route
          path="/*"
          element={
            <PublicRoute isAuth={isAuthenticated}>
              <AuthRouter />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute isAuth={isAuthenticated}>
              <CalendarScreen />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
