import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { Container, Typography } from "@mui/material";
import ReadingList from "./components/ReadingList";
import SearchBar from "./components/SearchBar";
import CustomAlert from "./components/CustomAlert";

interface Book {
  id: string;
  title: string;
  author: string;
  coverPhotoURL: string;
  readingLevel: string;
}

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

const App: React.FC = () => {
  const { loading, error, data } = useQuery<{ books: Book[] }>(GET_BOOKS);
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [readingList, setReadingList] = useState<Book[]>([]);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (data && data.books) {
      setSearchResults(data.books);
    }
  }, [data]);

  useEffect(() => {
    const initialBooks: Book[] = [
      {
        id: "51",
        title: "Curious Princess and the Enchanted Garden",
        author: "Reese Smith",
        coverPhotoURL: "assets/image2.webp",
        readingLevel: "H",
      },
      {
        id: "52",
        title: "Clever Monster on the Wonder Island",
        author: "Jordan Jones",
        coverPhotoURL: "assets/image10.webp",
        readingLevel: "I",
      },
      {
        id: "53",
        title: "Happy Knight and the Magic Spell",
        author: "Quinn Brown",
        coverPhotoURL: "assets/image10.webp",
        readingLevel: "I",
      },
    ];

    setReadingList(initialBooks);
  }, [data]);

  const addBookToReadingList = (book: Book) => {
    // Check if the book with the same id already exists in the readingList
    if (!readingList.some((b) => b.id === book.id)) {
      // If not, add the book to the readingList
      setReadingList([...readingList, book]);
    } else {
      // If the book already exists, show the alert
      setShowAlert(true);
    }
  };

  const removeBookFromReadingList = (readingListBook: Book) => {
    setReadingList(
      readingList.filter((book) => book.id !== readingListBook.id)
    );
  };

  return (
    <Container maxWidth="md">
      {showAlert && (
        <CustomAlert
          message="Book already exists in the reading list"
          severity="warning"
          setShowAlert={setShowAlert}
        />
      )}
      <Typography variant="h2" gutterBottom>
        Book Assignment View
      </Typography>
      {searchResults && (
        <Container maxWidth="sm">
          <SearchBar
            books={searchResults}
            setSearchResults={setSearchResults}
            addBookToReadingList={addBookToReadingList}
          />
        </Container>
      )}

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

      <ReadingList
        books={readingList}
        removeBookFromReadingList={removeBookFromReadingList}
      />
    </Container>
  );
};

export default App;
