import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchBar from "../../components/SearchBar";
import userEvent from "@testing-library/user-event";
import { addBookToReadingListMock, mockBooks } from "../mocks/Mocks";
import { ReadingListProvider } from "../../contexts/ReadingListContext";
import { LoadingProvider } from "../../contexts/LoadingContext";
import { SnackbarAlertProvider } from "../../contexts/SnackbarAlertContext";

describe("SearchBar Component", () => {
  test("renders without crashing", () => {
    render(
      <ReadingListProvider value={{ readingList: mockBooks }}>
        <LoadingProvider>
          <SnackbarAlertProvider>
            <SearchBar books={mockBooks} setSearchResults={() => {}} />
          </SnackbarAlertProvider>
        </LoadingProvider>
      </ReadingListProvider>
    );
  });

  test("renders the autocomplete component", () => {
    render(
      <ReadingListProvider value={{ readingList: mockBooks }}>
        <LoadingProvider>
          <SnackbarAlertProvider>
            <SearchBar books={mockBooks} setSearchResults={() => {}} />
          </SnackbarAlertProvider>
        </LoadingProvider>
      </ReadingListProvider>
    );
    const autocompleteElement = screen.getByTestId(
      "search-results-autocomplete"
    );
    expect(autocompleteElement).toBeInTheDocument();
  });

  test("renders the text field", () => {
    render(
      <ReadingListProvider value={{ readingList: mockBooks }}>
        <LoadingProvider>
          <SnackbarAlertProvider>
            <SearchBar books={mockBooks} setSearchResults={() => {}} />
          </SnackbarAlertProvider>
        </LoadingProvider>
      </ReadingListProvider>
    );
    const textFieldElement = screen.getByLabelText("Search books");
    expect(textFieldElement).toBeInTheDocument();
  });

  test("filters options based on user input", async () => {
    render(
      <ReadingListProvider value={{ readingList: mockBooks }}>
        <LoadingProvider>
          <SnackbarAlertProvider>
            <SearchBar books={mockBooks} setSearchResults={() => {}} />
          </SnackbarAlertProvider>
        </LoadingProvider>
      </ReadingListProvider>
    );
    const textFieldElement = screen.getByLabelText("Search books");
    userEvent.type(textFieldElement, "Book 1");

    fireEvent.keyDown(textFieldElement, { key: "ArrowDown" });

    await waitFor(() => {
      expect(screen.getByText("Book 1")).toBeInTheDocument();
      expect(screen.queryByText("Book 2")).not.toBeInTheDocument();
    });
  });

  test("renders the BookDetail component when a user selects an option", async () => {
    render(
      <ReadingListProvider
        value={{
          readingList: [],
          addBookToReadingList: addBookToReadingListMock,
        }}
      >
        <LoadingProvider>
          <SnackbarAlertProvider>
            <SearchBar books={mockBooks} setSearchResults={() => {}} />
          </SnackbarAlertProvider>
        </LoadingProvider>
      </ReadingListProvider>
    );
    const textFieldElement = screen.getByLabelText("Search books");
    userEvent.type(textFieldElement, "Book 1");

    fireEvent.keyDown(textFieldElement, { key: "ArrowDown" });

    await screen.findByText("Book 1");
    const addButton = screen.getByTestId(`add-book-button-${mockBooks[0].id}`);
    fireEvent.click(addButton);

    expect(addBookToReadingListMock).toHaveBeenCalledWith(mockBooks[0]);
  });
});
