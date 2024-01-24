import { EditUser } from "../components/EditUser";
import { render, fireEvent } from "@testing-library/react";
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

describe("EditUser", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <EditUser />
      </MemoryRouter>
    );
  });
});
it("handles values", () => {
  const { getByTitle } = render(
    <MemoryRouter>
      <EditUser />
    </MemoryRouter>
  );
  const speichern = getByTitle("speichern");
  fireEvent.click(speichern);
});
