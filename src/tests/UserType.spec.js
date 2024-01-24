import { UserType } from "../components/UserType";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

jest.mock("../firebase", () => ({
  auth: null,
  getFirestore: () => ({
    collection: () => ({
      doc: () => ({
        get: async () => ({
          exists: true,
        }),
      }),
    }),
  }),
  firestore: () => ({
    collection: () => ({
      doc: () => ({
        get: async () => ({
          exists: true,
        }),
      }),
    }),
  }),
}));
jest.mock("../firebase").mock("firebase/firestore"),
  () => ({
    collection: () => {},
    doc: () => {},
    getDoc: async () => ({
      exists: () => true,
    }),
  });
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
describe("Home", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <UserType />
      </MemoryRouter>
    );
  });
});
