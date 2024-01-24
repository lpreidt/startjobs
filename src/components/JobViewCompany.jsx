import React from "react";
import styles from "../styles/Jobviewjob.module.scss";
import { Timelinee } from "./Timelinee";
export function JobViewCompany(props) {
  return (
    <div className={styles.tiler}>
      <div className={styles.companyinfo}>
        <h2>Die Firma: </h2>
        <img height="70px" src={props.companyData?.picture} />
        <h3>{props.companyData?.name}</h3>
        <h4>Website</h4>
        <a href={props.companyData?.website}>{props.companyData?.website}</a>
        <h4>Anzahl Mitarbeiter: </h4>
        <p>{props.companyData?.employee_count}</p>
        <h4>Geschäftsmodell</h4>
        <p>{props.companyData?.business_model}</p>
        <h4>Meilensteine</h4>
        <Timelinee steps={props.companyData?.history} />
      </div>
    </div>
  );
}
