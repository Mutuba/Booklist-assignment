import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import BookDetail from "../../components/BookDetail";
import { ReadingListProvider } from "../../contexts/ReadingListContext";

const mockBook = {
  id: "1",
  title: "Book 1",
  author: "Author 1",
  coverPhotoURL: "image1.webp",
  readingLevel: "A",
};

const addBookToReadingListMock = jest.fn();

describe("BookDetail Component", () => {
  test("renders book details correctly", () => {
    render(
      <ReadingListProvider>
        <BookDetail
          book={mockBook}
          addBookToReadingList={addBookToReadingListMock}
        />
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

  test("calls addBookToReadingList when add button is clicked", () => {
    render(
      <ReadingListProvider value={{ readingList: [] }}>
        <BookDetail
          book={mockBook}
          addBookToReadingList={addBookToReadingListMock}
        />
      </ReadingListProvider>
    );

    const addButton = screen.getByTestId(`add-book-button-${mockBook.id}`);
    fireEvent.click(addButton);

    expect(addBookToReadingListMock).toHaveBeenCalledWith(mockBook);
  });
});
