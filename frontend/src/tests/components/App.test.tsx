import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import App from "../../App";
import { ReadingListProvider } from "../../contexts/ReadingListContext";
import { LoadingProvider } from "../../contexts/LoadingContext";
import { SnackbarAlertProvider } from "../../contexts/SnackbarAlertContext";
import { bookMockResult } from "../mocks/Mocks";

describe("App Component", () => {
  test("should initially have loading state, and headers and search text field", async () => {
    render(
      <MockedProvider mocks={bookMockResult} addTypename={false}>
        <ReadingListProvider value={{ readingList: [] }}>
          <LoadingProvider>
            <SnackbarAlertProvider>
              <App />
            </SnackbarAlertProvider>
          </LoadingProvider>
        </ReadingListProvider>
      </MockedProvider>
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByRole("progressbar")).toBeNull();
      expect(screen.getByText("Book Assignment View")).toBeInTheDocument();
      expect(screen.getByLabelText("Search books")).toBeInTheDocument();
      expect(screen.getByText("Reading List")).toBeInTheDocument();
    });
  });
});
