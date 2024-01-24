import React from "react";
import { Button } from "antd";
import { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { firestore } from "../firebase";
import styles from "../styles/ManageJobs.module.scss";
import { Empty } from "antd";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { JobTeaser } from "./JobTeaser";
import { Link, Navigate } from "react-router-dom";
import { filter } from "jszip";

export default function ManageJobs() {
  const [jobData, setJobData] = useState([]);
  const [companyData, setCompanyData] = useState([]);
  const [uniqueJobs, setUniqueJobs] = useState([]);
  const [isAvailable, setIsAvailable] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [user, setUser] = useState({});
  const [userType, setUserType] = useState("");
  const db = firestore;
  const { currentUser } = useAuth();
  async function handleUserType() {
    if (currentUser) {
      const docRef = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserType("user");
      } else {
        setUserType("company");
      }
    }
  }

  const getUser = async () => {
    const docRef = doc(db, "users", currentUser.uid);
    const docSnap = await getDoc(docRef);
    await setUser(docSnap.data());
  };
  const makeEntriesUnique = (arr) => {
    const uniqueArray = [];
    const uniqueSet = new Set();

    arr.forEach((obj) => {
      const objString = JSON.stringify(obj);
      if (!uniqueSet.has(objString)) {
        uniqueSet.add(objString);
        uniqueArray.push(obj);
      }
    });

    return uniqueArray;
  };
  useEffect(() => {
    getUser();
  }, [currentUser]);
  useEffect(() => {
    handleUserType();
  }, [currentUser]);
  useEffect(() => {
    fetchData();
  }, [user]);
  const fetchData = async () => {
    const jobsRef = collection(db, "jobs");
    const snapshot = await getDocs(jobsRef);

    snapshot.forEach(async (dok) => {
      if (currentUser.uid === dok.data().company.id) {
        const jobId = dok.id;
        const jobData = dok.data();
        const companyId = jobData.company.id;
        const companyDocRef = doc(db, "companies", companyId);
        const companyDoc = await getDoc(companyDocRef);
        const companyData = companyDoc.data();
        setJobData(jobData);
        setCompanyData(companyData);

        jobs.push({ id: jobId, job: jobData, companyData });
      }
      setIsAvailable(true);
      console.log(jobs);
      //setUniqueJobs(...new Set(jobs.map((o) => o.job?.id)));

      if (jobs.length === 0) {
        setIsAvailable(false);
      } else {
        setIsAvailable(true);
      }
    });
  };
  if (!isAvailable) {
    return (
      <div>
        <h2 className={styles.h2}>Jobs verwalten</h2>
        <Link to="/start-jobs/createjob">
          <Button className={styles.addBtn} type="primary">
            Job hinzufügen
          </Button>
        </Link>
        <Empty className={styles.empty} />
      </div>
    );
  } else {
    return (
      <div>
        <h2 className={styles.h2}>Jobs verwalten</h2>
        <Link to="/start-jobs/createjob">
          <Button className={styles.addBtn} type="primary">
            Job hinzufügen
          </Button>
        </Link>
        <div>
          <ul>
            {makeEntriesUnique(jobs).map((o) => (
              <JobTeaser
                for="company"
                key={o?.id}
                id={o.id}
                bezeichnung={o.job?.name}
                standort={o.job?.location}
                type={o.job?.type}
                firma={o.companyData?.name}
                createdAt={o.job?.created_at}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
