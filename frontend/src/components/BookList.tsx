import React from "react";
import { List } from "@mui/material";
import BookDetail from "./BookDetail";

interface Book {
  id: string;
  title: string;
  author: string;
  coverPhotoURL: string;
  readingLevel: string;
}

interface BookListProps {
  books: Book[];
  addBookToReadingList: (book: Book) => void;
}

const BookList: React.FC<BookListProps> = ({ books, addBookToReadingList }) => {
  return (
    <List>
      {books.map((book) => (
        <BookDetail
          key={book.id}
          book={book}
          addBookToReadingList={addBookToReadingList}
        />
      ))}
    </List>
  );
};

export default BookList;
