import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { Container, Typography } from "@mui/material";
import ReadingList from "./components/ReadingList";
import SearchBar from "./components/SearchBar";
import CustomAlert from "./components/shared/SnackbarAlert";
import { Book } from "./interfaces/Book";
import { useReadingList } from "../../frontend/src/contexts/ReadingListContext";
import Loader from "./components/shared/Loader";
import { useLoading } from "./contexts/LoadingContext";
import { useAlert } from "./contexts/SnackbarAlertContext";

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
  const { readingList } = useReadingList();
  const { isLoading } = useLoading();
  const { showSnackbarAlert } = useAlert();

  useEffect(() => {
    if (data && data?.books) {
      setSearchResults(data?.books);
    }
  }, [data]);

  return (
    <Container maxWidth="md" style={{ marginTop: "6rem" }}>
      {showSnackbarAlert && <CustomAlert />}
      <Typography variant="h2" gutterBottom style={{ textAlign: "center" }}>
        Book Assignment View
      </Typography>
      {searchResults && (
        <Container maxWidth="sm">
          <SearchBar
            books={searchResults}
            setSearchResults={setSearchResults}
          />
        </Container>
      )}

      {(loading || isLoading) && <Loader />}

      {error && <p>Error: {error.message}</p>}

      <ReadingList books={readingList} />
    </Container>
  );
};

export default App;
