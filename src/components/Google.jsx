import { Button } from "antd";
import styles from "../styles/Google.module.scss";
import React, { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { createUserInDB, userIsInDB } from "../contexts/UserContext";
import {
  doc,
  setDoc,
  getDoc,
  connectFirestoreEmulator,
} from "firebase/firestore";
import { auth } from "../firebase";
import { Navigate } from "react-router-dom";
import { firestore } from "../firebase";

export function GoogleSignup() {
  const { signInWithGoogle } = useAuth();
  const [created, setCreated] = useState(false);

  function performSignIn() {
    signInWithGoogle().then(async () => {
      const user = auth.currentUser;
      const db = firestore;
      console.log("User is not in DB", userIsInDB(user));
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        console.log("Bin hier drinnen");

        createUserInDB(user, user?.displayName, "", user?.email);

        setCreated(true);
      } else {
        console.log("Else");
        setCreated(true);
      }
    });
  }

  if (created) {
    return <Navigate to="/start-jobs/"></Navigate>;
  } else {
    return (
      <button
        title="perform"
        className={styles.loginGoogleBtn}
        onClick={performSignIn}
      >
        {" "}
        Weiter mit Google
      </button>
    );
  }
}
