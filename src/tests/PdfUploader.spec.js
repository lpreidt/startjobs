import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { PdfUploader } from "../components/PdfUploader";

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
describe("PdfUploader", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <PdfUploader />
      </MemoryRouter>
    );
  });
  it("handles files", () => {
    const setFileList = jest.fn();
    render(
      <MemoryRouter>
        <PdfUploader testHandle={true} setFileList={setFileList} />
      </MemoryRouter>
    );
  });
  it("deletes files", () => {
    const setFileList = jest.fn();
    render(
      <MemoryRouter>
        <PdfUploader testDelete={true} setFileList={setFileList} />
      </MemoryRouter>
    );
  });
});
