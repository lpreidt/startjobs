import { EditCompany } from "../components/EditCompany";
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
describe("EditCompany", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <EditCompany />
      </MemoryRouter>
    );
  });
  //Onfinish testen wie in den anderen Edit Components
});
