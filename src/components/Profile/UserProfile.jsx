import React, { useContext, useEffect } from "react";

import useHttp from "../../hooks/use-http";
import { getUserData } from "../../lib/api";
import AuthContext from "../../store/auth-context";
import ProfileForm from "./ProfileForm";
import classes from "./UserProfile.module.css";

const UserProfile = () => {
  const authCtx = useContext(AuthContext);
  const { token } = authCtx;

  const { sendRequest, data } = useHttp(getUserData);
  const userEmail = data?.users?.map((user) => user?.email);

  useEffect(() => {
    sendRequest(token);
  }, [sendRequest, token]);

  return (
    <section className={classes.profile}>
      <h2>Hello, {userEmail}</h2>
      <ProfileForm />
    </section>
  );
};

export default UserProfile;
