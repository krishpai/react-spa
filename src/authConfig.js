/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { LogLevel } from "@azure/msal-browser";

/**
 * Configuration object to be passed to MSAL instance on creation.
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
 */

export const msalConfig = {
  auth: {
    clientId: "8a26d3fc-6f6e-4f06-9568-2415b5d71bf5",
    //clientId: "e85ae0cf-008d-4bcf-bb7e-7f1d975eaf5e", //Ticket clinic production client
    authority: "https://login.microsoftonline.com/c42f44e3-dca8-43ac-bfd0-9f2bbdce6c7a",
    //"https://login.microsoftonline.com/44d9a3b3-17c3-4c76-9026-41222eb1b4fd", //Ticket clinic production tenant
    redirectUri: import.meta.env.VITE_REDIRECT_URI,
  },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored

    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    /** Since you have this set to false, MSAL is relying strictly on the browser's storage API.
     * If you were on an old browser (like legacy Edge or IE) that clears storage frequently during redirects,
     * your session would actually break on refresh. Setting it to false is perfectly fine
     * (and recommended) for all modern browsers like Chrome, Firefox, and Safari.*/
  },
  system: {
    logLevel: 3,
    piiLoggingEnabled: true, // Only use this during local debugging!
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
          default:
            return;
        }
      },
    },
  },
};

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit:
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
  scopes: ["User.Read"],
};

/**
 * Add here the scopes to request when obtaining an access token for MS Graph API. For more information, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};
