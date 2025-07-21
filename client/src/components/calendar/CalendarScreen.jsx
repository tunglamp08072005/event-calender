import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import Navbar from "../ui/Navbar";
import CalendarEvent from "./CalendarEvent";
import CalendarModal from "./CalendarModal";
import AddNewBtn from "../ui/AddNewBtn";
import DeleteBtn from "../ui/DeleteBtn";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "./calendar.css";

import {
  uiOpenModal,
  eventClearActive,
  eventSetActive,
  eventStartLoading,
} from "../../actions";

const localizer = momentLocalizer(moment);

const CalendarScreen = () => {
  const dispatch = useDispatch();

  const { calendar: { events, activeEvent }, auth: { id }, ui: { modalOpen } } = useSelector((state) => state);

  const [lastView, setLastView] = useState(() => localStorage.getItem("lastView") || "month");

  useEffect(() => {
    dispatch(eventStartLoading());
  }, [dispatch]);

  const handleDoubleClick = () => dispatch(uiOpenModal());

  const handleSelectEvent = (e) => dispatch(eventSetActive(e));

  const handleViewChange = (view) => {
    setLastView(view);
    localStorage.setItem("lastView", view);
  };

  const handleSelectSlot = ({ start, end, action }) => {
    if (activeEvent) dispatch(eventClearActive());

    if (action === "select" || action === "doubleClick") {
      dispatch(eventSetActive({ title: "", notes: "", start, end }));
      dispatch(uiOpenModal());
    }
  };

  const eventStyleGetter = (event) => ({
    style: {
      backgroundColor: id === event.user._id ? "#367CF7" : "#465660",
      opacity: 0.8,
      display: "block",
      color: "white",
    },
  });

  return (
    <div className="calendar">
      <Navbar />
      <div className="calendar__container">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          selectable
          view={lastView}
          components={{ event: CalendarEvent }}
          eventPropGetter={eventStyleGetter}
          onDoubleClickEvent={handleDoubleClick}
          onSelectEvent={handleSelectEvent}
          onView={handleViewChange}
          onSelectSlot={handleSelectSlot}
        />
      </div>

      {activeEvent && !modalOpen && <DeleteBtn />}
      <AddNewBtn />
      <CalendarModal />
    </div>
  );
};

export default CalendarScreen;
