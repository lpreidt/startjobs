import React, { useState, useEffect } from "react";
import { DownOutlined } from "@ant-design/icons";
import styles from "../styles/App.module.scss";
import { Dropdown, Space, Modal } from "antd";
import { Login } from "./UserLogin";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase";

export function AccountAction(props) {
  const [text, setText] = useState();
  const { currentUser } = useAuth();
  const [user, setUser] = useState({});
  const [userItems, setUserItems] = useState([]);
  const [companyItems, setCompanyItems] = useState([]);
  const [publicItems, setPublicItems] = useState([]);
  const [items, setItems] = useState([]);
  const [company, setCompany] = useState({});
  const [userType, setUserType] = useState("");

  const db = firestore;

  async function handleUserType() {
    if (currentUser) {
      const docRef = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserType("user");
        //console.log("Das ist ein User");
      } else {
        setUserType("company");
      }
    }
  }

  async function handleText() {
    if (currentUser && userType === "user") {
      const docRef = doc(db, "users", currentUser.uid);

      const docSnap = await getDoc(docRef);
      await setUser(docSnap.data());
      setText(user.firstName + " " + user.lastName);

      //setText(user.firstName + " " + user.lastName);
    }
    if (currentUser && userType === "company") {
      const docRef = doc(db, "companies", currentUser.uid);
      const docSnap = await getDoc(docRef);
      await setCompany(docSnap.data());
      setText(company.name);

      //setText(user.firstName + " " + user.lastName);
    }
    if (!currentUser) {
      setText("Account");
      console.log("Kein User");
    }
  }

  useEffect(() => {
    handleText();
    handleItems();
    handleUserType();
  }, [user, currentUser, company, userType]);

  function handleItems() {
    // console.log("ACCOUNT ACTION_" + userType);
    if (currentUser && userType === "user") {
      setItems([
        {
          key: "1",
          label: <Link to="/start-jobs/edituser">Account Optionen</Link>,
        },
        {
          key: "2",
          label: <Link to="/start-jobs/myjobs">Meine Jobs</Link>,
        },
        {
          key: "3",
          label: <Link to="/start-jobs/logout">Ausloggen</Link>,
        },
      ]);
    }
    if (currentUser && userType === "company") {
      setItems([
        {
          key: "1",
          label: <Link to="/start-jobs/editcompany">Account Optionen</Link>,
        },
        {
          key: "2",
          label: <Link to="/start-jobs/managejobs">Jobs verwalten</Link>,
        },
        {
          key: "3",
          label: <Link to="/start-jobs/logout">Ausloggen</Link>,
        },
      ]);
    }
    if (!currentUser) {
      setItems([
        {
          key: "1",
          type: "group",
          label: "Login Optionen",
          children: [
            {
              key: "1-1",
              label: <Link to="/start-jobs/userlogin">Login als Nutzer</Link>,
            },
            {
              key: "1-2",
              label: (
                <Link to="/start-jobs/companylogin">Login als Unternehmen</Link>
              ),
            },
          ],
        },
        {
          key: "2",
          label: "Account erstellen",
          children: [
            {
              key: "2-1",
              label: (
                <Link to="/start-jobs/createuser">User Account erstellen</Link>
              ),
            },
            {
              key: "2-2",
              label: (
                <Link to="/start-jobs/createcompany">
                  Unternehmen Account erstellen
                </Link>
              ),
            },
          ],
        },
      ]);
    }
  }

  return (
    <div>
      <Dropdown menu={{ items }}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            {text}
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </div>
  );
}
