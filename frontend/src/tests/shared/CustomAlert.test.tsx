import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import CustomAlert from "../../components/shared/SnackbarAlert";
import { setShowSnackbarAlertMock } from "../mocks/Mocks";
import { SnackbarAlertProvider } from "../../contexts/SnackbarAlertContext";

describe("CustomAlert Component", () => {
  test("renders alert with message and close button", async () => {
    render(
      <SnackbarAlertProvider
        value={{
          showSnackbarAlert: true,
          snackbarAlertMessage: "Test message",
          setShowSnackbarAlert: setShowSnackbarAlertMock,
        }}
      >
        <CustomAlert />
      </SnackbarAlertProvider>
    );

    expect(screen.getByRole("alert")).toHaveTextContent("Test message");
    const closeButton = screen.getByTestId("CloseIcon");
    expect(closeButton).toBeInTheDocument();
    fireEvent.click(closeButton);
    await waitFor(() => {
      expect(setShowSnackbarAlertMock).toHaveBeenCalledWith(false);
    });
  });
});
