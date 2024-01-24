import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/App.module.scss";
export function JobTeaser(props) {
  if (props.for === "company") {
    return (
      <div className={styles.tile}>
        <Link to={`/start-jobs/editjob/${props.id}`}>
          <h3 className={styles.jobhead}>{props.bezeichnung}</h3>
        </Link>
        <div className={styles.jobbody}>
          <p>
            <strong>💼 Art:</strong> {props.type}
          </p>
          <p>
            <strong>🏢 Firma:</strong> {props.firma}
          </p>
          <p>
            <strong>📍 Standort:</strong> {props.standort}
          </p>
          <p>
            <strong>📅 Veröffentlicht:</strong>{" "}
            {props?.createdAt?.toDate().toLocaleDateString()}
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.tile}>
        <Link to={`/start-jobs/jobs/${props.id}`}>
          <h3 className={styles.jobhead}>{props.bezeichnung}</h3>
        </Link>
        <div className={styles.jobbody}>
          <p>
            <strong>💼 Art:</strong> {props.type}
          </p>
          <p>
            <strong>🏢 Firma:</strong> {props.firma}
          </p>
          <p>
            <strong>📍 Standort:</strong> {props.standort}
          </p>
          <p>
            <strong>📅 Veröffentlicht:</strong>{" "}
            {props?.createdAt?.toDate().toLocaleDateString()}
          </p>
        </div>
      </div>
    );
  }
}
