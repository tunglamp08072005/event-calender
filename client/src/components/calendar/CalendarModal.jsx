import { useEffect, useState } from "react";
import Modal from "react-modal";
import DateTimePicker from "react-datetime-picker";
import moment from "moment";
import { removeError, setError, uiCloseModal } from "../../actions/ui";
import { useDispatch, useSelector } from "react-redux";
import {
  eventClearActive,
  eventStartAddNew,
  eventStartUpdate,
} from "../../actions/event";
import Alert from "../ui/Alert";
moment.locale("vi");

Modal.setAppElement("#root");

const nowInitial = moment().minutes(0).seconds(0).add(1, "hour");
const nowEnd = nowInitial.clone().add(1, "hour");

const initEvent = {
  title: "",
  notes: "",
  start: nowInitial.toDate(),
  end: nowEnd.toDate(),
};

const CalendarModal = () => {
  const dispatch = useDispatch();

  const { ui, calendar } = useSelector((state) => state);
  const { modalOpen, msgError } = ui;
  const { activeEvent } = calendar;

  const [formValues, setFormValues] = useState(initEvent);
  const { notes, title, start, end } = formValues;

  useEffect(() => {
    if (activeEvent) {
      setFormValues(activeEvent);
    } else {
      setFormValues(initEvent);
    }
  }, [activeEvent]);

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const closeModal = () => {
    if (modalOpen) {
      dispatch(eventClearActive());
      dispatch(uiCloseModal());
    }
  };

  const handleStartDateChange = (e) => {
    setFormValues({
      ...formValues,
      start: e,
    });
  };

  const handleEndDateChange = (e) => {
    setFormValues({
      ...formValues,
      end: e,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isFormValid()) return;

    if (activeEvent && activeEvent.id) {
      dispatch(eventStartUpdate(formValues));
    } else {
      dispatch(eventStartAddNew(formValues));
    }

    closeModal();
  };

  const isFormValid = () => {
    if (title.trim().length === 0) {
      dispatch(setError("Vui lòng nhập tiêu đề"));
      return false;
    } else if (title.trim().length > 32) {
      dispatch(setError("Tiêu đề không được vượt quá 32 ký tự"));
      return false;
    } else if (moment(start).isSameOrAfter(moment(end))) {
      dispatch(setError("Thời gian kết thúc phải sau thời gian bắt đầu"));
      return false;
    } else if (notes && notes.trim().length > 128) {
      dispatch(setError("Ghi chú không được vượt quá 128 ký tự"));
      return false;
    }
    dispatch(removeError());
    return true;
  };

  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={closeModal}
      closeTimeoutMS={200}
      contentLabel="Event modal"
      className="modal"
      overlayClassName="modal__background"
    >
      <h1 className="modal__title">
        {activeEvent ? "Chỉnh sửa sự kiện" : "Tạo sự kiện mới"}
      </h1>
      <hr />
      <form className="form" onSubmit={handleSubmit}>
        {msgError && <Alert type="error" description={msgError} />}
        <div className="form__field">
          <label className="form__label">Thời gian bắt đầu</label>
          <DateTimePicker
            locale="en-US"
            onChange={handleStartDateChange}
            value={start}
            className="form__input"
            format="MM/dd/yyyy h:mm a"  // định dạng 12h với AM/PM
            amPmAriaLabel="Chọn AM/PM"
          />
        </div>
        <div className="form__field">
          <label className="form__label">Thời gian kết thúc</label>
          <DateTimePicker
            locale="en-US"
            onChange={handleEndDateChange}
            value={end}
            minDate={start}
            className="form__input"
            format="MM/dd/yyyy h:mm a"  // định dạng 12h với AM/PM
            amPmAriaLabel="Chọn AM/PM"
          />
        </div>
        <hr />
        <div className="form__field">
          <label htmlFor="title" className="form__label">
            Tiêu đề sự kiện
          </label>
          <input
            autoComplete="off"
            type="text"
            className="form__input"
            id="title"
            name="title"
            placeholder="Sự kiện mới"
            value={title}
            onChange={handleInputChange}
          />
        </div>
        <div className="form__field">
          <label htmlFor="notes" className="form__label">
            Ghi chú
          </label>
          <textarea
            type="text"
            className="form__text-area"
            rows="5"
            id="notes"
            name="notes"
            value={notes}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="form__submit-container">
          <button className="btn btn-primary form__submit-btn" type="submit">
            Lưu
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CalendarModal;
