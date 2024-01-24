import React from "react";
import { JobTeaser } from "./JobTeaser";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase";
import { useState } from "react";
import { Empty } from "antd";
import styles from "../styles/MyJobs.module.scss";

export function MyJobs() {
  const { currentUser } = useAuth();
  const [user, setUser] = useState({});
  const [jobs, setJobs] = useState([]);
  const [uniqueJobs, setUniqueJobs] = useState([]);
  const [jobData, setJobData] = useState({});
  const [companyData, setCompanyData] = useState({});
  const [company, setCompany] = useState({});
  const [jobsWithCompanies, setJobsWithCompanies] = useState([]);
  const [isAvailable, setIsAvailable] = useState(true);

  const db = firestore;

  const getUser = async () => {
    const docRef = doc(db, "users", currentUser.uid);
    const docSnap = await getDoc(docRef);
    await setUser(docSnap.data());
  };

  const fetchData = async () => {
    const jobsRef = collection(db, "jobs");
    const snapshot = await getDocs(jobsRef);

    snapshot.forEach(async (dok) => {
      const jobId = dok.id;
      const jobData = dok.data();
      const companyId = jobData.company.id;
      const companyDocRef = doc(db, "companies", companyId);
      const companyDoc = await getDoc(companyDocRef);
      const companyData = companyDoc.data();
      setJobData(jobData);
      setCompanyData(companyData);
      if (user.savedJobs?.includes(jobId)) {
        jobs.push({ id: jobId, job: jobData, companyData });
        //make entries of array unique
        setUniqueJobs([...new Set(jobs)]);
        setIsAvailable(true);
        console.log(jobs);
      }
      if (user.savedJobs?.length === 0 || user.savedJobs === null) {
        setIsAvailable(false);
      } else {
        setIsAvailable(true);
      }
    });
  };

  useEffect(() => {
    getUser();
  }, [currentUser]);
  useEffect(() => {
    fetchData();
    console.log(jobs);
  }, [user]);
  if (isAvailable) {
    return (
      <div>
        <h2 className={styles.head}>Deine gespeicherten Jobs</h2>

        <div>
          <ul>
            {uniqueJobs.map((o) => (
              <JobTeaser
                key={o.id}
                id={o.id}
                bezeichnung={o.job?.name}
                standort={o.job?.location}
                type={o.job.type}
                firma={o.companyData?.name}
                createdAt={o.job.created_at}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
  if (!isAvailable) {
    return (
      <div>
        <h1 className={styles.head}>Deine gespeicherten Jobs</h1>
        <Empty className={styles.empty} />
      </div>
    );
  }
}
