import React from "react";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Avatar,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface Book {
  id: string;
  title: string;
  author: string;
  coverPhotoURL: string;
  readingLevel: string;
}

interface BookProps {
  book: Book;
  addBookToReadingList: (book: Book) => void;
}

const BookDetail: React.FC<BookProps> = ({ book, addBookToReadingList }) => {
  return (
    <ListItem key={book.id}>
      <Avatar
        src={book.coverPhotoURL}
        alt={book.title}
        sx={{ marginRight: 2 }}
      />
      <ListItemText
        primary={book.title}
        secondary={`Author: ${book.author} | Level: ${book.readingLevel}`}
      />
      <ListItemSecondaryAction>
        <IconButton onClick={() => addBookToReadingList(book)}>
          <AddIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default BookDetail;
