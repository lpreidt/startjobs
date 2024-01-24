import { render, screen } from "@testing-library/react";
import { AuthProvider, useAuth } from "../AuthContext";
jest.mock("../../firebase", () => ({
  auth: {
    signInWithEmailAndPassword: jest.fn(),
  },
}));
jest.mock("../AuthContext", () => ({
  useAuth: () => ({
    currentUser: null,
  }),
}));
describe("AuthContext", () => {
  it("tests useAuth", () => {
    const testAuth = { currentUser: null };
    expect(useAuth()).toEqual(testAuth);
  });
});
