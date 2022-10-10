import ReactLoading from "react-loading";
import './style.css';

export const Loading = () => (
  <div className="containerLoading">
    <ReactLoading className="loading" type="bubbles" color="#fff" />
  </div>
);
