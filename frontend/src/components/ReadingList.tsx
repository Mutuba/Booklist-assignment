import React from "react";
import { Grid, Typography, Container } from "@mui/material";
import BookDetailCard from "./BookDetailCard";
import { Book } from "../interfaces/Book";

interface ReadingListProps {
  books: Book[];
  removeBookFromReadingList: (book: Book) => void;
}

const ReadingList: React.FC<ReadingListProps> = ({
  books,
  removeBookFromReadingList,
}) => {
  return (
    <Container maxWidth="md" style={{ marginTop: "3rem" }}>
      <Typography variant="h2" gutterBottom style={{ textAlign: "center" }}>
        Reading List
      </Typography>
      <Grid container spacing={2}>
        {books.map((book) => (
          <BookDetailCard
            key={book.id}
            book={book}
            removeBookFromReadingList={removeBookFromReadingList}
          />
        ))}
      </Grid>
    </Container>
  );
};

export default ReadingList;
