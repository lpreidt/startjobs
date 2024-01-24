import React from "react";

import { JobTeaser } from "./JobTeaser";
import styles from "../styles/App.module.scss";
import { firestore } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";

import { useEffect } from "react";
import { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Input, Select } from "antd";

export function Jobs() {
  const db = firestore;
  const [jobsWithCompanies, setJobsWithCompanies] = useState([]);
  const [sjobData, ssetJobData] = useState({});
  const [scompanyData, ssetCompanyData] = useState({});
  const [filterLocation, setFilterLocation] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterCompany, setFilterCompany] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState([]);
  const [types, setTypes] = useState([]);
  const [companies, setCompanies] = useState([]);

  const { Option } = Select;

  const fetchData = async () => {
    setLoading(true);
    const jobsRef = collection(db, "jobs");
    const jobs = [];
    const snapshot = await getDocs(jobsRef).then((querySnapshot) => {
      querySnapshot.forEach(async (dok) => {
        const jobId = dok.id;
        const jobData = dok.data();
        const companyId = jobData.company?.id;
        try {
          const companyDocRef = doc(db, "companies", companyId);
          const companyDoc = await getDoc(companyDocRef);
          const companyData = companyDoc.data();
          ssetJobData(jobData);
          jobs.push({ id: jobId, job: jobData, companyData });
        } catch (error) {
          console.log("Jobs.jsx: ", "Line: 47");
        }
      });
      setJobsWithCompanies(jobs);
      setLoading(false);
    });
  };
  const setFilters = () => {
    const locations = [
      ...new Set(jobsWithCompanies.map((o) => o.job?.location)),
    ];
    setLocations(locations);
    const types = [...new Set(jobsWithCompanies.map((o) => o.job?.type))];
    setTypes(types);
    const companies = [
      ...new Set(jobsWithCompanies.map((o) => o.companyData?.name)),
    ];
    setCompanies(companies);
  };

  // Filterfunktion für Location und Type
  const filteredJobs = jobsWithCompanies.filter((o) => {
    // Überprüfen, ob der Location-Filter gesetzt ist und der Standort des Jobs mit dem Filterwert übereinstimmt
    if (filterLocation && o.job?.location !== filterLocation) {
      return false;
    }
    // Überprüfen, ob der Type-Filter gesetzt ist und der Type des Jobs mit dem Filterwert übereinstimmt
    if (filterType && o.job?.type !== filterType) {
      return false;
    }
    // Überprüfen, ob der Company-Filter gesetzt ist und der Company des Jobs mit dem Filterwert übereinstimmt
    if (filterCompany && o.companyData?.name !== filterCompany) {
      return false;
    }
    if (
      searchTerm &&
      !o.job?.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    return true;
  });
  // Sort function based on sortOrder
  const sortedJobs = filteredJobs.sort((a, b) => {
    if (sortOrder === "newest") {
      return (
        new Date(b.job?.created_at.toDate()) -
        new Date(a.job?.created_at.toDate())
      );
    } else {
      return (
        new Date(a.job?.created_at.toDate()) -
        new Date(b.job?.created_at.toDate())
      );
    }
  });

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    setFilters();
  }, [sjobData]);
  if (loading) {
    return (
      <div>
        <LoadingOutlined
          style={{
            fontSize: 60,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        />
      </div>
    );
  }
  return (
    <div>
      <h2 className={styles.greeting}>Aktuelle Startup-jobs:</h2>
      <div className={styles.searchAndFilter}>
        <div className={styles.search}>
          {/* Search input field */}
          <Input
            style={{ width: "20%" }}
            type="text"
            placeholder="Search by Job Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className={styles.filter}>
          {/* Dropdown menu for Location filter */}
          <Select
            className={styles.locationFilter}
            value={filterLocation}
            onChange={(value) => setFilterLocation(value)}
          >
            <Option value="">Filter by Location</Option>
            {locations.map((location) => (
              <Option key={location} value={location}>
                {location}
              </Option>
            ))}
          </Select>
          {/* Dropdown menu for Type filter */}
          <Select
            className={styles.typeFilter}
            value={filterType}
            onChange={(value) => setFilterType(value)}
          >
            <Option value="">Filter by Type</Option>
            {types.map((type) => (
              <Option key={type} value={type}>
                {type}
              </Option>
            ))}
          </Select>
          {/* Dropdown menu for Company filter */}
          <Select
            className={styles.companyFilter}
            value={filterCompany}
            onChange={(value) => setFilterCompany(value)}
          >
            <Option value="">Filter by Company</Option>
            {companies.map((company) => (
              <Option key={company} value={company}>
                {company}
              </Option>
            ))}
          </Select>
          <Select
            className={styles.sortFilter}
            value={sortOrder}
            onChange={(value) => setSortOrder(value)}
          >
            <Option value="newest">Newest</Option>
            <Option value="oldest">Oldest</Option>
          </Select>
        </div>
      </div>
      <ul>
        {sortedJobs.map((o) => (
          <JobTeaser
            key={o?.id}
            id={o?.id}
            bezeichnung={o.job?.name}
            standort={o.job?.location}
            type={o.job.type}
            firma={o.companyData?.name}
            createdAt={o.job.created_at}
          />
        ))}
      </ul>
    </div>
  );
}
