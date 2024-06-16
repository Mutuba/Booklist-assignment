import React from "react";
import { Grid, Typography, Container, Button } from "@mui/material";
import BookDetailCard from "./BookDetailCard";
import { Book } from "../interfaces/Book";
import usePagination from "../hooks/usePagination";
import EmptyReadingListIcon from "./shared/EmptyReadingListIcon";

interface ReadingListProps {
  books: Book[];
  itemsPerPage?: number;
}

const ReadingList: React.FC<ReadingListProps> = ({
  books,
  itemsPerPage = 6,
}) => {
  const { currentPage, setCurrentPage, currentItems, totalPages } =
    usePagination(books, { itemsPerPage });

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "3rem" }}>
      <Typography
        variant="h3"
        gutterBottom
        style={{ textAlign: "center", paddingBottom: "2rem" }}
      >
        Reading List
      </Typography>
      <div>
        {currentItems.length > 0 ? (
          <Grid container spacing={2}>
            {currentItems.map((book) => (
              <BookDetailCard key={book.id} book={book} />
            ))}
          </Grid>
        ) : (
          <>
            <Typography
              component="div"
              textAlign="center"
              variant="h6"
              color="textSecondary"
            >
              <EmptyReadingListIcon />
              There are no books in this student's reading list yet.
            </Typography>
            <Typography
              component="div"
              variant="body2"
              color="textSecondary"
              textAlign="center"
            >
              Let’s inspire young minds! Add some books to spark a love of
              reading!
            </Typography>
          </>
        )}
      </div>

      {totalPages > 1 && (
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <Button
            size="small"
            variant="contained"
            sx={{ color: "#fff", mb: 2, textTransform: "none" }}
            disabled={currentPage === 1}
            onClick={handlePrevPage}
            style={{ marginRight: "1rem" }}
          >
            Previous Page
          </Button>
          <Button
            size="small"
            variant="contained"
            sx={{ color: "#fff", mb: 2, textTransform: "none" }}
            disabled={currentPage === totalPages}
            onClick={handleNextPage}
          >
            Next Page
          </Button>
        </div>
      )}
    </Container>
  );
};

export default ReadingList;
