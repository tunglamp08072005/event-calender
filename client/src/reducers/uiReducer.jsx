import types from "../types";

const initialState = Object.freeze({
  modalOpen: false,
  msgError: "",
});

const uiReducer = (state = initialState, action) => {
  const { type, payload } = action;

  if (type === types.uiSetError) {
    return { ...state, msgError: payload };
  }

  if (type === types.uiRemoveError) {
    return { ...state, msgError: "" };
  }

  if (type === types.uiOpenModal) {
    return { ...state, modalOpen: true };
  }

  if (type === types.uiCloseModal) {
    return { ...state, modalOpen: false };
  }

  return state;
};

export default uiReducer;
