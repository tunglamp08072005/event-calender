import PropTypes from "prop-types";

const Alert = (props) => {
  const { type = "info", description = "" } = props;

  return (
    <section className={`alert alert__${type}`}>
      <span className="alert__title">{description}</span>
    </section>
  );
};

Alert.propTypes = {
  type: PropTypes.string,
  description: PropTypes.string,
};

export default Alert;
