import React from "react";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Badge,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useReadingList } from "../contexts/ReadingListContext";
import { Book } from "../interfaces/Book";
import { useLoading } from "../contexts/LoadingContext";
import { useSnackbarAlert } from "../contexts/SnackbarAlertContext";

interface BookProps {
  book: Book;
}

const BookDetail: React.FC<BookProps> = ({ book }) => {
  const { readingList, addBookToReadingList } = useReadingList();
  const { setIsLoading } = useLoading();
  const { setShowSnackbarAlert, triggerSnackbarAlert } = useSnackbarAlert();
  const isInReadingList = readingList.some(
    (readingListBook) => readingListBook.id === book.id
  );

  const handleAddBook = (book: Book) => {
    if (
      !readingList.some((readingListBook) => readingListBook.id === book.id)
    ) {
      setIsLoading(true);
      addBookToReadingList(book);
      setIsLoading(false);
      setShowSnackbarAlert(true);
      triggerSnackbarAlert("Book added to reading list");
    } else {
      setShowSnackbarAlert(true);
      triggerSnackbarAlert("Book already exists in the reading list");
    }
  };

  return (
    <ListItem key={book.id}>
      <Box display="flex" alignItems="center" flexGrow={1}>
        <ListItemText
          primary={book.title}
          secondary={`Author: ${book.author} | Level: ${book.readingLevel}`}
        />
        {isInReadingList && (
          <Badge
            badgeContent={<CheckCircleIcon color="primary" />}
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            style={{ marginRight: "1rem" }}
          />
        )}
      </Box>
      <ListItemSecondaryAction>
        <IconButton
          aria-label="Add"
          onClick={() => handleAddBook(book)}
          disabled={isInReadingList}
          color="primary"
        >
          <AddIcon data-testid={`add-book-button-${book.id}`} />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default BookDetail;
