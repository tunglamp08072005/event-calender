const CalendarEvent = (props) => {
  const title = props.event?.title || "Untitled";
  const userName = props.event?.user?.name || "Unknown";

  return (
    <div>
      <strong>{title}</strong>
      <span> - {userName}</span>
    </div>
  );
};

export default CalendarEvent;
