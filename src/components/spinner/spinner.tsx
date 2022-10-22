import spinnerStyles from "./spinner.module.css";

const Spinner = () => {
  return (
    <div className={spinnerStyles.spinner}>
      <i className={spinnerStyles.icon}></i>
    </div>
  );
};

export default Spinner;
