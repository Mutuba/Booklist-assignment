import React from "react";
import CardActions from "@mui/material/CardActions";
import {
  Box,
  Button,
  Card,
  Grid,
  CardContent,
  Avatar,
  Typography,
} from "@mui/material";
import { Book } from "../interfaces/Book";
import { useCoverPhotoURL } from "../../useCoverPhotoURL";
import { useLoading } from "../contexts/LoadingContext";
import { useReadingList } from "../contexts/ReadingListContext";
import { useSnackbarAlert } from "../contexts/SnackbarAlertContext";

interface BookDetailCardProps {
  book: Book;
}

const BookDetailCard: React.FC<BookDetailCardProps> = ({ book }) => {
  const avatarSrc = useCoverPhotoURL(book.coverPhotoURL);
  const { setIsLoading } = useLoading();
  const { removeBookFromReadingList } = useReadingList();
  const { setShowSnackbarAlert, triggerSnackbarAlert } = useSnackbarAlert();

  const handleRemoveBook = async (book: Book) => {
    setIsLoading(true);
    removeBookFromReadingList(book);
    setIsLoading(false);
    setShowSnackbarAlert(true);
    triggerSnackbarAlert("Book removed from reading list");
  };

  return (
    <Grid item md={4} sm={12} xs={12}>
      <Card
        sx={{
          maxWidth: 345,
          minHeight: 350,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <Avatar
              src={avatarSrc}
              alt={book.title}
              sx={{ width: 56, height: 56 }}
            />
          </Box>
          <Typography
            gutterBottom
            variant="h5"
            color="textSecondary"
            component="div"
            textAlign="center"
          >
            {book.title}
          </Typography>
          <Typography
            component="div"
            variant="body2"
            color="textSecondary"
            textAlign="center"
          >
            Author: {book.author}
          </Typography>
          <Typography
            component="div"
            variant="body2"
            color="textSecondary"
            textAlign="center"
          >
            Level: {book.readingLevel}
          </Typography>
        </CardContent>
        <CardActions sx={{ mt: "auto", pb: 2, justifyContent: "center" }}>
          <Button
            variant="contained"
            size="small"
            data-testid={`remove-book-button-${book.id}`}
            sx={{ color: "#fff", mb: 2, textTransform: "none" }}
            onClick={() => handleRemoveBook(book)}
          >
            Remove from Reading List
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default BookDetailCard;
