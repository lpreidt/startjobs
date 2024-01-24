import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Timelinee } from "../components/Timelinee";
import { arrayToItems } from "../components/Timelinee";
import { Timeline } from "antd";

it("renders without crashing", () => {
  render(
    <Timelinee
      items={[
        {
          children: "Step 1",
        },
        {
          children: "Step 2",
        },
        {
          children: "Step 3",
        },
      ]}
    />
  );
});

describe("steps function", () => {
  it('should return an array of objects with "children" property', () => {
    const stepsarray = ["step 1", "step 2", "step 3"];
    const expectedSteps = [
      { children: "step 1" },
      { children: "step 2" },
      { children: "step 3" },
    ];

    expect(arrayToItems(stepsarray)).toEqual(expectedSteps);
  });
});
