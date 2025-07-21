import { fetchNoToken, fetchWithToken } from "../helpers/fetch";
import types from "../types";
import Swal from "sweetalert2";
import { removeError, setError } from "./ui";
import { eventLogout } from "./event";

export const startLogin = (email, password) => {
  return async (dispatch) => {
    try {
      const resp = await fetchNoToken("auth/login", { email, password }, "POST");
      const data = await resp.json();

      if (data.ok) {
        const { user, token } = data;
        const { _id: id, name } = user;

        localStorage.setItem("token", token);
        localStorage.setItem("token-init-date", new Date().getTime());

        dispatch(login({ id, name }));
      } else {
        if (data.errors) dispatch(checkingErrors(data.errors));
        if (data.msg) Swal.fire("Lỗi", convertMessageToVietnamese(data.msg), "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Lỗi", "Vui lòng liên hệ với quản trị viên", "error");
    }
  };
};

export const startRegister = (name, email, password) => {
  return async (dispatch) => {
    try {
      const resp = await fetchNoToken("auth/register", { name, email, password }, "POST");
      const data = await resp.json();

      if (data.ok) {
        const { user, token } = data;
        const { _id: id, name } = user;

        localStorage.setItem("token", token);
        localStorage.setItem("token-init-date", new Date().getTime());

        dispatch(login({ id, name }));
      } else {
        if (data.errors) dispatch(checkingErrors(data.errors));
        if (data.msg) Swal.fire("Lỗi", convertMessageToVietnamese(data.msg), "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Lỗi", "Vui lòng liên hệ với quản trị viên", "error");
    }
  };
};

export const checkingErrors = (errors) => {
  return (dispatch) => {
    const firstKey = Object.keys(errors)[0];
    const { msg } = errors[firstKey];
    dispatch(setError(convertMessageToVietnamese(msg)));
  };
};

export const startChecking = () => {
  return async (dispatch) => {
    try {
      const resp = await fetchWithToken("auth/renew");
      const data = await resp.json();

      if (data.ok) {
        const { user, token } = data;
        const { _id: id, name } = user;

        localStorage.setItem("token", token);
        localStorage.setItem("token-init-date", new Date().getTime());

        dispatch(login({ id, name }));
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Lỗi", "Vui lòng liên hệ với quản trị viên", "error");
    } finally {
      dispatch(checkingFinish());
    }
  };
};

const checkingFinish = () => ({
  type: types.authCheckingFinish,
});

const login = (user) => ({
  type: types.authLogin,
  payload: user,
});

export const startLogout = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(removeError());
    dispatch(eventLogout());
    dispatch(logout());
  };
};

export const logout = () => ({
  type: types.authLogout,
});

// Hàm chuyển thông điệp tiếng Anh sang tiếng Việt (có thể mở rộng thêm)
const convertMessageToVietnamese = (msg) => {
  switch (msg) {
    case "Invalid password":
      return "Mật khẩu không hợp lệ";
    case "User does not exist":
      return "Người dùng không tồn tại";
    case "Email already in use":
      return "Email đã được sử dụng";
    case "Name is required":
      return "Tên không được để trống";
    case "Email is required":
      return "Email không được để trống";
    case "Password is required":
      return "Mật khẩu không được để trống";
    case "Token not valid":
      return "Token không hợp lệ";
    default:
      return msg; // Giữ nguyên nếu không khớp
  }
};
