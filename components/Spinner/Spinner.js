import { lds_ring } from "./Spinner.module.scss";
function Spinner() {
  return (
    <div className={lds_ring}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}


export default Spinner;