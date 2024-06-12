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
    delay: 30,
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

    expect(await screen.findByText("Loading...")).toBeInTheDocument();
    expect(await screen.findByText("Book Assignment View")).toBeInTheDocument();
    expect(await screen.findByLabelText("Search Books")).toBeInTheDocument();
    expect(await screen.findByText("Reading List")).toBeInTheDocument();
  });
});
