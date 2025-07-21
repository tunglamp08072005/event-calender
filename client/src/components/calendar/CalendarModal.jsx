import { useEffect, useState } from "react";
import Modal from "react-modal";
import DateTimePicker from "react-datetime-picker";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

import {
  removeError,
  setError,
  uiCloseModal,
} from "../../actions/ui";
import {
  eventClearActive,
  eventStartAddNew,
  eventStartUpdate,
} from "../../actions/event";
import Alert from "../ui/Alert";

Modal.setAppElement("#root");

const initialStart = moment().startOf("hour").add(1, "hour");
const initialEnd = initialStart.clone().add(1, "hour");

const defaultEvent = {
  title: "",
  notes: "",
  start: initialStart.toDate(),
  end: initialEnd.toDate(),
};

const CalendarModal = () => {
  const dispatch = useDispatch();
  const { modalOpen, msgError } = useSelector((state) => state.ui);
  const { activeEvent } = useSelector((state) => state.calendar);

  const [formValues, setFormValues] = useState(defaultEvent);
  const { title, notes, start, end } = formValues;

  useEffect(() => {
    setFormValues(activeEvent ? activeEvent : defaultEvent);
  }, [activeEvent]);

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStartChange = (value) => {
    setFormValues((prev) => ({
      ...prev,
      start: value,
    }));
  };

  const handleEndChange = (value) => {
    setFormValues((prev) => ({
      ...prev,
      end: value,
    }));
  };

  const handleCloseModal = () => {
    if (modalOpen) {
      dispatch(eventClearActive());
      dispatch(uiCloseModal());
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid()) return;

    if (activeEvent?.id) {
      dispatch(eventStartUpdate(formValues));
    } else {
      dispatch(eventStartAddNew(formValues));
    }

    handleCloseModal();
  };

  const isFormValid = () => {
    if (!title.trim()) {
      dispatch(setError("Title is required"));
      return false;
    }

    if (title.length > 32) {
      dispatch(setError("Title length must be max 32 characters"));
      return false;
    }

    if (!moment(start).isBefore(moment(end))) {
      dispatch(setError("End date must be after start date"));
      return false;
    }

    if (notes?.trim().length > 128) {
      dispatch(setError("Notes length must be max 128 characters"));
      return false;
    }

    dispatch(removeError());
    return true;
  };

  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={handleCloseModal}
      closeTimeoutMS={200}
      contentLabel="Event modal"
      className="modal"
      overlayClassName="modal__background"
    >
      <h1 className="modal__title">{activeEvent ? "Edit event" : "New event"}</h1>
      <hr />
      <form className="form" onSubmit={handleSubmit}>
        {msgError && <Alert type="error" description={msgError} />}

        <div className="form__field">
          <label className="form__label">Start date</label>
          <DateTimePicker
            className="form__input"
            onChange={handleStartChange}
            value={start}
          />
        </div>

        <div className="form__field">
          <label className="form__label">End date</label>
          <DateTimePicker
            className="form__input"
            onChange={handleEndChange}
            value={end}
            minDate={start}
          />
        </div>

        <hr />

        <div className="form__field">
          <label htmlFor="title" className="form__label">Event title</label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="New event"
            autoComplete="off"
            className="form__input"
            value={title}
            onChange={handleInputChange}
          />
        </div>

        <div className="form__field">
          <label htmlFor="notes" className="form__label">Notes</label>
          <textarea
            id="notes"
            name="notes"
            rows="5"
            className="form__text-area"
            value={notes}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit" className="btn btn-primary btn--block">Save</button>
      </form>
    </Modal>
  );
};

export default CalendarModal;
