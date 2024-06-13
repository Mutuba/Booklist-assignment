import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import BookDetail from "../../components/BookDetail";
import { Book } from "../../interfaces/Book";
import {
  addBookToReadingListMock,
  setIsLoadingMock,
  triggerSnackbarAlertMock,
  setShowSnackbarAlertMock,
} from "../mocks/ContextMocks";

const mockBook: Book = {
  id: "1",
  title: "Book 1",
  author: "Author 1",
  coverPhotoURL: "image1.webp",
  readingLevel: "A",
};

describe("BookDetail Component", () => {
  beforeEach(() => {
    cleanup();
  });

  test("renders book details correctly", () => {
    render(<BookDetail book={mockBook} />);

    expect(screen.getByText(mockBook.title)).toBeInTheDocument();
    expect(
      screen.getByText(
        `Author: ${mockBook.author} | Level: ${mockBook.readingLevel}`
      )
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Add")).toBeInTheDocument();
  });

  test("calls addBookToReadingList when add button is clicked", async () => {
    render(<BookDetail book={mockBook} />);

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
});
