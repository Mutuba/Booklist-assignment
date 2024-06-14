import { gql } from "@apollo/client";
import { Book } from "../../interfaces/Book";

export const addBookToReadingListMock = jest.fn();
export const removeBookMock = jest.fn();
export const setIsLoadingMock = jest.fn();
export const setShowSnackbarAlertMock = jest.fn();
export const triggerSnackbarAlertMock = jest.fn();

export const mockBook: Book = {
  id: "1",
  title: "Test Book 1",
  author: "Test Author 1",
  coverPhotoURL: "image1.webp",
  readingLevel: "A",
};

export const mockBooks = [
  {
    id: "1",
    title: "Test Book 1",
    author: "Test Author 1",
    coverPhotoURL: "image1.webp",
    readingLevel: "A",
  },
  {
    id: "2",
    title: "Test Book 2",
    author: "Test Author 2",
    coverPhotoURL: "image1.webp",
    readingLevel: "B",
  },
];

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

export const bookMockResult = [
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
