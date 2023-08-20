import React, { useContext, useRef } from "react";
import { useHistory } from "react-router-dom";

import { changePassword } from "../../lib/api";
import AuthContext from "../../store/auth-context";
import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
  const newPasswordRef = useRef();
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredNewPassword = newPasswordRef.current.value;
    if (enteredNewPassword) {
      try {
        await changePassword(authCtx.token, enteredNewPassword);
        history.replace("/");
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          // minLength={6}
          type="password"
          id="new-password"
          ref={newPasswordRef}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
