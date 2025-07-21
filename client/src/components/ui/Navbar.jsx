import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../actions/auth";
import LogoutIcon from "./icons/LogoutIcon";
import UserIcon from "./icons/UserIcon";
import "./ui.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.auth.name);

  const handleLogout = () => dispatch(startLogout());

  return (
    <nav className="navbar">
      <ul className="navbar__list">
        <li className="navbar__item">
          <UserIcon />
          <span className="navbar__text">{username}</span>
        </li>
        <li className="navbar__item">
          <button
            className="navbar__link"
            title="Logout"
            onClick={handleLogout}
            style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
          >
            <LogoutIcon />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
