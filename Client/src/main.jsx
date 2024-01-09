import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Store from "./Store/Store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={Store}>
    <App />
  </Provider>
);
