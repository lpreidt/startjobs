import React from "react";
import { Form, Input, Button, Checkbox, Select } from "antd";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";

import { useState } from "react";
import styles from "../styles/CreateCompany.module.scss";

import { firestore, auth } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import { createCompanyInDB } from "../contexts/CompanyContext";
import { Message } from "../components/Message";
import { BrowserRouter as Router, Route, Navigate } from "react-router-dom";
import { createJobInDB } from "../contexts/JobContext";
import { create } from "react-test-renderer";
import { LoadingOutlined } from "@ant-design/icons";

export function CreateJob() {
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
  const { signup, currentUser } = useAuth();
  const db = firestore;

  async function onFinish(values) {
    console.log("Received values of form: ", values.email);

    console.log(companyData);
    try {
      setLoading(true);

      await createJobInDB(
        {
          name: values.name,
          type: values.type,
          description: values.description,
          location: values.location,
          qualifications: values.qualifications,
          documents: values.documents,
        },
        currentUser.uid
      ).catch((error) => {
        console.log(
          "Something went wrong with adding user to Firestore: ",
          error
        );
        setMessageTrigger({
          trigger: true,
          type: "error",
          message: "Failed to create a job" + error,
        });
      });
    } catch (error) {
      alert("Failed to create a job");
      console.log(error);
    }
    setLoading(false);
    setCreated(true);
  }
  if (loading) {
    return (
      <div>
        <LoadingOutlined />
      </div>
    );
  }
  if (created) {
    return <Navigate to="/start-jobs/managejobs" />;
  } else {
    return (
      <div>
        <h2 className={styles.header}>Job erstellen</h2>

        <Form
          name="company_signup"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
          className={styles.createCompanyForm}
        >
          <h3 className={styles.subHeader}>Allgemeine Jobinformationen</h3>
          <div className={styles.usualInput}>
            <Form.Item
              label="Titel"
              name="name"
              rules={[
                { required: true, message: "Bitte füge einen Titel hinzu" },
              ]}
            >
              <Input placeholder="Jobtitel" className={styles.antInputText} />
            </Form.Item>
            <Form.Item
              label="Art der Beschäftigung"
              name="type"
              rules={[
                {
                  required: true,
                  message: "Bitte wähle eine Art der Beschäftigung aus",
                },
              ]}
            >
              <Select placeholder="Art der Beschäftigung wählen...">
                <Select.Option value="Vollzeit">Vollzeit</Select.Option>
                <Select.Option value="Teilzeit">Teilzeit</Select.Option>
                <Select.Option value="Praktikum">Praktikum</Select.Option>
                <Select.Option value="Werkstudent">Werkstudent</Select.Option>
                <Select.Option value="Ausbildung">Ausbildung</Select.Option>
                <Select.Option value="Freelancer">Freelancer</Select.Option>
                <Select.Option value="Minijob">Minijob</Select.Option>
                <Select.Option value="CoFounder">CoFounder</Select.Option>
              </Select>
            </Form.Item>
          </div>

          <h3 className={styles.subHeader}>Beschreibe den Job...</h3>
          <Form.Item
            label="Jobbeschreibung"
            name="description"
            rules={[
              { required: true, message: "Bitte Jobbeschreibung hinzufügen" },
            ]}
          >
            <Input.TextArea placeholder="Was muss in diesem Job getan werden" />
          </Form.Item>
          <div className={styles.usualInput}>
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
              <Input placeholder="Standort" />
            </Form.Item>
          </div>

          <h3 className={styles.subHeader}>Qualifikationen</h3>
          <div className={styles.normalText}>
            <p>
              Welche Qualifikationen soll der Bewerber mitbringen? <br />{" "}
            </p>
          </div>

          <Form.List name="qualifications">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => (
                  <Form.Item required={false} key={field.key}>
                    <Form.Item
                      {...field}
                      validateTrigger={["onChange", "onBlur"]}
                      noStyle
                    >
                      <Input.TextArea placeholder="Qualifikation hinzufügen" />
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

          <h3 className={styles.subHeader}>Benötigte Unterlagen</h3>
          <div className={styles.normalText}>
            <p>
              Welche Unterlagen benötigen Sie vom Bewerber? <br />{" "}
            </p>
          </div>

          <Form.List name="documents">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => (
                  <Form.Item required={false} key={field.key}>
                    <Form.Item
                      {...field}
                      validateTrigger={["onChange", "onBlur"]}
                      noStyle
                    >
                      <Input.TextArea placeholder="Benötgtes Dokument hinzufügen" />
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

          <Form.Item>
            <Button
              type="primary"
              title="erstellen"
              htmlType="submit"
              className={styles.antButton}
            >
              Job erstellen
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
