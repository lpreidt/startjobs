import React from "react";
import { Home } from "../components/Home";
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
describe("Home", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
  });
});
