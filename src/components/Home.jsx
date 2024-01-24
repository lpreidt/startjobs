import React from "react";
import styles from "../styles/App.module.scss";

import { Button } from "antd";
import { Link } from "react-router-dom";
import { Carousel } from "antd";

export function Home() {
  const contentStyle = {
    height: "160px",
    color: "black",
    lineHeight: "160px",
    textAlign: "center",
    background: "white",
  };
  return (
    <>
      <h2 className={styles.greeting}> Wilkommen auf unserem Jobportal!</h2>

      <div className={styles.willkommen}>
        <Carousel autoplay>
          <div>
            <h3 className={styles.carusel}>STARTup Jobs</h3>
          </div>
          <div>
            <h3 className={styles.carusel}> Finde deinen Traumjob!</h3>
          </div>
          <div>
            <h3 className={styles.carusel}>
              Lerne lokale Startups und globale Player kennen!
            </h3>
          </div>
          <div>
            <h3 className={styles.carusel}>STARTe jetzt durch!</h3>
          </div>
        </Carousel>
        <div className={styles.actionButtons}>
          <Link className={styles.link} to="/start-jobs/jobs">
            <Button className={styles.zuDenJobs}>Zu den Jobs</Button>
          </Link>

          <Link className={styles.link} to="/start-jobs/userlogin">
            <Button type="primary" className={styles.zumLogin}>
              Login
            </Button>
          </Link>
        </div>
        <div className={styles.greeting}>
          <div className={styles.landingText}>
            <h4 className={styles.greeting}>
              Willkommen bei STARTupjobs.de - der Plattform für die besten
              Startup-Jobs in Deutschland!
            </h4>
            <p>
              Als Startup-Enthusiasten wissen wir, wie schwierig es sein kann,
              einen Job in einem aufstrebenden Unternehmen zu finden, das zu dir
              und deinen Karrierezielen passt. Deshalb haben wir STARTupjobs.de
              ins Leben gerufen - um es talentierten und motivierten Menschen
              wie dir zu erleichtern, die neuesten und besten Jobs in der
              aufregenden Welt der Startups zu finden.
            </p>
            <p>
              Unser Ziel ist es, dir den Einstieg in die Startup-Branche zu
              erleichtern, indem wir eine Plattform bieten, auf der du
              Jobangebote von den innovativsten und spannendsten Unternehmen
              Deutschlands finden kannst. Egal, ob du nach einem Praktikum,
              einem Vollzeitjob oder einer freiberuflichen Tätigkeit suchst, wir
              haben die passenden Angebote für dich.
            </p>
            <ul>
              <li>
                Deinen Traumjob finden: Finde eine Stelle, die perfekt zu deinen
                Fähigkeiten und Interessen passt, und starte deine Karriere in
                der aufregenden Welt der Startups.
              </li>
              <li>
                Dich mit den besten Unternehmen Deutschlands vernetzen: Entdecke
                spannende neue Unternehmen und arbeite mit den innovativsten
                Köpfen der Branche zusammen.
              </li>
              <li>
                Dich auf deine Zukunft vorbereiten: Erhalte wertvolle Einblicke
                in die Arbeitskultur und das Arbeitsumfeld von Startups und
                entwickle die Fähigkeiten, die du für deine Karriere brauchst.
              </li>
            </ul>
            <p>
              Also, worauf wartest du noch? Registriere dich noch heute bei
              STARTupjobs.de und finde deinen nächsten Job in der
              Startup-Branche!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
