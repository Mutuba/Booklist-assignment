import React from "react";
import { render } from "@testing-library/react";
import CustomDivider from "../../components/shared/CustomDivider";

describe("CustomDivider", () => {
  test("renders a Divider component with correct props", () => {
    // Render the CustomDivider component
    const { getByTestId } = render(<CustomDivider />);

    // Get the Divider component by its test id
    const dividerElement = getByTestId("custom-divider");

    // Assert that the Divider component exists
    expect(dividerElement).toBeInTheDocument();
  });
});
