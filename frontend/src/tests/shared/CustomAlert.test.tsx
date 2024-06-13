import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import CustomAlert from "../../components/shared/SnackbarAlert";
import { setShowSnackbarAlertMock } from "../mocks/ContextMocks";

describe("CustomAlert Component", () => {
  test("renders alert with message and close button", async () => {
    render(<CustomAlert />);
    expect(screen.getByRole("alert")).toHaveTextContent("Test message");
    const closeButton = screen.getByTestId("CloseIcon");
    expect(closeButton).toBeInTheDocument();
    fireEvent.click(closeButton);
    await waitFor(() => {
      expect(setShowSnackbarAlertMock).toHaveBeenCalledWith(false);
    });
  });
});
