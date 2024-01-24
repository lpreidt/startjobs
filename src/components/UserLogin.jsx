import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Login.module.scss";
import { useAuth } from "../contexts/AuthContext";
import { Form, Input, Button } from "antd";
import { Message } from "./Message";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { AccountAction } from "./AccountAction";
import { GoogleSignIn, GoogleSignup } from "./Google";
export function UserLogin() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [messageTrigger, setMessageTrigger] = useState({
    trigger: false,
    type: "",
    message: "",
  });
  const [success, setSuccess] = useState(false);
  const { login, currenUser } = useAuth();
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      await login(email, password).then(() => {
        setMessageTrigger({ trigger: false, type: "", message: "" });
        setSuccess(true);
      });
    } catch (error) {
      console.log(error);
      setMessageTrigger({
        trigger: true,
        type: "error",
        message: "Failed to login" + error,
      });
    }
    setLoading(false);
  }
  const handleMail = (event) => {
    const value = event.target.value;
    setEmail(value);
  };
  const handlePassword = (event) => {
    const value = event.target.value;
    setPassword(value);
  };
  if (success) {
    return (
      <>
        {" "}
        <Navigate to="/"></Navigate>
        <AccountAction holz={true} />
      </>
    );
  } else {
    return (
      <div className={styles.container}>
        <Message
          trigger={messageTrigger.trigger}
          type={messageTrigger.type}
          message={messageTrigger.message}
        ></Message>
        <h2 className={styles.head}>Login als Nutzer</h2>

        <Form>
          <Input
            className={styles.input}
            type="email"
            id="email"
            placeholder="Email"
            onChange={handleMail}
          ></Input>
          <Input
            className={styles.input}
            type="password"
            placeholder="Password"
            onChange={handlePassword}
          ></Input>
          <div className={styles.buttonRow}>
            <Button
              className={styles.button}
              type="primary"
              onClick={handleSubmit}
              id="login"
            >
              Login
            </Button>

            <Link to="/start-jobs/createuser">
              <Button className={styles.button}> Account erstellen</Button>
            </Link>
          </div>
        </Form>
        <GoogleSignup />

        <Link className={styles.link} to="/start-jobs/forgotpassword">
          Passwort vergessen?
        </Link>
      </div>
    );
  }
}
