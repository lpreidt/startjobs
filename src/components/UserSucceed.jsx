import React from "react";
import { Button, Result } from "antd";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { useState } from "react";

export function UserSucceed(props) {
  if (props.type === "application") {
    return (
      <div>
        <Result
          status="success"
          title="Herzlichen Glückwunsch"
          subTitle="Deine Bewerbung wurde erfolgreich gesendet 🎉"
          extra={[
            <Link to="/start-jobs/">
              <Button key="home" type="primary">
                {" "}
                Home
              </Button>
            </Link>,
          ]}
        />
      </div>
    );
  } else {
    return (
      <div>
        <Result
          status="success"
          title="Wilkommen"
          subTitle="Dein Useraccount wurde erfolgreich angelegt 🎉"
          extra={[
            <Link to="/start-jobs/">
              <Button key="home" type="primary">
                {" "}
                Home
              </Button>
            </Link>,
          ]}
        />
      </div>
    );
  }
}
