import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { firestore, auth } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import styles from "../styles/EditCompany.module.scss";

import { shortSuccess, shortError } from "../contexts/SaveContext";

import { Link } from "react-router-dom";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { LoadingOutlined } from "@ant-design/icons";
import { useState } from "react";
export function EditCompany() {
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [business_model, setBusiness_model] = useState("");
  const [employee_count, setEmployee_count] = useState("");
  const [location, setLocation] = useState("");
  const [history, setHistory] = useState(["a", "b", "c"]);
  const [picture, setPicture] = useState("");
  const [email, setEmail] = useState("");
  const [suceeed, setSuceed] = useState(false);
  const [errored, setErrored] = useState(false);

  const { currentUser } = useAuth();
  const db = firestore;
  const [loading, setLoading] = useState(false);
  async function fetchCompany() {
    try {
      setLoading(true);
      const docRef = doc(db, "companies", currentUser.uid);
      const docSnap = await getDoc(docRef);
      setName(docSnap.data().name);
      setWebsite(docSnap.data().website);
      setBusiness_model(docSnap.data().business_model);
      setEmployee_count(docSnap.data().employee_count);
      setLocation(docSnap.data().location);
      setHistory(docSnap.data().history);
      setPicture(docSnap.data().picture);
      setEmail(docSnap.data().email);

      console.log(name);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  const onFinish = async (values) => {
    try {
      setLoading(true);
      setName(values.name);
      setWebsite(values.website);
      setBusiness_model(values.business_model);
      setEmployee_count(values.employee_count);
      setLocation(values.location);
      setHistory(values.history);
      setPicture(values.picture);
      setEmail(values.email);

      const docRef = doc(db, "companies", currentUser.uid);

      await setDoc(docRef, {
        name: values.name,
        website: values.website,
        business_model: values.business_model,
        employee_count: values.employee_count,
        location: values.location,
        history: values.history,
        picture: values.picture,
        email: values.email,
      });
      setLoading(false);
      setSuceed(true);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setErrored(true);
    }
  };
  useEffect(() => {
    fetchCompany();
  }, [currentUser]);
  useEffect(() => {
    if (suceeed) {
      shortSuccess();
    }
    if (errored) {
      shortError();
    }
  }, [suceeed, errored]);

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
    <div>
      <h2 className={styles.header}>Firmenaccount bearbeiten</h2>

      <Form
        name="company_signup"
        initialValues={{
          name,
          website,
          business_model,
          employee_count,
          location,
          email,
          picture,

          history,
        }}
        onFinish={onFinish}
        layout="vertical"
        className={styles.createCompanyForm}
      >
        <h3 className={styles.subHeader}>Allgemeine Firmeninformationen</h3>
        <div className={styles.usualInput}>
          <Form.Item label="Name" name="name">
            <Input className={styles.antInputText} />
          </Form.Item>
          <Form.Item label="Website" name="website">
            <Input />
          </Form.Item>
        </div>

        <h3 className={styles.subHeader}>Steckbrief</h3>
        <Form.Item
          label="Was macht euer Startup? (Bitte in kurz und knackig)"
          name="business_model"
        >
          <Input.TextArea placeholder="Wie würdet ihr euer Startup eenem dreijährigen erklären?" />
        </Form.Item>
        <div className={styles.usualInput}>
          <Form.Item label="Anzahl der Mitarbeiter" name="employee_count">
            <Input type="number" />
          </Form.Item>

          <Form.Item label="Standort" name="location">
            <Input />
          </Form.Item>
        </div>

        <h3 className={styles.subHeader}>Geschichte</h3>

        <Form.List name="history">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item required={false} key={field.key}>
                  <Form.Item
                    {...field}
                    validateTrigger={["onChange", "onBlur"]}
                    noStyle
                  >
                    <Input.TextArea placeholder="Enter historical step" />
                  </Form.Item>
                  {fields.length > 1 ? (
                    <MinusCircleOutlined
                      className="dynamic-delete-button"
                      onClick={() => remove(field.name)}
                    />
                  ) : null}
                </Form.Item>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusCircleOutlined />}
                >
                  Step hinzufügen
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <h3 className={styles.subHeader}>Firmenlogo</h3>
        <Form.Item
          label="Picture"
          name="picture"
          rules={[
            { required: true, message: "Please input your company picture!" },
          ]}
        >
          <Input />
        </Form.Item>
        <h3 className={styles.subHeader}>Account Information</h3>

        <div className={styles.usualInput}>
          <Form.Item
            label="E-Mail"
            name="email"
            rules={[
              { required: true, message: "E-Mail ist erforderlich" },
              { type: "email", message: "E-Mail ist ungültig" },
            ]}
          >
            <Input disabled={true} />
          </Form.Item>
        </div>

        <Form.Item>
          <Button type="primary" htmlType="submit" className={styles.antButton}>
            Daten speichern
          </Button>
        </Form.Item>
        <div className={styles.buttonDiv}>
          <h3 className={styles.subHeader}>Passwort ändern</h3>

          <Link to={"/start-jobs/forgotpassword"}>
            <Button className={styles.antButton}>Passwort zurücksetzen</Button>
          </Link>
        </div>
      </Form>
    </div>
  );
}
