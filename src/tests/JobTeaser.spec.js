import { JobTeaser } from "../components/JobTeaser";
import React from "react";
import { render } from "@testing-library/react";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import { MemoryRouter } from "react-router-dom";
jest.mock("../firebase", () => ({
  auth: null,
}));
jest.mock("../contexts/AuthContext", () => ({
  useAuth: () => ({
    currentUser: null,
  }),
}));
window.matchMedia = () => ({
  matches: false,
  addListener: () => {},
  removeListener: () => {},
});
describe("JobTeaser", () => {
  it("renders without crashing", () => {
    const job = {
      id: "1",
      title: "Job Title",
      description: "Job Description",
      company: "Job Company",
      qualifications: ["Job Qualification 1", "Job Qualification 2"],
      locationbar: "Job Location",
    };
    render(
      React.createElement(
        MemoryRouter,
        null,
        React.createElement(JobTeaser, { job: job })
      )
    );
  });
});
