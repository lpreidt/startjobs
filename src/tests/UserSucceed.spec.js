import React from "react";
import { render } from "@testing-library/react";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import { MemoryRouter } from "react-router-dom";
import { UserSucceed } from "../components/UserSucceed";

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

describe("UserSucceed", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <UserSucceed />
      </MemoryRouter>
    );
  });
  it("renders without crashing 2", () => {
    render(
      <MemoryRouter>
        <UserSucceed type={"application"} />
      </MemoryRouter>
    );
  });
});
