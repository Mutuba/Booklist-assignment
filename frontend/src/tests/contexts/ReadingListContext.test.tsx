import React, { useEffect, ReactElement } from "react";
import { render, screen, waitFor, cleanup } from "@testing-library/react";
import { ReadingListProvider } from "../../contexts/ReadingListContext";
import { useReadingList } from "../../contexts/ReadingListContext";
import { mockBook } from "../mocks/Mocks";

describe("ReadingList", () => {
  const customRender = (ui: ReactElement, providerProps = {}) => {
    return render(
      <ReadingListProvider {...providerProps}>{ui}</ReadingListProvider>
    );
  };

  beforeEach(() => {
    cleanup();
  });

  const TestComponent = () => {
    const { readingList } = useReadingList();
    return (
      <div>
        {readingList.length > 0
          ? readingList.map((book) => <div key={book.id}>{book.title}</div>)
          : "No books"}
      </div>
    );
  };

  test("initializes with an empty reading list", () => {
    customRender(<TestComponent />);
    expect(screen.getByText("No books")).toBeInTheDocument();
  });

  const AddBookComponent = () => {
    const { addBookToReadingList, readingList } = useReadingList();
    return (
      <div>
        {readingList.map((book) => (
          <div key={book.id}>{book.title}</div>
        ))}
        <button onClick={() => addBookToReadingList(mockBook)}>Add Book</button>
      </div>
    );
  };

  test("adds a book to the reading list", async () => {
    customRender(<AddBookComponent />);
    const addButton = screen.getByText("Add Book");
    await waitFor(() => {
      addButton.click();
    });
    await waitFor(() => {
      expect(screen.getByText(`${mockBook.title}`)).toBeInTheDocument();
    });
  });

  const RemoveBookComponent = () => {
    const { addBookToReadingList, removeBookFromReadingList, readingList } =
      useReadingList();

    useEffect(() => {
      addBookToReadingList(mockBook);
    }, []);

    return (
      <div>
        {readingList.length > 0
          ? readingList.map((book) => <div key={book.id}>{book.title}</div>)
          : "No books"}

        <button onClick={() => removeBookFromReadingList(mockBook)}>
          Remove Book
        </button>
      </div>
    );
  };

  test("removes a book from the reading list", async () => {
    customRender(<RemoveBookComponent />);
    const removeButton = screen.getByText("Remove Book");
    // Assert that the there is a book listed on mount
    expect(screen.getByText(`${mockBook.title}`)).toBeInTheDocument();
    await waitFor(() => {
      removeButton.click();
    });
    await waitFor(() => {
      expect(screen.getByText("No books")).toBeInTheDocument();
    });
  });
});
