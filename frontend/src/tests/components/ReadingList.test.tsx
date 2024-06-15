import React from "react";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import ReadingList from "../../components/ReadingList";
import { paginatedMockBooks } from "../mocks/Mocks";
import { ReadingListProvider } from "../../contexts/ReadingListContext";
import { LoadingProvider } from "../../contexts/LoadingContext";
import { SnackbarAlertProvider } from "../../contexts/SnackbarAlertContext";

describe("ReadingList Component", () => {
  beforeEach(() => {
    cleanup();
  });

  test("renders with list of books", () => {
    render(
      <ReadingListProvider value={{ readingList: [] }}>
        <LoadingProvider>
          <SnackbarAlertProvider>
            <ReadingList books={paginatedMockBooks} />
          </SnackbarAlertProvider>
        </LoadingProvider>
      </ReadingListProvider>
    );

    expect(screen.getByText("Reading List")).toBeInTheDocument();
    paginatedMockBooks.slice(0, 6).forEach((book) => {
      expect(screen.getByText(book.title)).toBeInTheDocument();
      expect(screen.getByText(`Author: ${book.author}`)).toBeInTheDocument();
      expect(
        screen.getByTestId(`remove-book-button-${book.id}`)
      ).toHaveTextContent("Remove from Reading List");
    });
  });

  test("paginates through the list of books", () => {
    render(
      <ReadingListProvider value={{ readingList: [] }}>
        <LoadingProvider>
          <SnackbarAlertProvider>
            <ReadingList books={paginatedMockBooks} />
          </SnackbarAlertProvider>
        </LoadingProvider>
      </ReadingListProvider>
    );

    paginatedMockBooks.slice(0, 6).forEach((book) => {
      expect(screen.getByText(book.title)).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText("Next Page"));
    paginatedMockBooks.slice(6, 12).forEach((book) => {
      expect(screen.getByText(book.title)).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText("Previous Page"));
    paginatedMockBooks.slice(0, 6).forEach((book) => {
      expect(screen.getByText(book.title)).toBeInTheDocument();
    });
  });

  test("disables pagination buttons at the beginning and end of the list", () => {
    render(
      <ReadingListProvider value={{ readingList: [] }}>
        <LoadingProvider>
          <SnackbarAlertProvider>
            <ReadingList books={paginatedMockBooks} />
          </SnackbarAlertProvider>
        </LoadingProvider>
      </ReadingListProvider>
    );

    expect(screen.getByText("Previous Page")).toBeDisabled();
    fireEvent.click(screen.getByText("Next Page"));
    fireEvent.click(screen.getByText("Next Page"));
    fireEvent.click(screen.getByText("Next Page"));
    expect(screen.getByText("Next Page")).toBeDisabled();
  });
});
