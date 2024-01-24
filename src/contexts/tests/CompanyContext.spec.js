import { createCompanyInDB } from "../CompanyContext";
import { collection, getDoc, addDoc, setDoc, doc } from "firebase/firestore";

jest.mock("../../firebase").mock("firebase/firestore", () => ({
  doc: () => {},
  getDoc: async () => ({
    exists: () => true,
  }),
  setDoc: async () => {},
  updateDoc: async () => {},
  arrayUnion: () => {},
  arrayRemove: () => {},
}));
describe("createCompanyInDB", () => {
  it("should create a company in DB", async () => {});
  const user = {
    uid: "123456789",
  };
  const companyData = {
    email: "abcc@web.de",
    employee_count: "100",
    history: "history",
    location: "location",
    name: "name",
    picture: "picture",
    website: "website",
    business_model: "business_model",
  };
  expect(createCompanyInDB(user, companyData)).toBeTruthy();
});
