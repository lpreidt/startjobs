import React from "react";
import { CompanySucceeded } from "../components/CompanySucceeded";
import { MemoryRouter } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";

it("renders without crashing", () => {
  render(
    <MemoryRouter>
      <CompanySucceeded />
    </MemoryRouter>
  );
});
