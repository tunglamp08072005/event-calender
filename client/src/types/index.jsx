const createType = (prefix, action) => `[${prefix}] ${action}`;

const types = {
  authCheckingFinish: createType("Auth", "Finish checking"),
  authLogin: createType("Auth", "Login"),
  authLogout: createType("Auth", "Logout"),

  uiOpenModal: createType("UI", "Open modal"),
  uiCloseModal: createType("UI", "Close modal"),
  uiSetError: createType("UI", "Set error"),
  uiRemoveError: createType("UI", "Remove error"),

  eventStartAddNew: createType("Event", "Start add new"),
  eventSetActive: createType("Event", "Set active"),
  eventClearActive: createType("Event", "Clear active"),
  eventClearLogout: createType("Event", "Clear logout"),
  eventAddNew: createType("Event", "Add new"),
  eventUpdate: createType("Event", "Update"),
  eventDelete: createType("Event", "Delete"),
  eventLoaded: createType("Event", "Events loaded"),
};

export default types;
