import Swal from "sweetalert2";
import { fetchWithToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvents";
import types from "../types";

export const eventStartLoading = () => {
  return async (dispatch) => {
    fetchWithToken("events")
      .then((resp) => resp.json())
      .then((data) => {
        if (data.ok) {
          const events = prepareEvents(data.events);
          dispatch(eventLoaded(events));
        } else {
          if (data.msg) Swal.fire("Lỗi", data.msg, "error");
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire("Lỗi", "Vui lòng liên hệ quản trị viên", "error");
      });
  };
};

export const eventStartAddNew = (event) => {
  return async (dispatch, getState) => {
    const { id: _id, name } = getState().auth;

    try {
      const resp = await fetchWithToken("events", event, "POST");
      const data = await resp.json();

      if (data.ok) {
        // Optimistic update: update local state trước khi Swal
        event.id = data.event._id;
        event.user = { _id, name };
        dispatch(eventAddNew(event));

        // Thông báo thành công
        Swal.fire(
          "Đã lưu",
          `Sự kiện '${event.title}' đã được lưu thành công.`,
          "success"
        );
      } else {
        const msgError =
          data.msg ||
          data.errors[Object.keys(data.errors)[0]]?.msg ||
          "Vui lòng liên hệ quản trị viên";
        Swal.fire("Lỗi", msgError, "error");
      }
    } catch (err) {
      console.log(err);
      Swal.fire("Lỗi", "Vui lòng liên hệ quản trị viên", "error");
    }
  };
};

export const eventStartUpdate = (event) => {
  return async (dispatch) => {
    try {
      const resp = await fetchWithToken(`events/${event.id}`, event, "PUT");
      const data = await resp.json();

      if (data.ok) {
        dispatch(eventUpdate(event));
        Swal.fire(
          "Đã cập nhật",
          `Sự kiện '${event.title}' đã được cập nhật thành công.`,
          "success"
        );
      } else {
        const msgError =
          data.msg ||
          data.errors[Object.keys(data.errors)[0]]?.msg ||
          "Vui lòng liên hệ quản trị viên";
        Swal.fire("Lỗi", msgError, "error");
      }
    } catch (err) {
      console.log(err);
      Swal.fire("Lỗi", "Vui lòng liên hệ quản trị viên", "error");
    }
  };
};

export const eventStartDelete = () => {
  return async (dispatch, getState) => {
    const { id } = getState().calendar.activeEvent;

    try {
      const resp = await fetchWithToken(`events/${id}`, {}, "DELETE");
      const data = await resp.json();

      if (data.ok) {
        dispatch(eventDelete(id));
        Swal.fire(
          "Đã xoá",
          "Sự kiện đã được xoá thành công.",
          "success"
        );
      } else {
        const msgError =
          data.msg ||
          data.errors[Object.keys(data.errors)[0]]?.msg ||
          "Vui lòng liên hệ quản trị viên";
        Swal.fire("Lỗi", msgError, "error");
      }
    } catch (err) {
      console.log(err);
      Swal.fire("Lỗi", "Vui lòng liên hệ quản trị viên", "error");
    }
  };
};

// Action Creators
const eventLoaded = (events) => ({
  type: types.eventLoaded,
  payload: events,
});

export const eventSetActive = (event) => ({
  type: types.eventSetActive,
  payload: event,
});

export const eventClearActive = () => ({
  type: types.eventClearActive,
});

const eventAddNew = (event) => ({
  type: types.eventAddNew,
  payload: event,
});

const eventUpdate = (event) => ({
  type: types.eventUpdate,
  payload: event,
});

const eventDelete = (id) => ({
  type: types.eventDelete,
  payload: id,
});

export const eventLogout = () => ({
  type: types.eventClearLogout,
});
