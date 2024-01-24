import React, { useState, useEffect } from "react";

import { firestore, auth } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { Form, Input, Button, Checkbox } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { shortSuccess, shortError } from "../contexts/SaveContext";
import styles from "../styles/EditUser.module.scss";
import { Link } from "react-router-dom";
export function EditUser() {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const [firstName, setFirstName] = useState("Max");
  const [lastName, setLastName] = useState("Mustermann");
  const [email, setEmail] = useState("");
  const [savedJobs, setsavedJobs] = useState([]);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [succeeded, setSucceeded] = useState(false);
  const [errored, setErrored] = useState(false);

  const { currentUser } = useAuth();
  const db = firestore;

  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        //setUserData(docSnap.data());
        setFirstName(docSnap.data().firstName);
        setLastName(docSnap.data().lastName);
        setEmail(docSnap.data().email);
        setsavedJobs(docSnap.data().savedJobs);
        console.log(userData);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    fetchUser();
  }, [currentUser]);

  useEffect(() => {
    if (succeeded) {
      shortSuccess();
    }
    if (errored) {
      shortError();
    }
  }, [succeeded, errored]);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      setFirstName(values.firstName);
      setLastName(values.lastName);
      console.log(firstName, lastName);
      const docRef = doc(db, "users", currentUser.uid);
      await setDoc(docRef, {
        firstName: values.firstName,
        lastName: values.lastName,
        email: email,
        savedJobs: savedJobs,
      });
      setLoading(false);
      setSucceeded(true);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setErrored(true);
    }
  };

  if (loading) {
    return (
      <div>
        <LoadingOutlined
          style={{
            fontSize: 60,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
          spin
        />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Benutzer bearbeiten</h1>
      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ firstName, lastName, email }}
      >
        <Form.Item name="firstName" label="Vorname">
          <Input />
        </Form.Item>
        <Form.Item name="lastName" label="Nachname">
          <Input />
        </Form.Item>
        <Form.Item name="email" label="E-Mail">
          <Input disabled />
        </Form.Item>

        <Form.Item>
          <Button title="speichern" type="primary" htmlType="submit">
            Speichern
          </Button>
        </Form.Item>
      </Form>
      <div className={styles.buttonDiv}>
        <h2 className={styles.subHeader}>Passwort ändern</h2>
        <Link to={"/start-jobs/forgotpassword"}>
          <Button>Passwort zurücksetzen</Button>
        </Link>

        <h2 className={styles.subHeader}>Vorsicht kritsiche Zone</h2>

        <Button className={styles.deleteButton}>Account löschen</Button>
      </div>
    </div>
  );
}
