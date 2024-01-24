import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import { Jobs } from "./Jobs";
import { JobView } from "./JobView";
import { UserLogin } from "./UserLogin";
import { Logout } from "./Logout";

import styles from "../styles/App.module.scss";
import { Select } from "antd";
import { useState } from "react";
import { AccountAction } from "./AccountAction";
import { CreateUser } from "./CreateUser";
import { UserSucceed } from "./UserSucceed";
import { CompanySucceeded } from "./CompanySucceeded";
import { CompanyLogin } from "./CompanyLogin";
import { MyJobs } from "./MyJobs";

import { AuthProvider } from "../contexts/AuthContext";
import { CreateCompany } from "./CreateCompany";
import { EditUser } from "./EditUser";
import { ForgotPassword } from "./ForgotPassword";
import { Apply } from "./Apply";
import { EditCompany } from "./EditCompany";
import ManageJobs from "./ManageJobs";
import { EditJob } from "./EditJob";
import { CreateJob } from "./CreateJob";

export function RoutingApp() {
  const id = 0;

  return (
    <AuthProvider>
      <BrowserRouter>
        <header>
          <h1 className={styles.head}>🚀STARTup Jobs</h1>
          <nav className={styles.nav}>
            <Link to="/start-jobs/">Home</Link>
            &nbsp;
            <Link to="/start-jobs/jobs">Jobs</Link>
            &nbsp;
            <AccountAction />
          </nav>

          <hr></hr>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/start-jobs/" element={<Home />} />

            <Route path="/start-jobs/jobs" element={<Jobs />} />
            <Route path="/start-jobs/jobs/:id" element={<JobView />} />

            <Route path="/start-jobs/jobs/:id/apply" element={<Apply />} />
            <Route path="/start-jobs/userlogin" element={<UserLogin />} />
            <Route path="/start-jobs/companylogin" element={<CompanyLogin />} />
            <Route path="/start-jobs/createuser" element={<CreateUser />} />
            <Route
              path="/start-jobs/createcompany"
              element={<CreateCompany />}
            />
            <Route
              path="/start-jobs/usersubmitsucceed"
              element={<UserSucceed />}
            />
            <Route path="/start-jobs/myjobs" element={<MyJobs />} />
            <Route
              path="/start-jobs/companysubmitsucceed"
              element={<CompanySucceeded />}
            />
            <Route path="/start-jobs/managejobs" element={<ManageJobs />} />
            <Route path="/start-jobs/createjob" element={<CreateJob />} />
            <Route path="/start-jobs/editjob/:id" element={<EditJob />} />
            <Route path="/start-jobs/logout" element={<Logout />} />
            <Route path="/start-jobs/edituser" element={<EditUser />} />
            <Route path="/start-jobs/editcompany" element={<EditCompany />} />
            <Route
              path="/start-jobs/forgotpassword"
              element={<ForgotPassword />}
            />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}
