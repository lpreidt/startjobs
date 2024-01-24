import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { firestore } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";
import { async } from "@firebase/util";
import { useEffect } from "react";
import { Button, Input, Upload } from "antd";
import { useAuth } from "../contexts/AuthContext";
import { PdfUploader } from "../components/PdfUploader";
import { Navigate } from "react-router-dom";
import styles from "../styles/Apply.module.scss";
import JSZip from "jszip";
import { UserSucceed } from "./UserSucceed";

export function Apply() {
  //Generell
  let { id } = useParams("0");
  const [job, setJob] = useState({});
  const [companyData, setCompanyData] = useState({});
  const [file, setFile] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [notes, setNotes] = useState("");
  const [success, setSuccess] = useState(false);
  const handleNotes = () => (event) => {
    const value = event.target.value;
    setNotes(value);
  };
  //Firebase
  const { currentUser } = useAuth();
  const [user, setUser] = useState({});
  const [userType, setUserType] = useState("");
  const [loading, setLoading] = useState(false);
  async function handleUserType() {
    if (currentUser) {
      const docRef = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserType("user");
        //console.log("Das ist ein User");
      } else {
        setUserType("company");
        console.log("Das ist ein Unternehmen");
      }
    }
  }

  const db = firestore;

  const getDocument = async () => {
    const docRef = doc(db, "jobs", id);
    const docSnap = await getDoc(docRef);
    setJob(docSnap.data());
    if (docSnap.data().company) {
      const companyRef = docSnap.data().company;
      const companySnap = await getDoc(companyRef);
      setCompanyData(companySnap.data());
    }
  };

  useEffect(() => {
    getDocument();
    handleUserType();
  }, []);
  const sendMail = (event) => {
    const message =
      "Sie haben eine neue Bewerbung für die Stelle: \n " +
      job.name +
      "\n erhalten von " +
      currentUser.email +
      ". Die Bwerbungsunterlagen befinden sich im Anhang. \n" +
      "Der/Die Bewerber/in hat folgende Anmerkung für Sie hinterlassen: \n" +
      notes;
    const subject = "Bewerbung für " + job.name + " von " + currentUser.email;
    //Make zip file from fileList
    const JSZip = require("jszip");
    const zip = new JSZip();

    fileList.forEach((file) => {
      zip.file(file.name, file);
    });
    console.log(fileList);
    zip.generateAsync({ type: "blob" }).then(function (content) {
      const zipFile = new File([content], "Bewerbungsunerlagen.zip");

      var reader = new FileReader();
      reader.readAsBinaryString(zipFile);
      reader.onload = function () {
        var dataUri = "data:" + zipFile.type + ";base64," + btoa(reader.result);

        const config = {
          Username: "application.startupjobs@gmail.com",
          Password: "824688B880B99BB4A04E0A2088108AC75B7F",
          Host: "smtp.elasticemail.com",
          Port: 2525,
          To: "lukas.preidt@startstuttgart.org",
          From: "application.startupjobs@gmail.com",
          Subject: subject,
          Body: message,
          Attachments: [
            {
              name: zipFile.name,
              data: dataUri,
            },
          ],
        };
        if (window.Email) {
          console.log("Email is available");
          window.Email.send(config);
          setLoading(true);
          setSuccess(true);
          setLoading(false);
          console.log(message);
        } else {
          console.log("Email is not available");
        }
      };
    });
  };
  if (currentUser === null) {
    return (
      <>
        <Navigate to="/start-jobs/userlogin" />;
      </>
    );
  }
  if (loading) {
    return <div>Laden</div>;
  }
  if (success) {
    return (
      <>
        <UserSucceed type="application" />
      </>
    );
  } else {
    return (
      <div className={styles.container}>
        <h2 className={styles.head}>
          {job?.name} @ {companyData?.name}
        </h2>
        <p>{job?.description}</p>
        <h3> Qualifikationen</h3>
        {job?.qualifications &&
          job?.qualifications.map((q) => <li key={q}>{q}</li>)}
        <h3> Benötigte Unterlagen</h3>
        {job?.documents && job?.documents.map((d) => <li key={d}>{d}</li>)}
        <h3> Bemerkungen</h3>
        <Input.TextArea
          placeholder="Deine Nachricht an den Recruiter"
          onChange={handleNotes()}
        />
        <h3> Unterlagen hochladen</h3>
        <PdfUploader setFileList={setFileList} />
        <div className={styles.button}>
          <Button type="primary" onClick={sendMail}>
            Bewerbung abschicken
          </Button>
        </div>
      </div>
    );
  }
}
