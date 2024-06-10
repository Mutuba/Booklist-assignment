import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { Container, Typography } from "@mui/material";
import ReadingList from "./components/ReadingList";
import SearchBar from "./components/SearchBar";
interface Book {
  title: string;
  author: string;
  coverPhotoURL: string;
  readingLevel: string;
}

const GET_BOOKS = gql`
  query GetBooks {
    books {
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

  useEffect(() => {
    if (data && data.books) {
      setSearchResults(data.books);
    }
  }, [data]);

  useEffect(() => {
    const initialBooks: Book[] = [
      {
        title: "Curious Princess and the Enchanted Garden",
        author: "Reese Smith",
        coverPhotoURL: "assets/image2.webp",
        readingLevel: "H",
      },
      {
        title: "Clever Monster on the Wonder Island",
        author: "Jordan Jones",
        coverPhotoURL: "assets/image10.webp",
        readingLevel: "I",
      },
      {
        title: "Happy Knight and the Magic Spell",
        author: "Quinn Brown",
        coverPhotoURL: "assets/image10.webp",
        readingLevel: "I",
      },
    ];

    setReadingList(initialBooks);
  }, [data]);

  const addBookToReadingList = (book: Book) => {
    setReadingList([...readingList, book]);
  };

  const removeBookFromReadingList = (readingListBook: Book) => {
    setReadingList(
      readingList.filter((book) => book.title !== readingListBook.title)
    );
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h2" gutterBottom>
        Book Assignment View
      </Typography>
      <Container maxWidth="sm">
        <SearchBar
          books={searchResults}
          setSearchResults={setSearchResults}
          addBookToReadingList={addBookToReadingList}
        />
      </Container>

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
