import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import validator from "validator";
import useForm from "../../hooks/useForm";
import { startLogin } from "../../actions/auth";
import Alert from "../ui/Alert";
import { removeError, setError } from "../../actions/ui";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const { msgError } = useSelector((state) => state.ui);

  const [formValues, handleInputChange] = useForm({
    email: "",
    password: "",
  });

  const { email, password } = formValues;

  const handleLogin = (event) => {
    event.preventDefault();
    if (isFormValid()) {
      dispatch(startLogin(email, password));
    }
  };

  const isFormValid = () => {
    if (!validator.isEmail(email)) {
      dispatch(setError("Email is not valid"));
      return false;
    }

    if (!password.trim()) {
      dispatch(setError("Password is required"));
      return false;
    }

    dispatch(removeError());
    return true;
  };

  return (
    <section className="card">
      <div className="card__row card__row--right">
        <div className="card__body">
          <h1 className="card__title">Login</h1>
          <form className="form" onSubmit={handleLogin}>
            {!!msgError && <Alert type="error" description={msgError} />}

            <div className="form__field">
              <label htmlFor="email" className="form__label">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                className="form__input"
                value={email}
                onChange={handleInputChange}
              />
            </div>

            <div className="form__field">
              <label htmlFor="password" className="form__label">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                className="form__input"
                value={password}
                onChange={handleInputChange}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      </div>

      <div className="card__row card__row--colored card__row--left">
        <div className="card__body">
          <h2 className="card__subtitle">You're new?</h2>
          <p className="card__description">
            Register and discover a great amount of features
          </p>
          <Link to="/auth/register" className="btn btn-primary--outline">
            Create account
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LoginScreen;
