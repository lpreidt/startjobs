import React from "react";
import { CreateJob } from "../components/CreateJob";
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

describe("CreateJob", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <CreateJob />
      </MemoryRouter>
    );
  });
  it("handles values", async () => {
    const mockOnFinish = jest.fn();
    const { getByPlaceholderText, getByTitle, getByRole } = render(
      <MemoryRouter>
        <CreateJob onFinish={mockOnFinish} />
      </MemoryRouter>
    );
    const jobtitel = getByPlaceholderText("Jobtitel");
    const art = getByRole("combobox");
    const jobbeschreibung = getByPlaceholderText(
      "Was muss in diesem Job getan werden"
    );
    //standort = getByPlaceholderText("Standort");
    const erstellen = getByTitle("erstellen");
    fireEvent.change(jobtitel, { target: { value: "Testtitel" } });
    fireEvent.change(art, { target: { value: "Testart" } });
    fireEvent.change(jobbeschreibung, {
      target: { value: "Testbeschreibung" },
    });

    //fireEvent.change(standort, { target: { value: "Teststandort" } });
    fireEvent.click(erstellen);
    expect(mockOnFinish).toHaveBeenCalledTimes(0);
    //Problem: on Finish wird nicht aufgerufen weil niht alle Felder ausgefüllt sind
    // Ziel alle Felder, auch arrays müssen ausgefüllt sein
  });
});
