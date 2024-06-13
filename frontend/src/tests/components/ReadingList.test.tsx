import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import ReadingList from "../../components/ReadingList";
import { mockBooks } from "../mocks/Mocks";
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
            <ReadingList books={mockBooks} />
          </SnackbarAlertProvider>
        </LoadingProvider>
      </ReadingListProvider>
    );

    expect(screen.getByText("Reading List")).toBeInTheDocument();

    mockBooks.forEach((book) => {
      expect(screen.getByText(book.title)).toBeInTheDocument();
      expect(screen.getByText(`Author: ${book.author}`)).toBeInTheDocument();
      expect(
        screen.getByTestId(`remove-book-button-${book.id}`)
      ).toHaveTextContent("Remove from Reading List");
    });
  });
});
