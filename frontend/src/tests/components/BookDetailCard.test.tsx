import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import BookDetailCard from "../../components/BookDetailCard";

const mockBook = {
  id: "1",
  title: "Book 1",
  author: "Author 1",
  coverPhotoURL: "image1.webp",
  readingLevel: "A",
};

const removeBookMock = jest.fn();

jest.mock("../../../useCoverPhotoURL", () => ({
  useCoverPhotoURL: jest.fn().mockReturnValue("mocked-image-url"),
}));

describe("BookDetailCard Component", () => {
  test("renders book details correctly", () => {
    render(
      <BookDetailCard
        book={mockBook}
        removeBookFromReadingList={removeBookMock}
      />
    );

    expect(screen.getByText(mockBook.title)).toBeInTheDocument();
    expect(screen.getByText(`Author: ${mockBook.author}`)).toBeInTheDocument();
    expect(
      screen.getByText(`Level: ${mockBook.readingLevel}`)
    ).toBeInTheDocument();
    expect(screen.getByAltText(mockBook.title)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Remove from Reading List/i })
    ).toBeInTheDocument();
  });

  test("calls removeBookFromReadingList when remove button is clicked", () => {
    render(
      <BookDetailCard
        book={mockBook}
        removeBookFromReadingList={removeBookMock}
      />
    );

    const removeButton = screen.getByTestId(
      `remove-book-button-${mockBook.id}`
    );
    fireEvent.click(removeButton);

    expect(removeBookMock).toHaveBeenCalledWith(mockBook);
  });
});
