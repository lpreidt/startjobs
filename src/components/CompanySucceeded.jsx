import React from "react";
import { Button, Result } from "antd";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

export function CompanySucceeded() {
  return (
    <div>
      <Result
        status="success"
        title="Wilkommen"
        subTitle="Dein Firmenacccount wurde erfolgreich angelegt 🎉"
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
