import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/configureStore";
import { PersistGate } from "redux-persist/integration/react";
import Theme from "./theme";
import AppLayout from "./router/Layout";
import * as serviceWorker from "./serviceWorkerRegistration";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
console.log = console.warn = console.error = () => {};

serviceWorker.register();

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Theme>
          <AppLayout />
        </Theme>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
