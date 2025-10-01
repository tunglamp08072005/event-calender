import { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/vi";

import Navbar from "../ui/Navbar";
import CalendarEvent from "./CalendarEvent";
import AISuggestions from "./AISuggestions"; // 🆕 Import AI Suggestions

import "react-big-calendar/lib/css/react-big-calendar.css";
import "./calendar.css";
import CalendarModal from "./CalendarModal";
import { useDispatch, useSelector } from "react-redux";
import { uiOpenModal } from "../../actions/ui";
import {
  eventClearActive,
  eventSetActive,
  eventStartLoading,
} from "../../actions/event";
import AddNewBtn from "../ui/AddNewBtn";
import DeleteBtn from "../ui/DeleteBtn";

moment.locale("vi");

const localizer = momentLocalizer(moment);

const CalendarScreen = () => {
  const dispatch = useDispatch();
  const { calendar, auth, ui } = useSelector((state) => state);
  const { events, activeEvent } = calendar;
  const { id } = auth;
  const { modalOpen } = ui;

  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [showAISuggestions, setShowAISuggestions] = useState(false); // 🆕 AI Suggestions state

  useEffect(() => {
    dispatch(eventStartLoading());
  }, [dispatch]);

  useEffect(() => {
    setFilteredEvents(
      events.filter((event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, events]);

  const onDoubleClick = () => {
    dispatch(uiOpenModal());
  };

  const onSelect = (e) => {
    dispatch(eventSetActive(e));
  };

  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem("lastView", e);
  };

  const onSelectSlot = (e) => {
    activeEvent && dispatch(eventClearActive());
    if (e.action === "select" || e.action === "doubleClick") {
      dispatch(
        eventSetActive({
          title: "",
          notes: "",
          start: e.start,
          end: e.end,
        })
      );
      dispatch(uiOpenModal());
    }
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: id === event.user._id ? "#367CF7" : "#465660",
      opacity: 0.8,
      display: "block",
      color: "white",
    };

    return { style };
  };

  return (
    <div className="calendar">
      <Navbar />

      {/* 🔍 Ô tìm kiếm & AI Tools */}
      <div className="calendar__header">
        <div className="calendar__search">
          <input
            type="text"
            placeholder="🔍 Tìm kiếm sự kiện..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="calendar__search-input"
          />
        </div>

        {/* 🆕 AI Tools Section */}
        <div className="calendar__ai-tools">
          <button 
            className="btn btn-ai"
            onClick={() => setShowAISuggestions(!showAISuggestions)}
          >
            🎯 Gợi ý AI {showAISuggestions ? '▲' : '▼'}
          </button>
        </div>
      </div>

      {/* 🆕 AI Suggestions Panel */}
      {showAISuggestions && (
        <div className="ai-suggestions-panel">
          <AISuggestions />
        </div>
      )}

      <div className="calendar__container">
        <Calendar
          localizer={localizer}
          events={filteredEvents}
          startAccessor="start"
          endAccessor="end"
          eventPropGetter={eventStyleGetter}
          onDoubleClickEvent={onDoubleClick}
          onSelectEvent={onSelect}
          onView={onViewChange}
          onSelectSlot={onSelectSlot}
          selectable={true}
          view={lastView}
          components={{ event: CalendarEvent }}
          messages={{
            allDay: "Cả ngày",
            previous: "Trước",
            next: "Tiếp",
            today: "Hôm nay",
            month: "Tháng",
            week: "Tuần",
            day: "Ngày",
            agenda: "Lịch biểu",
            date: "Ngày",
            time: "Giờ",
            event: "Sự kiện",
            noEventsInRange: "Không có sự kiện nào trong khoảng thời gian này.",
            showMore: (total) => `+ thêm ${total}`,
          }}
        />
      </div>

      {activeEvent && !modalOpen && (
        <div className="btn--floating-bottom-left-wrapper">
          <button
            className="btn btn-primary"
            onClick={() => dispatch(uiOpenModal())}
            title="Chỉnh sửa sự kiện"
          >
            ✏️
          </button>
          <DeleteBtn />
        </div>
      )}

      <AddNewBtn />
      <CalendarModal />
    </div>
  );
};

export default CalendarScreen;