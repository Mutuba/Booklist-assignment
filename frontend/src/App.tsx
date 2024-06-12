import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { Container, Typography } from "@mui/material";
import ReadingList from "./components/ReadingList";
import SearchBar from "./components/SearchBar";
import CustomAlert from "./components/shared/CustomAlert";
import { Book } from "./interfaces/Book";
import { useReadingList } from "../../frontend/src/contexts/ReadingListContext";

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
  const { readingList, addBookToReadingList, removeBookFromReadingList } =
    useReadingList();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    if (data && data.books) {
      setSearchResults(data.books);
    }
  }, [data]);

  const handleRemoveBook = (readingListBook: Book) => {
    removeBookFromReadingList(readingListBook);
    setShowAlert(true);
    setAlertMessage("Book removed from reading list");
  };

  const handleAddBook = (book: Book) => {
    if (!readingList.some((b) => b.id === book.id)) {
      addBookToReadingList(book);
      setShowAlert(true);
      setAlertMessage("Book added to reading list");
    } else {
      setShowAlert(true);
      setAlertMessage("Book already exists in the reading list");
    }
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
      <Typography variant="h2" gutterBottom style={{ textAlign: "center" }}>
        Book Assignment View
      </Typography>
      {searchResults && (
        <Container maxWidth="sm">
          <SearchBar
            books={searchResults}
            setSearchResults={setSearchResults}
            addBookToReadingList={handleAddBook}
          />
        </Container>
      )}

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

      <ReadingList
        books={readingList}
        removeBookFromReadingList={handleRemoveBook}
      />
    </Container>
  );
};

export default App;
