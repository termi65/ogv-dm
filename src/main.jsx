import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
// import "./index.css";
import 'bootstrap/dist/css/bootstrap.css';
import { IntlProvider } from "react-intl";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <IntlProvider locale="en" defaultLocale="de">
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </IntlProvider>
    </React.StrictMode>
);
