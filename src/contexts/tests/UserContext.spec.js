import {
  userIsInDB,
  createUserInDB,
  addToSavedJobs,
  removeFromSavedJobs,
} from "../UserContext";
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
describe("userIsInDB", () => {
  it("should return true if user is in DB", async () => {
    // const docSpy = jest.spyOn(firebase, "doc").mockImplementation

    const user = {
      uid: "123456789",
    };

    expect(userIsInDB(user)).toBeTruthy();
  });
});
describe("createUserInDB", () => {
  it("should create a user in DB", async () => {});
  const user = {
    uid: "123456789",
  };
  const firstName = "Max";
  const lastName = "Mustermann";
  const email = "mm@gmail.com";

  expect(createUserInDB(user, firstName, lastName, email)).toBeTruthy();
});

describe("addToSavedJobs", () => {
  it("should add a job to savedJobs", async () => {});
  const user = {
    uid: "123456789",
  };
  const id = "123456789";

  expect(addToSavedJobs(user, id)).toBeTruthy();
});

describe("removeFromSavedJobs", () => {
  it("should remove a job from savedJobs", async () => {});
  const user = {
    uid: "123456789",
  };
  const id = "123456789";

  expect(removeFromSavedJobs(user, id)).toBeTruthy();
});
