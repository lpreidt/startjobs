import React from "react";
import { render, fireEvent, getByTitle } from "@testing-library/react";
import { screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { UserLogin } from "../components/UserLogin";

// Mock the AuthContext for testing purposes
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
      <UserLogin />
    </MemoryRouter>
  );
});
it("handles Submit", async () => {
  const mockHandleSubmit = jest.fn();
  const mockThen = jest.fn();
  const { getByText } = render(
    <MemoryRouter>
      <UserLogin handleSubmit={mockHandleSubmit} />
    </MemoryRouter>
  );
  const loginButton = screen.getByText("Login");
  const mockEmail = screen.getByPlaceholderText("Email");
  const mockPassword = screen.getByPlaceholderText("Password");

  fireEvent.click(loginButton);
  fireEvent.change(mockEmail, { target: { value: "test@mail.de" } });
  fireEvent.change(mockPassword, { target: { value: "testpassword" } });

  expect(mockHandleSubmit).toHaveBeenCalledTimes(0);
});
it("handles Mail", async () => {
  const setup = () => {
    const utils = render(
      <MemoryRouter>
        <UserLogin />
      </MemoryRouter>
    );
    const input = screen.getByPlaceholderText("Email");
    return {
      input,
      ...utils,
    };
  };

  const { input } = setup();

  fireEvent.change(input, { target: { value: "test@mail.de" } });
  expect(input.value).toBe("test@mail.de");
});
it("handles Password", async () => {
  const setup = () => {
    const utils = render(
      <MemoryRouter>
        <UserLogin />
      </MemoryRouter>
    );
    const input = screen.getByPlaceholderText("Password");
    return {
      input,
      ...utils,
    };
  };
  const { input } = setup();
  fireEvent.change(input, { target: { value: "testpassword" } });
  expect(input.value).toBe("testpassword");
});

/*
it("has a login button", () => {
  const { getByTitle } = render(
    <MemoryRouter>
      <UserLogin />
    </MemoryRouter>
  );
  const loginButton = getByTitle("Login");
  expect(loginButton).toBeInTheDocument();
});
*/
