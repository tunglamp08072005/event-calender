import { useDispatch } from "react-redux";
import { eventClearActive } from "../../actions/event";
import { uiOpenModal } from "../../actions/ui";
import PlusIcon from "./icons/PlusIcon";

const AddNewBtn = () => {
  const dispatch = useDispatch();

  const onNewButtonClick = () => {
    dispatch(eventClearActive());
    dispatch(uiOpenModal());
  };

  return (
    <div className="btn-wrapper">
      <button
        type="button"
        className="btn btn-primary btn--floating btn--floating-right"
        onClick={onNewButtonClick}
        aria-label="Add new event"
      >
        <PlusIcon />
      </button>
    </div>
  );
};

export default AddNewBtn;
