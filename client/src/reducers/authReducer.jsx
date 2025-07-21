import types from "../types";

const initialState = Object.freeze({
  checking: true,
});

const authReducer = (state = initialState, action) => {
  if (!action?.type) return state;

  const reducers = {
    [types.authLogin]: () => ({
      ...state,
      ...action.payload,
    }),
    [types.authCheckingFinish]: () => ({
      ...state,
      checking: false,
    }),
    [types.authLogout]: () => ({
      checking: false,
    }),
  };

  return (reducers[action.type] || (() => state))();
};

export default authReducer;
