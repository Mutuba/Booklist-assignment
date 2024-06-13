import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import ReadingList from "../../components/ReadingList";
import { removeBookMock } from "../mocks/ContextMocks";

const mockBooks = [
  {
    id: "1",
    title: "Book 1",
    author: "Author 1",
    coverPhotoURL: "image1.webp",
    readingLevel: "A",
  },
  {
    id: "2",
    title: "Book 2",
    author: "Author 2",
    coverPhotoURL: "image2.webp",
    readingLevel: "B",
  },
];

describe("ReadingList Component", () => {
  beforeEach(() => {
    cleanup();
  });
  test("renders with list of books", () => {
    render(<ReadingList books={mockBooks} />);

    expect(screen.getByText("Reading List")).toBeInTheDocument();

    mockBooks.forEach((book) => {
      expect(screen.getByText(book.title)).toBeInTheDocument();
      expect(screen.getByText(`Author: ${book.author}`)).toBeInTheDocument();
      expect(
        screen.getByTestId(`remove-book-button-${book.id}`)
      ).toHaveTextContent("Remove from Reading List");
    });
  });

  test("calls removeBookFromReadingList when removing a book", async () => {
    render(<ReadingList books={mockBooks} />);

    fireEvent.click(screen.getByTestId("remove-book-button-1"));

    expect(removeBookMock).toHaveBeenCalledWith(mockBooks[0]);
  });
});
