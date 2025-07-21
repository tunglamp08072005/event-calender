import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { eventStartDelete } from "../../actions/event";
import DeleteIcon from "./icons/DeleteIcon";

const DeleteBtn = () => {
  const dispatch = useDispatch();

  const handleClickDelete = () => {
    Swal.fire({
      title: "Xoá sự kiện",
      text: "Bạn có muốn xoá sự kiện đã chọn không?",
      icon: "warning",
      confirmButtonText: "Vâng, xoá!",
      cancelButtonText: "Huỷ", // <- Thêm dòng này để nút Huỷ hiển thị đúng tiếng Việt
      showCancelButton: true,
    }).then(({ isConfirmed }) => {
      if (isConfirmed) dispatch(eventStartDelete());
    });
  };

  return (
    <button
      className="btn btn-primary btn--floating btn--floating-left"
      onClick={handleClickDelete}
    >
      <DeleteIcon />
    </button>
  );
};

export default DeleteBtn;
