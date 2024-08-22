import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import MyAudioContextProvider from "./contexts/my-audio-context.js";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MyAudioContextProvider>
      <App />
    </MyAudioContextProvider>
  </React.StrictMode>
);
