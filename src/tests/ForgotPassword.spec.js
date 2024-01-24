import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ForgotPassword } from "../components/ForgotPassword";
import { MemoryRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";
import ReactTestUtils from "react-dom/test-utils";
jest.mock("../firebase", () => ({
  auth: {
    signInWithEmailAndPassword: jest.fn(),
  },
}));
jest.mock("../contexts/AuthContext", () => ({
  useAuth: () => ({
    currentUser: null,
    login: jest.fn(),
  }),
}));
describe("ForgotPassword", () => {
  test("renders without error", () => {
    render(
      <MemoryRouter>
        <ForgotPassword />
      </MemoryRouter>
    );
  });

  test("renders Companyscreen ", () => {
    render(
      <MemoryRouter>
        <ForgotPassword test={"company"} />
      </MemoryRouter>
    );
  });
  test("renders Userscreen ", () => {
    render(
      <MemoryRouter>
        <ForgotPassword test={"user"} />
      </MemoryRouter>
    );
  });
  test("handles submit", () => {
    const { getByTitle } = render(
      <MemoryRouter>
        <ForgotPassword />
      </MemoryRouter>
    );
    const submitButton = getByTitle("submit");
    fireEvent.click(submitButton);
  });
  test("checks userType ", () => {
    <MemoryRouter>
      <ForgotPassword test={"user"} />
    </MemoryRouter>;
  });
});
