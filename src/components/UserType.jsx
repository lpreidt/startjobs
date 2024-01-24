import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { firestore } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
export function UserType(props) {
  const [type, setType] = useState("");
  const { currentUser } = useAuth();
  const id = currentUser?.uid;
  //hjahsj

  const handleUserType = async () => {
    if (id || props?.inIf === true) {
      const db = firestore;
      const userDocRef = doc(db, "users", id);
      const companyDocRef = doc(db, "companies", id);

      const userDocSnap = await getDoc(userDocRef);
      const companyDocSnap = await getDoc(companyDocRef);

      if (userDocSnap.exists() || props?.userExists === true) {
        setType("user");

        props.setType(type);
      }
      if (companyDocSnap.exists() || props?.companyExists === true) {
        setType("company");
        props.setType(type);
      }
    }
  };

  useEffect(() => {
    handleUserType();
  }, [currentUser, type]);

  return <></>;
}
