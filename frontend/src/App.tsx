import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { Container, Typography } from "@mui/material";
import ReadingList from "./components/ReadingList";
import SearchBar from "./components/SearchBar";
import SnackbarAlert from "./components/shared/SnackbarAlert";
import ElloAppBar from "./components/shared/AppBar";
import { Book } from "./interfaces/Book";
import { useReadingList } from "../../frontend/src/contexts/ReadingListContext";
import Loader from "./components/shared/Loader";
import Error from "../../frontend/src/components/shared/Error";
import { useLoading } from "./contexts/LoadingContext";
import { useSnackbarAlert } from "./contexts/SnackbarAlertContext";
import { GET_BOOKS } from "../src/graphql/books/queries";

const App: React.FC = () => {
  const { loading, error, data } = useQuery<{ books: Book[] }>(GET_BOOKS);
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const { readingList } = useReadingList();
  const { isLoading } = useLoading();
  const { showSnackbarAlert } = useSnackbarAlert();

  useEffect(() => {
    if (data && data.books) {
      setSearchResults(data.books);
    }
  }, [data]);

  if (error) {
    return <Error message={error.message} />;
  }

  return (
    <>
      <ElloAppBar />
      <Container maxWidth="md" style={{ marginTop: "3rem" }}>
        {loading || isLoading ? (
          <Loader />
        ) : (
          <>
            {showSnackbarAlert && <SnackbarAlert />}
            <Typography
              variant="h3"
              gutterBottom
              style={{ textAlign: "center", padding: "2rem" }}
            >
              Book Assignment
            </Typography>
            {searchResults && (
              <Container maxWidth="sm">
                <SearchBar
                  books={searchResults}
                  setSearchResults={setSearchResults}
                />
              </Container>
            )}
            <ReadingList books={readingList} />
          </>
        )}
      </Container>
    </>
  );
};

export default App;
