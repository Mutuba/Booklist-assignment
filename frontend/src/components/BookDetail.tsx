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

interface BookProps {
  book: Book;
  addBookToReadingList: (book: Book) => void;
}

const BookDetail: React.FC<BookProps> = ({ book, addBookToReadingList }) => {
  const { readingList } = useReadingList();
  const isInReadingList = readingList.some((b) => b.id === book.id);

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
          onClick={() => addBookToReadingList(book)}
          disabled={isInReadingList}
        >
          <AddIcon
            data-testid={`add-book-button-${book.id}`}
            color="disabled"
          />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default BookDetail;
