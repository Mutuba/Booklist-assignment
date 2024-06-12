import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import CustomAlert from "../../components/shared/CustomAlert";

describe("CustomAlert Component", () => {
  test("renders alert with message and close button", async () => {
    // Mock setShowAlert function
    const setShowAlert = jest.fn();

    render(
      <CustomAlert
        message="Test message"
        severity="error"
        setShowAlert={setShowAlert}
      />
    );

    expect(screen.getByRole("alert")).toHaveTextContent("Test message");

    const closeButton = screen.getByLabelText("close");
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);

    // Wait for the alert to close
    await waitFor(() => {
      expect(setShowAlert).toHaveBeenCalledWith(false);
    });
  });
});
