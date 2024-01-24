import { CreateCompany } from "../components/CreateCompany";
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
describe("CreateCompany", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <CreateCompany />
      </MemoryRouter>
    );
  });
});
