import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import BookDetailCard from "../../components/BookDetailCard";
import {
  mockBook,
  removeBookMock,
  setIsLoadingMock,
  triggerSnackbarAlertMock,
  setShowSnackbarAlertMock,
} from "../mocks/Mocks";
import { ReadingListProvider } from "../../contexts/ReadingListContext";
import { LoadingProvider } from "../../contexts/LoadingContext";
import { SnackbarAlertProvider } from "../../contexts/SnackbarAlertContext";

describe("BookDetailCard Component", () => {
  test("renders book details correctly", () => {
    render(
      <ReadingListProvider value={{ readingList: [mockBook] }}>
        <LoadingProvider>
          <SnackbarAlertProvider>
            <BookDetailCard book={mockBook} />
          </SnackbarAlertProvider>
        </LoadingProvider>
      </ReadingListProvider>
    );

    expect(screen.getByText(mockBook.title)).toBeInTheDocument();
    expect(screen.getByText(`Author: ${mockBook.author}`)).toBeInTheDocument();
    expect(
      screen.getByText(`Level: ${mockBook.readingLevel}`)
    ).toBeInTheDocument();
    expect(screen.getByAltText(mockBook.title)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Remove from Reading List" })
    ).toBeInTheDocument();
  });

  test("calls removeBookFromReadingList when remove button is clicked", () => {
    render(
      <ReadingListProvider
        value={{
          readingList: [mockBook],
          removeBookFromReadingList: removeBookMock,
        }}
      >
        <LoadingProvider value={{ setIsLoading: setIsLoadingMock }}>
          <SnackbarAlertProvider
            value={{
              setShowSnackbarAlert: setShowSnackbarAlertMock,
              triggerSnackbarAlert: triggerSnackbarAlertMock,
            }}
          >
            <BookDetailCard book={mockBook} />
          </SnackbarAlertProvider>
        </LoadingProvider>
      </ReadingListProvider>
    );
    const removeButton = screen.getByTestId(
      `remove-book-button-${mockBook.id}`
    );
    fireEvent.click(removeButton);
    expect(removeBookMock).toHaveBeenCalledWith(mockBook);
  });
});
