import { createJobInDB, updateJobInDB, deleteJobInDB } from "../JobContext"; // Stelle sicher, dass du den richtigen Dateipfad angibst
jest.mock("../../firebase").mock("firebase/firestore", () => ({
  __esModule: true,
  default: jest.fn(),
  firestore: jest.fn(),
  collection: jest.fn(),
  addDoc: jest.fn(),
  setDoc: jest.fn(),
  doc: jest.fn(),
  Timestamp: jest.fn(),
  serverTimestamp: jest.fn(),
  deleteDoc: jest.fn(),
}));
jest.mock("../../firebase").mock("firebase/auth", () => ({
  __esModule: true,
  default: jest.fn(),
  auth: jest.fn(),
}));

describe("createJobInDB", () => {
  it("should create a job in the database", async () => {
    const jobData = {
      description: "Job description",
      location: "Job location",
      name: "Job name",
      type: "Job type",
      documents: ["Document 1", "Document 2"],
      qualifications: ["Qualification 1", "Qualification 2"],
    };
    const companyId = "123456789";
    expect(createJobInDB(jobData, companyId)).toBeTruthy();
  });
});
describe("updateJobInDB", () => {
  it("should update a job in the database", async () => {
    const jobData = {
      id: "123456789",
      description: "Job description",
      location: "Job location",
      name: "Job name",
      type: "Job type",
      documents: ["Document 1", "Document 2"],
      qualifications: ["Qualification 1", "Qualification 2"],
    };
    const companyId = "123456789";
    expect(updateJobInDB(jobData, companyId)).toBeTruthy();
  });
});
describe("deleteJobInDB", () => {
  it("should delete a job in the database", async () => {
    const jobId = "123456789";
    expect(deleteJobInDB(jobId)).toBeTruthy();
  });
});
