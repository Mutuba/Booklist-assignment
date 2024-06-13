import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { gql } from "@apollo/client";
import App from "../../App";
import { ReadingListProvider } from "../../contexts/ReadingListContext";
import { LoadingProvider } from "../../contexts/LoadingContext";
import { SnackbarAlertProvider } from "../../contexts/SnackbarAlertContext";

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
        <ReadingListProvider value={{ readingList: [] }}>
          <LoadingProvider>
            <SnackbarAlertProvider>
              <App />
            </SnackbarAlertProvider>
          </LoadingProvider>
        </ReadingListProvider>
      </MockedProvider>
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByRole("progressbar")).toBeNull();
      expect(screen.getByText("Book Assignment View")).toBeInTheDocument();
      expect(screen.getByLabelText("Search books")).toBeInTheDocument();
      expect(screen.getByText("Reading List")).toBeInTheDocument();
    });
  });
});
