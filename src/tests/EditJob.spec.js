import React from "react";
import { EditJob } from "../components/EditJob";
import { MemoryRouter } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";
jest.mock("../firebase", () => ({
  auth: null,
}));
window.matchMedia = () => ({
  matches: false,
  addListener: () => {},
  removeListener: () => {},
});
jest.mock("../contexts/AuthContext", () => ({
  useAuth: () => ({
    currentUser: null,
  }),
}));
describe("EditJob", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <EditJob />
      </MemoryRouter>
    );
  });
  it("handles values", async () => {
    const mockOnFinish = jest.fn();
    const { getByPlaceholderText, getByTitle, getByRole } = render(
      <MemoryRouter>
        <EditJob onFinish={mockOnFinish} />
      </MemoryRouter>
    );
    const jobtitel = getByPlaceholderText("Jobtitel");
    const art = getByRole("combobox");
    const jobbeschreibung = getByPlaceholderText(
      "Was muss in diesem Job getan werden"
    );
    // standort = getByPlaceholderText("Standort");

    const speichern = getByTitle("Speichern");
    fireEvent.change(jobtitel, { target: { value: "Testtitel" } });
    fireEvent.change(art, { target: { value: "Testart" } });
    fireEvent.change(jobbeschreibung, {
      target: { value: "Testbeschreibung" },
    });
    // fireEvent.change(standort, { target: { value: "Teststandort" } });
    fireEvent.click(speichern);
    expect(mockOnFinish).toHaveBeenCalledTimes(0);
  });
  it("handles delete", async () => {
    const mockDeletFunction = jest.fn();
    const { getByPlaceholderText, getByTitle, getByRole } = render(
      <MemoryRouter>
        <EditJob deleteFunction={mockDeletFunction} />
      </MemoryRouter>
    );
    const deletef = getByTitle("delete");
    fireEvent.click(deletef);
    expect(mockDeletFunction).toHaveBeenCalledTimes(0);
  });

  //Inspo bei createUser holen
});
