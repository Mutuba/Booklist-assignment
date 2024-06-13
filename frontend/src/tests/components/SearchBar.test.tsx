import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchBar from "../../components/SearchBar";
import userEvent from "@testing-library/user-event";
import { addBookToReadingListMock } from "../mocks/ContextMocks";

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
    author: "Author 1",
    coverPhotoURL: "http://localhost:3000/assets/image1.webp",
    readingLevel: "A",
  },
];

describe("SearchBar Component", () => {
  test("renders without crashing", () => {
    render(<SearchBar books={mockBooks} setSearchResults={() => {}} />);
  });

  test("renders the autocomplete component", () => {
    render(<SearchBar books={mockBooks} setSearchResults={() => {}} />);
    const autocompleteElement = screen.getByTestId(
      "search-results-autocomplete"
    );
    expect(autocompleteElement).toBeInTheDocument();
  });

  test("renders the text field", () => {
    render(<SearchBar books={mockBooks} setSearchResults={() => {}} />);
    const textFieldElement = screen.getByLabelText("Search Books");
    expect(textFieldElement).toBeInTheDocument();
  });

  test("filters options based on user input", async () => {
    render(<SearchBar books={mockBooks} setSearchResults={() => {}} />);
    const textFieldElement = screen.getByLabelText("Search Books");
    userEvent.type(textFieldElement, "Book 1");

    fireEvent.keyDown(textFieldElement, { key: "ArrowDown" });

    await waitFor(() => {
      expect(screen.getByText("Book 1")).toBeInTheDocument();
      expect(screen.queryByText("Book 2")).not.toBeInTheDocument();
    });
  });

  test("renders the BookDetail component when a user selects an option", async () => {
    const setSearchResultsMock = jest.fn();

    render(
      <SearchBar books={mockBooks} setSearchResults={setSearchResultsMock} />
    );
    const textFieldElement = screen.getByLabelText("Search Books");
    userEvent.type(textFieldElement, "Book 1");

    fireEvent.keyDown(textFieldElement, { key: "ArrowDown" });

    await screen.findByText("Book 1");
    const addButton = screen.getByTestId(`add-book-button-${mockBooks[0].id}`);
    fireEvent.click(addButton);

    expect(addBookToReadingListMock).toHaveBeenCalledWith(mockBooks[0]);
  });
});
