import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";

import { useState } from "react";
import styles from "../styles/CreateCompany.module.scss";

import { firestore, auth } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import { createCompanyInDB } from "../contexts/CompanyContext";
import { Message } from "../components/Message";
import { BrowserRouter as Router, Route, Navigate } from "react-router-dom";

export function CreateCompany() {
  const [companyData, setCompanyData] = useState({
    email: "",
    employee_count: "",
    history: ["Keine Geschichte vorhanden"],
    location: [],
    name: "",
    picture: "",
    website: "",
    business_model: "",
  });
  const [loading, setLoading] = React.useState(false);
  const [created, setCreated] = useState(false);
  const [messageTrigger, setMessageTrigger] = useState({
    trigger: false,
    type: "",
    message: "",
  });
  const { signup } = useAuth();
  const db = firestore;

  async function onFinish(values) {
    console.log("Received values of form: ", values.email);

    console.log(companyData);
    try {
      setLoading(true);
      await signup(values.email, values.password)
        .then(async () => {})
        .then(async () => {
          const user = auth.currentUser;
          createCompanyInDB(user, {
            email: values.email,
            employee_count: values.employee_count,
            history: values.history,
            location: values.location,
            name: values.name,
            picture: values.picture,
            website: values.website,
            business_model: values.business_model,
          }).then(() => {
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
  if (created) {
    return <Navigate to="/start-jobs/companysubmitsucceed" />;
  } else {
    return (
      <div>
        <h2 className={styles.header}>Firmenaccount anlegen</h2>

        <Form
          name="company_signup"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
          className={styles.createCompanyForm}
        >
          <h3 className={styles.subHeader}>Allgemeine Firmeninformationen</h3>
          <div className={styles.usualInput}>
            <Form.Item
              label="Name"
              name="name"
              rules={[
                { required: true, message: "Please input your company name!" },
              ]}
            >
              <Input className={styles.antInputText} />
            </Form.Item>
            <Form.Item
              label="Website"
              name="website"
              rules={[
                {
                  required: true,
                  message: "Please input your company website!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </div>

          <h3 className={styles.subHeader}>Erzähl uns etwas über euch...</h3>
          <Form.Item
            label="Was macht euer Startup? (Bitte in kurz und knackig)"
            name="business_model"
            rules={[
              { required: true, message: "Bitte Geschäftsmodell beschreiben" },
            ]}
          >
            <Input.TextArea placeholder="Wie würdet ihr euer Startup eenem dreijährigen erklären?" />
          </Form.Item>
          <div className={styles.usualInput}>
            <Form.Item
              label="Anzahl der Mitarbeiter"
              name="employee_count"
              rules={[{ required: true }]}
            >
              <Input type="number" />
            </Form.Item>

            <Form.Item
              label="Standort"
              name="location"
              rules={[
                {
                  required: true,
                  message: "Please input your company location!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </div>

          <h3 className={styles.subHeader}>Was ist eure Geschichte?</h3>
          <div className={styles.normalText}>
            <p>
              Hier kannst du eure Firmengeschichte in kurzen Steps
              zusammenfassen.
            </p>
            <p>Beispiel von Google:</p>
            <ul>
              <li>
                <em>
                  1998: Gründung von Google von Sergey Brin und Larry Page{" "}
                </em>
              </li>
              <li>
                <em>2004: Google geht an die Börse </em>
              </li>
              <li>
                <em>
                  2008: Einführung von Chrome, einem Webbrowser von Google
                </em>
              </li>
              <li>
                <em>
                  2012: Übernahme von Motorola Mobility, einem Unternehmen, das
                  Mobilgeräte herstellt
                </em>
              </li>
              <li>
                <em>
                  2019: Einführung von Stadia, einer Cloud-Gaming-Plattform von
                  Google
                </em>
              </li>
            </ul>
            <p>
              {" "}
              <b>Jetzt eure Geschichte:</b>
            </p>
          </div>

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
              <Input />
            </Form.Item>

            <Form.Item
              label="Passwort"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Passwort wiederholen"
              name="password2"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.antButton}
            >
              Account anlegen
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
