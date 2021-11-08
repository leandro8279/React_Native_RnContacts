import React, { createContext, useReducer } from "react";
import { auth, contacts } from "./reducers";
import { authInitialState, contactsInitialState } from "./initialsStates";

export const GlobalContext = createContext({});

export default function GlobalProvider({ children }) {
  const [authState, authDispatch] = useReducer(auth, authInitialState);
  const [contactsState, contactsDispatch] = useReducer(
    contacts,
    contactsInitialState
  );
  return (
    <GlobalContext.Provider
      value={{ authState, authDispatch, contactsState, contactsDispatch }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
