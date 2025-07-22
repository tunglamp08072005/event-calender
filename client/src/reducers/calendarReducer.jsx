import types from "../types";

const initialState = Object.freeze({
  events: [],
  activeEvent: null,
});

const calendarReducer = (state = initialState, action) => {
  if (!action?.type) return state;

  const handlers = {
    [types.eventLoaded]: () => ({
      ...state,
      events: Array.isArray(action.payload) ? [...action.payload] : [],
    }),

    [types.eventSetActive]: () => ({
      ...state,
      activeEvent: action.payload,
    }),

    [types.eventClearActive]: () => ({
      ...state,
      activeEvent: null,
    }),

    [types.eventAddNew]: () => ({
      ...state,
      events: [...state.events, action.payload],
    }),

    [types.eventUpdate]: () => ({
      ...state,
      events: state.events.map((event) =>
        event.id === action.payload.id ? action.payload : event
      ),
    }),

    [types.eventDelete]: () => ({
      ...state,
      events: state.events.filter(
        (event) => event.id !== state.activeEvent?.id
      ),
      activeEvent: null,
    }),

    [types.eventClearLogout]: () => {
      return {
        events: [],
        activeEvent: null,
      };
    },
  };

  return (handlers[action.type] || (() => state))();
};

export default calendarReducer;
