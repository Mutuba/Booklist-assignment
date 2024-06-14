import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import {
  SnackbarAlertProvider,
  useSnackbarAlert,
} from "../../contexts/SnackbarAlertContext";

const mockMessage = "Test Message";

const MockComponent = () => {
  const {
    showSnackbarAlert,
    setShowSnackbarAlert,
    snackbarAlertMessage,
    triggerSnackbarAlert,
  } = useSnackbarAlert();

  return (
    <div>
      {showSnackbarAlert && <div>{snackbarAlertMessage}</div>}
      <button onClick={() => setShowSnackbarAlert(!showSnackbarAlert)}>
        Toggle Alert
      </button>
      <button onClick={() => triggerSnackbarAlert(mockMessage)}>
        Trigger Alert
      </button>
    </div>
  );
};

const customRender = (ui: React.ReactElement, providerProps = {}) => {
  return render(
    <SnackbarAlertProvider {...providerProps}>{ui}</SnackbarAlertProvider>
  );
};

describe("SnackbarAlertContext", () => {
  test("provides the default values correctly", () => {
    customRender(<MockComponent />);
    expect(screen.queryByText(mockMessage)).not.toBeInTheDocument();
  });

  test("can toggle the alert visibility", () => {
    customRender(<MockComponent />);
    const toggleButton = screen.getByText("Toggle Alert");

    fireEvent.click(toggleButton);
    expect(screen.queryByText(mockMessage)).not.toBeInTheDocument();

    fireEvent.click(toggleButton);
    expect(screen.queryByText(mockMessage)).not.toBeInTheDocument();
  });

  test("can trigger the alert with a message", async () => {
    customRender(<MockComponent />);
    const triggerButton = screen.getByText("Trigger Alert");

    fireEvent.click(triggerButton);

    await waitFor(() => {
      expect(screen.getByText(mockMessage)).toBeInTheDocument();
    });
  });
});
