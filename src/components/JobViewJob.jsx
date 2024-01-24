import React from "react";
import styles from "../styles/Jobviewjob.module.scss";
export function JobViewJob(props) {
  return (
    <div className={styles.tilel}>
      <div className={styles.jobinfo}>
        <h2>Der Job: </h2>
        <h3>Ort: </h3>
        {props.job?.location}
        <h3>Beschreibung</h3>
        <p>{props.job?.description}</p>
        <h3>Qualifikationen</h3>
        {props.job?.qualifications &&
          props.job?.qualifications.map((q) => <li key={q}>{q}</li>)}
      </div>
    </div>
  );
}
