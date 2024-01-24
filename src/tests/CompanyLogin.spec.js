import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { CompanyLogin } from "../components/CompanyLogin";
import { useState } from "react";

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
it("renders without crashing", () => {
  render(
    <MemoryRouter>
      <CompanyLogin />
    </MemoryRouter>
  );
});
it("handles Submit", async () => {
  const mockHandleSubmit = jest.fn();
  const mockThen = jest.fn();
  const view = render(
    <MemoryRouter>
      <CompanyLogin handleSubmit={mockHandleSubmit} />
    </MemoryRouter>
  );
  const loginButton = view.getByText("Login");
  const mockEmail = view.getByPlaceholderText("Email");
  const mockPassword = view.getByPlaceholderText("Password");

  fireEvent.click(loginButton);
  fireEvent.change(mockEmail, { target: { value: "test@mail.de" } });
  fireEvent.change(mockPassword, { target: { value: "testpassword" } });

  expect(mockHandleSubmit).toHaveBeenCalledTimes(0);
});
it("renders sucess without crashing", () => {
  const [mockSuccess, setMockSuccess] = [true, jest.fn()];
  render(
    <MemoryRouter>
      <CompanyLogin success={mockSuccess} />
    </MemoryRouter>
  );
});
