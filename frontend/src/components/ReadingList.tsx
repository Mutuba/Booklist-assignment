import React from "react";
import { Grid, Typography, Container } from "@mui/material";
import BookDetailCard from "./BookDetailCard";
import { Book } from "../interfaces/Book";

interface ReadingListProps {
  books: Book[];
}

const ReadingList: React.FC<ReadingListProps> = ({ books }) => {
  return (
    <Container maxWidth="md" style={{ marginTop: "3rem" }}>
      <Typography variant="h2" gutterBottom style={{ textAlign: "center" }}>
        Reading List
      </Typography>
      <div
        style={{
          height: "100vh",
          overflowY: "auto",
          padding: "1rem",
          border: books?.length > 0 ? "1px solid #ddd" : "",
        }}
      >
        <Grid container spacing={2}>
          {books?.map((book) => (
            <BookDetailCard key={book.id} book={book} />
          ))}
        </Grid>
      </div>
    </Container>
  );
};

export default ReadingList;
