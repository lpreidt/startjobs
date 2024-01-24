import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { firestore } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { async } from "@firebase/util";
import { useEffect } from "react";
import styles from "../styles/Jobview.module.scss";
import { Timelinee } from "./Timelinee";
import { JobViewJob } from "./JobViewJob";
import { JobViewCompany } from "./JobViewCompany";
import { Button } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { DeleteOutlined } from "@ant-design/icons";
import { useAuth } from "../contexts/AuthContext";
import { c } from "docker/src/languages";
import { addToSavedJobs, removeFromSavedJobs } from "../contexts/UserContext";
import { LoadingOutlined } from "@ant-design/icons";
export function JobView(props) {
  let { id } = useParams();
  const [job, setJob] = useState({});
  const [companyData, setCompanyData] = useState({});
  const [save, setSave] = useState(false);
  const [user, setUser] = useState({});
  const [userType, setUserType] = useState("");
  const [buttonstyle, setButtonstyle] = useState({
    style: styles.saveButtonNot,
    text: "Job speichern",
  });
  const [loading, setLoading] = useState(false);
  //sha
  const db = firestore;
  const { currentUser } = useAuth();
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
  const getDocument = async () => {
    setLoading(true);
    const docRef = doc(db, "jobs", id);
    const docSnap = await getDoc(docRef);
    setJob(docSnap.data());
    if (docSnap.data().company) {
      const companyRef = docSnap.data().company;
      const companySnap = await getDoc(companyRef);
      setCompanyData(companySnap.data());
      console.log(companyData.name);
      setLoading(false);
    }
    console.log(docSnap.id, " => ", docSnap.data());
    const userRef = doc(db, "users", currentUser.uid);
    const userSnap = await getDoc(userRef);
    setUser(userSnap.data());
    console.log(userSnap.id, " => ", userSnap.data());
  };
  const getSavedStatus = async () => {
    const userRef = doc(db, "users", currentUser.uid);
    const userSnap = await getDoc(userRef);
    setUser(userSnap.data());
    console.log(userSnap.id, " => ", userSnap.data());
    if (userSnap.data().savedJobs.includes(id)) {
      console.log("Enthält Job");
      setSave(true);
      setButtonstyle({
        style: styles.saveButtonSave,
        text: "Job entfernen ",
      });
    } else {
      setSave(false);
      setButtonstyle({
        style: styles.saveButtonNot,
        text: "Job speichern ",
      });
    }
  };
  const handleSavedStatus = async () => {
    if (save === false) {
      setButtonstyle({
        style: styles.saveButtonNot,
        text: "Job speichern ",
      });
      setLoading(true);
      removeFromSavedJobs(currentUser, id).then(() => {
        setLoading(false);
      });

      setLoading(false);
    } else {
      setButtonstyle({
        style: styles.saveButtonSave,
        text: "Job entfernen ",
      });
      addToSavedJobs(currentUser, id);
      console.log(user.savedjobs);
    }
  };
  const handleClick = () => {
    setSave(!save);

    console.log(save, buttonstyle.text);
  };

  useEffect(() => {
    getDocument();
    getSavedStatus();
    handleUserType();
  }, []);
  useEffect(() => {
    handleSavedStatus();
  }, [save]);

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
  if (userType === "user") {
    return (
      <>
        <div className={styles.head}>
          <h2>{job?.name}</h2>

          <button className={buttonstyle.style} onClick={handleClick}>
            {buttonstyle.text}

            {!save && <PlusCircleOutlined />}
            {save && <DeleteOutlined />}
          </button>
        </div>
        <div className={styles.container}>
          <JobViewJob job={job} />
          <JobViewCompany companyData={companyData} />
        </div>
        <div className={styles.container2}>
          <Link to="apply">
            <Button type="primary" className={styles.applyBtn}>
              Jetzt bewerben
            </Button>
          </Link>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className={styles.head}>
          <h2>{job?.name}</h2>
        </div>
        <div className={styles.container}>
          <JobViewJob job={job} />
          <JobViewCompany companyData={companyData} />
        </div>
        <div className={styles.container2}>
          <Link className={styles.link} to="apply">
            <Button type="primary" className={styles.applyBtn}>
              Jetzt bewerben
            </Button>
          </Link>
        </div>
      </>
    );
  }
}
