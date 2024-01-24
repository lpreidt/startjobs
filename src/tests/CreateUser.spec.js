import React from "react";
import { CreateUser } from "../components/CreateUser";
import { MemoryRouter } from "react-router-dom";
import {
  render,
  fireEvent,
  getByTitle,
  getByRole,
} from "@testing-library/react";
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
describe("CreateUser", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <CreateUser />
      </MemoryRouter>
    );
  });

  it("handles values", async () => {
    const { getByPlaceholderText } = render(
      <MemoryRouter>
        <CreateUser />
      </MemoryRouter>
    );
    const vorname = getByPlaceholderText("Vorname");
    const nachname = getByPlaceholderText("Nachname");
    const email = getByPlaceholderText("Email");
    const passwort = getByPlaceholderText("Passwort");
    const passwort2 = getByPlaceholderText("Passwort wiederholen");

    fireEvent.change(email, { target: { value: "lpreidt@web.de" } });
    fireEvent.change(passwort, { target: { value: "testpassword" } });
    fireEvent.change(passwort2, { target: { value: "testpassword" } });
    fireEvent.change(vorname, { target: { value: "Lukas" } });
    fireEvent.change(nachname, { target: { value: "Preidt" } });

    expect(email.value).toBe("lpreidt@web.de");
    expect(passwort.value).toBe("testpassword");
    expect(passwort2.value).toBe("testpassword");
    expect(vorname.value).toBe("Lukas");
    expect(nachname.value).toBe("Preidt");
  });

  it("handles Submit", async () => {
    const mockHandleSubmit = jest.fn();
    const { getByPlaceholderText, getByTitle } = render(
      <MemoryRouter>
        <CreateUser handleSubmit={mockHandleSubmit} />
      </MemoryRouter>
    );
    const vorname = getByPlaceholderText("Vorname");
    const nachname = getByPlaceholderText("Nachname");
    const email = getByPlaceholderText("Email");
    const passwort = getByPlaceholderText("Passwort");
    const passwort2 = getByPlaceholderText("Passwort wiederholen");
    const submit = getByTitle("create-user-button");

    fireEvent.change(email, { target: { value: "lpreidt@web.de" } });
    fireEvent.change(passwort, { target: { value: "testpassword" } });
    fireEvent.change(passwort2, { target: { value: "testpassword" } });
    fireEvent.change(vorname, { target: { value: "Lukas" } });
    fireEvent.change(nachname, { target: { value: "Preidt" } });

    expect(email.value).toBe("lpreidt@web.de");
    expect(passwort.value).toBe("testpassword");
    expect(passwort2.value).toBe("testpassword");
    expect(vorname.value).toBe("Lukas");
    expect(nachname.value).toBe("Preidt");
    fireEvent.click(submit);
    expect(mockHandleSubmit).toHaveBeenCalledTimes(0);
  });
});
