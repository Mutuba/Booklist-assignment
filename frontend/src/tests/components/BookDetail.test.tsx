import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import BookDetail from "../../components/BookDetail";
import {
  mockBook,
  addBookToReadingListMock,
  setIsLoadingMock,
  triggerSnackbarAlertMock,
  setShowSnackbarAlertMock,
} from "../mocks/Mocks";
import { ReadingListProvider } from "../../contexts/ReadingListContext";
import { LoadingProvider } from "../../contexts/LoadingContext";
import { SnackbarAlertProvider } from "../../contexts/SnackbarAlertContext";

describe("BookDetail Component", () => {
  beforeEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  test("renders book details correctly", () => {
    render(
      <ReadingListProvider value={{ readingList: [mockBook] }}>
        <LoadingProvider>
          <SnackbarAlertProvider>
            <BookDetail book={mockBook} />
          </SnackbarAlertProvider>
        </LoadingProvider>
      </ReadingListProvider>
    );

    expect(screen.getByText(mockBook.title)).toBeInTheDocument();
    expect(
      screen.getByText(
        `Author: ${mockBook.author} | Level: ${mockBook.readingLevel}`
      )
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Add")).toBeInTheDocument();
  });

  test("calls addBookToReadingList when add button is clicked", async () => {
    render(
      <ReadingListProvider
        value={{
          readingList: [],
          addBookToReadingList: addBookToReadingListMock,
        }}
      >
        <LoadingProvider value={{ setIsLoading: setIsLoadingMock }}>
          <SnackbarAlertProvider
            value={{
              setShowSnackbarAlert: setShowSnackbarAlertMock,
              triggerSnackbarAlert: triggerSnackbarAlertMock,
            }}
          >
            <BookDetail book={mockBook} />
          </SnackbarAlertProvider>
        </LoadingProvider>
      </ReadingListProvider>
    );
    const addButton = screen.getByTestId(`add-book-button-${mockBook.id}`);
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(addBookToReadingListMock).toHaveBeenCalledWith(mockBook);
      expect(setIsLoadingMock).toHaveBeenCalledWith(true);
      expect(setIsLoadingMock).toHaveBeenCalledWith(false);

      expect(setShowSnackbarAlertMock).toHaveBeenCalledWith(true);
      expect(triggerSnackbarAlertMock).toHaveBeenCalledWith(
        "Book added to reading list"
      );
    });
  });
  test("displays check icon if book is in reading list", async () => {
    render(
      <ReadingListProvider value={{ readingList: [mockBook] }}>
        <LoadingProvider>
          <SnackbarAlertProvider>
            <BookDetail book={mockBook} />
          </SnackbarAlertProvider>
        </LoadingProvider>
      </ReadingListProvider>
    );

    expect(screen.getByTestId(`add-book-button-${mockBook.id}`)).toBeDisabled();
    expect(screen.getByTestId("CheckCircleIcon")).toBeInTheDocument();
    const addButton = screen.getByTestId(`add-book-button-${mockBook.id}`);
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(addBookToReadingListMock).not.toHaveBeenCalled();
    });
  });
});
