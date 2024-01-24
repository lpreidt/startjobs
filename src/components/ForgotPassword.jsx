import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/PwReset.module.scss";
import { useAuth } from "../contexts/AuthContext";
import { doc, getDoc } from "firebase/firestore";

import { Form, Input, Button } from "antd";
import { Message } from "./Message";
import { useState } from "react";
import { useEffect } from "react";
import { UserType } from "./UserType";

export function ForgotPassword(props) {
  const [type, setType] = React.useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit");
    try {
      await resetPassword(email);
      setMessageTrigger({
        trigger: true,
        type: "success",
        message:
          "Email mit weiteren Informationen wurde an " + email + " gesendet! ",
      });
    } catch (error) {
      setMessageTrigger({
        trigger: true,
        type: "error",
        message: "Failed to reset password" + error,
      });
    }
  };
  const [messageTrigger, setMessageTrigger] = useState({
    trigger: false,
    type: "",
    message: "",
  });
  const [email, setEmail] = React.useState("");
  const { resetPassword, currentUser } = useAuth();
  const handleMail = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  if ((currentUser && type === "user") || props.test === "user") {
    return (
      <div className={styles.container}>
        <UserType setType={setType} />
        <Message
          trigger={messageTrigger.trigger}
          type={messageTrigger.type}
          message={messageTrigger.message}
        ></Message>
        <h2 className={styles.head}>Passwort zurücksetzten</h2>

        <Form>
          <Input
            className={styles.input}
            type="email"
            placeholder="Email"
            onChange={handleMail}
          ></Input>

          <div className={styles.buttonRow}>
            <Button
              className={styles.button}
              type="primary"
              onClick={handleSubmit}
            >
              Passwort zurücksetzten
            </Button>

            <Link to="/start-jobs/edituser">
              <Button className={styles.button}> Zurück</Button>
            </Link>
          </div>
        </Form>
      </div>
    );
  }
  if ((currentUser && type === "company") || props.test === "company") {
    return (
      <div className={styles.container}>
        <UserType setType={setType} />
        <Message
          trigger={messageTrigger.trigger}
          type={messageTrigger.type}
          message={messageTrigger.message}
        ></Message>
        <h2 className={styles.head}>Passwort zurücksetzten</h2>

        <Form>
          <Input
            className={styles.input}
            type="email"
            placeholder="Email"
            onChange={handleMail}
          ></Input>

          <div className={styles.buttonRow}>
            <Button
              className={styles.button}
              type="primary"
              onClick={handleSubmit}
            >
              Passwort zurücksetzten
            </Button>

            <Link to="/start-jobs/editcompany">
              <Button className={styles.button}> Zurück</Button>
            </Link>
          </div>
        </Form>
      </div>
    );
  } else {
    return (
      <div className={styles.container}>
        <UserType setType={setType} />
        <Message
          trigger={messageTrigger.trigger}
          type={messageTrigger.type}
          message={messageTrigger.message}
        ></Message>
        <h2 className={styles.head}>Passwort zurücksetzten</h2>

        <Form>
          <Input
            className={styles.input}
            type="email"
            placeholder="Email"
            onChange={handleMail}
          ></Input>

          <div className={styles.buttonRow}>
            <Button
              className={styles.button}
              title="submit"
              type="primary"
              onClick={handleSubmit}
            >
              Passwort zurücksetzten
            </Button>

            <Link to="/start-jobs/userlogin">
              <Button className={styles.button}> Zum Login</Button>
            </Link>
          </div>
        </Form>
      </div>
    );
  }
}
