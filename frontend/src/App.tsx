import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { Container, Typography } from "@mui/material";
import ReadingList from "./components/ReadingList";
import SearchBar from "./components/SearchBar";
import CustomAlert from "./components/shared/CustomAlert";
import { Book } from "./interfaces/Book";

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
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    if (data && data.books) {
      setSearchResults(data.books);
    }
  }, [data]);

  const addBookToReadingList = (book: Book) => {
    // Check if the book with the same id already exists in the readingList
    if (!readingList.some((b) => b.id === book.id)) {
      // If not, add the book to the readingList
      setReadingList([...readingList, book]);
      // Show alert for book added to reading list
      setShowAlert(true);
      setAlertMessage("Book added to reading list");
    } else {
      // If the book already exists, show the alert
      setShowAlert(true);
      setAlertMessage("Book already exists in the reading list");
    }
  };

  const removeBookFromReadingList = (readingListBook: Book) => {
    setReadingList(
      readingList.filter((book) => book.id !== readingListBook.id)
    );
    // Show alert for book removed from reading list
    setShowAlert(true);
    setAlertMessage("Book removed from reading list");
  };

  return (
    <Container maxWidth="md">
      {showAlert && (
        <CustomAlert
          message={alertMessage}
          severity="info"
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
