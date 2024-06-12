import React from "react";
import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { gql } from "@apollo/client";
import App from "../../App";
import { ReadingListProvider } from "../../contexts/ReadingListContext";

const GET_BOOKS = gql`
  query GetBooks {
    books {
      id
      title
      author
      coverPhotoURL
      readingLevel
    }
  }
`;

const mocks = [
  {
    request: {
      query: GET_BOOKS,
    },
    result: {
      data: {
        books: [
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
        ],
      },
    },
  },
];

describe("App Component", () => {
  test("should initially have loading state, and headers and search text field", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ReadingListProvider>
          <App />
        </ReadingListProvider>
      </MockedProvider>
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    expect(screen.getByText("Book Assignment View")).toBeInTheDocument();
    expect(screen.getByLabelText("Search Books")).toBeInTheDocument();
    expect(screen.getByText("Reading List")).toBeInTheDocument();
  });
});
