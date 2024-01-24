import React from "react";
import { render } from "@testing-library/react";
import { GoogleSignup } from "../components/Google";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import { MemoryRouter } from "react-router-dom";

jest.mock("../firebase", () => ({
  auth: {
    signInWithPopup: jest.fn(),
  },
}));
jest.mock("../contexts/AuthContext", () => ({
  useAuth: () => ({
    currentUser: null,
    signInWithGoogle: jest.fn(),
  }),
}));

window.matchMedia = () => ({
  matches: false,
  addListener: () => {},
  removeListener: () => {},
});

describe("Google", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <GoogleSignup />
      </MemoryRouter>
    );
  });
});
