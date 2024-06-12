import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ReadingList from "../../components/ReadingList";

const mockBooks = [
  {
    id: "1",
    title: "Book 1",
    author: "Author 1",
    coverPhotoURL: "http://localhost:3000/assets/image1.webp",
    readingLevel: "A",
  },
  {
    id: "2",
    title: "Book 2",
    author: "Author 2",
    coverPhotoURL: "http://localhost:3000/assets/image2.webp",
    readingLevel: "B",
  },
];

describe("ReadingList Component", () => {
  test("renders with list of books", () => {
    render(
      <ReadingList books={mockBooks} removeBookFromReadingList={() => {}} />
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

  test("calls removeBookFromReadingList when removing a book", () => {
    const removeBookMock = jest.fn();

    render(
      <ReadingList
        books={mockBooks}
        removeBookFromReadingList={removeBookMock}
      />
    );

    const removeButton = screen.getByTestId("remove-book-button-1");

    fireEvent.click(removeButton);

    expect(removeBookMock).toHaveBeenCalledWith(mockBooks[0]);
  });
});
