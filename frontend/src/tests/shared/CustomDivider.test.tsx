import React from "react";
import { render } from "@testing-library/react";
import CustomDivider from "../../components/shared/CustomDivider";

describe("CustomDivider Component", () => {
  test("renders a Divider component with correct props", () => {
    const { getByTestId } = render(<CustomDivider />);

    const dividerElement = getByTestId("custom-divider");

    expect(dividerElement).toBeInTheDocument();
  });
});
