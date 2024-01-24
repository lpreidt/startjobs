import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { useAuth } from "../contexts/AuthContext";
import { firestore, auth } from "../firebase";
import { createUserInDB } from "../contexts/UserContext";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { BrowserRouter as Router, Route, Navigate } from "react-router-dom";
import { Message } from "../components/Message";
import Google, { GoogleSignup } from "./Google";
import styles from "../styles/CreateUser.module.scss";

export function CreateUser() {
  const [form] = Form.useForm();
  const [isPasswordMatched, setIsPasswordMatched] = useState(true);
  const [email, setEmail] = React.useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = React.useState("");
  const [password2, setPassword2] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [created, setCreated] = useState(false);
  const [messageTrigger, setMessageTrigger] = useState({
    trigger: false,
    type: "",
    message: "",
  });

  const { signup } = useAuth();
  const db = firestore;

  async function handleSubmit(e) {
    setMessageTrigger({ trigger: false, type: "", message: "" });

    try {
      setLoading(true);
      await signup(email, password)
        .then(async () => {
          const user = auth.currentUser;
          createUserInDB(user, firstName, lastName, email).then(() => {
            setCreated(true);
            setMessageTrigger({ trigger: false, type: "", message: "" });
          });
        })
        .catch((error) => {
          console.log(
            "Something went wrong with adding user to Firestore: ",
            error
          );
          setMessageTrigger({
            trigger: true,
            type: "error",
            message: "Failed to create an account" + error,
          });
        });
    } catch (error) {
      alert("Failed to create an account");
      console.log(error);
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
  const handlePassword2 = (event) => {
    const value = event.target.value;
    setPassword2(value);
  };
  const handleFirstName = (event) => {
    const value = event.target.value;
    setFirstName(value);
  };
  const handleLastName = (event) => {
    const value = event.target.value;
    setLastName(value);
  };

  const handlePasswordMatch = (_, value) => {
    setIsPasswordMatched(value === form.getFieldValue("password"));
    return Promise.resolve();
  };

  if (created) {
    return <Navigate to="/start-jobs/usersubmitsucceed" />;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Account erstellen</h1>
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        className="create-user-form"
      >
        <Form.Item
          name="firstName"
          label="Vorname:"
          rules={[
            {
              required: true,
              message: "Bitte geben Sie Ihren Vornamen an",
            },
          ]}
        >
          <Input
            placeholder="Vorname"
            className="form-input"
            onChange={handleFirstName}
          />
        </Form.Item>
        <Form.Item
          name="lastName"
          label="Nachname:"
          rules={[
            {
              required: true,
              message: "Bitte geben Sie ihren Nachnamen ein",
            },
          ]}
        >
          <Input
            placeholder="Nachname"
            className="form-input"
            onChange={handleLastName}
          />
        </Form.Item>
        <Form.Item
          name="email"
          label="E-Mail:"
          rules={[
            {
              required: true,
              message: "Bitte geben Sie ihre E-Mail Adresse ein",
            },
            {
              type: "email",
              message: "Bitte geben Sie eine gültige E-Mail Adresse ein",
            },
          ]}
        >
          <Input
            placeholder="Email"
            className="form-input"
            onChange={handleMail}
          />
        </Form.Item>
        <Form.Item
          name="password"
          label="Passwort:"
          rules={[
            {
              required: true,
              message: "Bitte geben Sie ein Passwort ein",
            },
            {
              min: 6,
              message: "Das Passwort muss mindestens aus 6 Zeichen bestehen",
            },
            {
              validator: handlePasswordMatch,
              message: "Passwörter stimmen nicht überein",
            },
          ]}
        >
          <Input.Password
            placeholder="Passwort"
            className="form-input"
            onChange={handlePassword}
          />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="Passwort bestätigen:"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "Bitte bestätigen Sie ihr Passwort",
            },
            {
              validator: handlePasswordMatch,
              message: "Passwörter stimmen nicht überein",
            },
          ]}
        >
          <Input.Password
            placeholder="Passwort wiederholen"
            className="form-input"
            onChange={handlePassword2}
          />
        </Form.Item>

        <Form.Item className="form-button">
          <Button
            type="primary"
            htmlType="submit"
            className="create-user-button"
            id="create-user-button"
            title="create-user-button"
            disabled={!isPasswordMatched}
          >
            Account erstellen
          </Button>
        </Form.Item>
      </Form>
      <GoogleSignup />
      {messageTrigger.trigger && (
        <Message message={messageTrigger.message} type={messageTrigger.type} />
      )}
    </div>
  );
}
