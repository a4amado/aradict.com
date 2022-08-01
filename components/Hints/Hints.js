import styles from "./Hints.module.scss";

const Hints = ({ children }) => {
  const Classes = {
    hints: styles.hints,
  };
  return <div className={Classes.hints}>{children}</div>;
};

export default Hints;
