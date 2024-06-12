import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import {
  ReadingListProvider,
  useReadingList,
} from "../../contexts/ReadingListContext";
import userEvent from "@testing-library/user-event";

describe("ReadingListContext", () => {
  test("should add and remove books from the reading list", async () => {
    const TestComponent = () => {
      const { readingList, addBookToReadingList, removeBookFromReadingList } =
        useReadingList();

      return (
        <div>
          <ul>
            {readingList.map((book) => (
              <li key={book.id} data-testid={`book-${book.id}`}>
                {book.title}
              </li>
            ))}
          </ul>
          <button
            onClick={() =>
              addBookToReadingList({
                id: "1",
                title: "Book 1",
                author: "Alex Jones",
                coverPhotoURL: "http://localhost:3000/assets/image6.webp",
                readingLevel: "A",
              })
            }
          >
            Add Book
          </button>
          <button
            onClick={() =>
              removeBookFromReadingList({
                id: "1",
                title: "Book 1",
                author: "Alex Jones",
                coverPhotoURL: "http://localhost:3000/assets/image6.webp",
                readingLevel: "A",
              })
            }
          >
            Remove Book
          </button>
        </div>
      );
    };

    render(
      <ReadingListProvider>
        <TestComponent />
      </ReadingListProvider>
    );

    expect(screen.queryByTestId("book-1")).not.toBeInTheDocument();

    userEvent.click(screen.getByText("Add Book"));

    await waitFor(() => {
      expect(screen.getByTestId("book-1")).toBeInTheDocument();
      expect(screen.getByText("Book 1")).toBeInTheDocument;
    });

    userEvent.click(screen.getByText("Remove Book"));

    await waitFor(() => {
      expect(screen.queryByTestId("book-1")).not.toBeInTheDocument();
    });
  });
});
