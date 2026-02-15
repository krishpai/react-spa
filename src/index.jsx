import React from "react";
import { createRoot } from "react-dom/client";
import { PublicClientApplication, EventType } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./authConfig";
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

/**
 * MSAL should be instantiated outside of the component tree to prevent it
 * from being re-instantiated on re-renders.
 */
const msalInstance = new PublicClientApplication(msalConfig);

console.log("Before sync:", msalInstance.getActiveAccount());

// Default to using the first account if one is already logged in
if (!msalInstance.getActiveAccount() && msalInstance.getAllAccounts().length > 0) {
  msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]);
}

// Optional: Listen for login events to update the active account
msalInstance.addEventCallback((event) => {
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
    const account = event.payload.account;
    msalInstance.setActiveAccount(account);
  }
});

// React 19 Root Rendering
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <App />
    </MsalProvider>
  </React.StrictMode>,
);
