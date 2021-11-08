import React, { useContext, useEffect } from "react";
import logoutUser from "../context/actions/auth/logoutUser";
import { GlobalContext } from "../context/Provider";

export default function Logout() {
  const { authDispatch } = useContext(GlobalContext);

  useEffect(() => {
    logoutUser()(authDispatch);
  }, []);

  return <ActivityIndicator />;
}
