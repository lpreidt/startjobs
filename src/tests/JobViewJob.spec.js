import { JobViewJob } from "../components/JobViewJob";
import { render, fireEvent, getByTitle } from "@testing-library/react";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import { MemoryRouter } from "react-router-dom";
jest.mock("../firebase", () => ({
  auth: {
    signInWithEmailAndPassword: jest.fn(),
  },
}));
describe("JobViewJob", () => {
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
      <MemoryRouter>
        <JobViewJob job={job} />
      </MemoryRouter>
    );
  });
});
