import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import App from "../../App";
import { ReadingListProvider } from "../../contexts/ReadingListContext";
import { LoadingProvider } from "../../contexts/LoadingContext";
import { SnackbarAlertProvider } from "../../contexts/SnackbarAlertContext";
import { bookMockResult, paginatedMockBooks } from "../mocks/Mocks";
import { Book } from "../../interfaces/Book";

const renderApp = (readingList: Book[] = []) => {
  render(
    <MockedProvider mocks={bookMockResult} addTypename={false}>
      <ReadingListProvider value={{ readingList }}>
        <LoadingProvider>
          <SnackbarAlertProvider>
            <App />
          </SnackbarAlertProvider>
        </LoadingProvider>
      </ReadingListProvider>
    </MockedProvider>
  );
};

describe("App Component", () => {
  test("should initially have loading state, and headers and search text field", async () => {
    renderApp();

    expect(screen.getByRole("progressbar")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByRole("progressbar")).toBeNull();
      expect(screen.getByText("Book Assignment")).toBeInTheDocument();
      expect(
        screen.getByLabelText("Search for books to add to the reading list")
      ).toBeInTheDocument();
      expect(screen.getByText("Reading List")).toBeInTheDocument();
      expect(
        screen.getByText(
          "There are no books in this student's reading list yet."
        )
      ).toBeInTheDocument();
    });
  });

  test("should render a reading list", async () => {
    renderApp(paginatedMockBooks);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByRole("progressbar")).toBeNull();
      expect(
        screen.queryByText(
          "There are no books in this student's reading list yet."
        )
      ).not.toBeInTheDocument();

      expect(
        screen.queryByText(`${paginatedMockBooks[1].title}`)
      ).toBeInTheDocument();
    });
  });
});
