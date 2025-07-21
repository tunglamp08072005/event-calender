import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import validator from "validator";
import { startRegister } from "../../actions/auth";
import { setError, removeError } from "../../actions/ui";
import useForm from "../../hooks/useForm";
import Alert from "../ui/Alert";

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const { msgError } = useSelector((state) => state.ui);

  const [formValues, handleInputChange] = useForm({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formValues;

  const handleRegister = (event) => {
    event.preventDefault();
    if (isFormValid()) {
      dispatch(startRegister(name, email, password));
    }
  };

  const isFormValid = () => {
    const trimmedName = name.trim();
    const trimmedPassword = password.toString();

    if (!trimmedName) {
      dispatch(setError("Name is required"));
      return false;
    }

    if (trimmedName.length > 32) {
      dispatch(setError("Name length must be max 32 characters"));
      return false;
    }

    if (!validator.isEmail(email)) {
      dispatch(setError("Email is not valid"));
      return false;
    }

    if (
      !validator.isStrongPassword(trimmedPassword) ||
      trimmedPassword.length > 32
    ) {
      dispatch(
        setError(
          "Password should be between 8-32 characters and should include 1 number, 1 symbol, 1 lowercase and 1 uppercase"
        )
      );
      return false;
    }

    if (password !== password2) {
      dispatch(setError("Passwords should match"));
      return false;
    }

    dispatch(removeError());
    return true;
  };

  return (
    <section className="card card--inverse">
      <div className="card__row card__row--left">
        <div className="card__body">
          <h1 className="card__title">Create account</h1>
          <form className="form" onSubmit={handleRegister}>
            {msgError && <Alert type="error" description={msgError} />}

            <div className="form__field">
              <label htmlFor="name" className="form__label">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                className="form__input"
                value={name}
                onChange={handleInputChange}
              />
            </div>

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

            <div className="form__field">
              <label htmlFor="password2" className="form__label">Password confirmation</label>
              <input
                id="password2"
                name="password2"
                type="password"
                className="form__input"
                value={password2}
                onChange={handleInputChange}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </form>
        </div>
      </div>

      <div className="card__row card__row--colored card__row--right">
        <div className="card__body">
          <h2 className="card__subtitle">Welcome back!</h2>
          <p className="card__description">
            To keep connected, please login with your personal information
          </p>
          <Link to="/auth/login" className="btn btn-primary btn-primary--outline">
            Login
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RegisterScreen;
