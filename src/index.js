import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "react-toastify/dist/ReactToastify.css";
import "react-circular-progressbar/dist/styles.css";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configStore } from "./apps/store/configStore";

const root = ReactDOM.createRoot(document.getElementById("root"));
const store = configStore();
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
