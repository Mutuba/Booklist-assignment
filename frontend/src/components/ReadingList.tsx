import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  Typography,
  Card,
  CardContent,
} from "@mui/material";

interface Book {
  title: string;
  author: string;
  coverPhotoURL: string;
  readingLevel: string;
}

interface ReadingListProps {
  books: Book[];
  removeBookFromReadingList: (book: Book) => void;
}

const ReadingList: React.FC<ReadingListProps> = ({
  books,
  removeBookFromReadingList,
}) => {
  return (
    <div style={{ marginTop: "8rem" }}>
      <Typography variant="h2" gutterBottom>
        Reading List
      </Typography>
      <Card style={{ maxHeight: "600px", overflowY: "auto" }}>
        <CardContent>
          <List>
            {books.map((book) => (
              <ListItem key={book.title}>
                <ListItemText primary={book.title} secondary={book.author} />
                <ListItemSecondaryAction>
                  <Button
                    variant="contained"
                    style={{ color: "#fff" }}
                    onClick={() => removeBookFromReadingList(book)}
                  >
                    Remove
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReadingList;
