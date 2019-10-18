import axios from "axios";
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";

import styles from "./Account.module.scss";
import ErrorHandeling from "components/error/Error";

function NotifiesLogin(data) {
  document.title = "Notifies | Login";
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const useInput = initialValue => {
    const [value, setValue] = useState(initialValue);

    return {
      value,
      setValue,
      reset: () => setValue(""),
      bind: {
        value,
        onChange: event => {
          setValue(event.target.value);
        },
      },
    };
  };

  const { value: userName, bind: bindUserName, reset: resetUserName } = useInput("");
  const { value: password, bind: bindPassword, reset: resetPassword } = useInput("");

  const handleSubmit = evt => {
    evt.preventDefault();

    loginAccount();
  };

  async function loginAccount() {
    // let error;

    setError(null);
    await axios
      .post(`http://localhost:3100/notifies/account/login`, {
        accountName: userName,
        accountPassword: password,
      })
      .then(res => {
        document.cookie = `Notifies_AccountName=${res.data.account.username}; path=/`;
        document.cookie = `Notifies_AccountEmail=${res.data.account.email}; path=/`;
        document.cookie = `Twitch-access_token=${res.data.account.twitch_token}; path=/`;
        document.cookie = `Youtube-access_token=${res.data.account.youtube_token}; path=/`;
        document.cookie = `Notifies_AccountProfileImg=${res.data.account.profile_img}; path=/`;

        // data.data.setRefresh(!data.data.refresh);
        // data.navSetRefresh(!data.navRefresh);

        resetUserName();
        resetPassword();
        setIsLoggedIn(true);
      })
      .catch(error => {
        console.error(error);
        setError({
          title: error.response.data,
          message: error.response.status,
        });
      });
  }

  return (
    <>
      {error ? <ErrorHandeling data={error}></ErrorHandeling> : null}
      <h3 className={styles.formTitle}>Login with your Notifies account.</h3>
      <Form onSubmit={handleSubmit} validated className={styles.createForm}>
        <Form.Group controlId='formGroupUserName'>
          <Form.Label>Username</Form.Label>
          <Form.Control type='text' placeholder='Username' {...bindUserName} />
        </Form.Group>
        <Form.Group controlId='formGroupPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' placeholder='Password' {...bindPassword} />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Login
        </Button>
      </Form>
      {isLoggedIn & !error ? <Redirect to='/account'></Redirect> : null}
    </>
  );
}

export default NotifiesLogin;
