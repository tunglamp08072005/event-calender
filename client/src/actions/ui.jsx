import types from "../types";

// Action creator để set lỗi
export const setError = (err) => {
  return {
    type: types.uiSetError,
    payload: err,
  };
};

// Action creator để xóa lỗi
export const removeError = () => {
  return {
    type: types.uiRemoveError,
  };
};

// Action creator để mở modal
export const uiOpenModal = () => {
  return {
    type: types.uiOpenModal,
  };
};

// Action creator để đóng modal
export const uiCloseModal = () => {
  return {
    type: types.uiCloseModal,
  };
};
