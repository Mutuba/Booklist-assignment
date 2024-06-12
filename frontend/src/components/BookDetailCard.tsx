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
import DividerVariants from "./shared/CustomDivider";
import { Book } from "../interfaces/Book";
import { useCoverPhotoURL } from "../../useCoverPhotoURL";

interface BookDetailCardProps {
  book: Book;
  removeBookFromReadingList: (book: Book) => void;
}

const BookDetailCard: React.FC<BookDetailCardProps> = ({
  book,
  removeBookFromReadingList,
}) => {
  const avatarSrc = useCoverPhotoURL(book.coverPhotoURL);

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
            onClick={() => removeBookFromReadingList(book)}
          >
            Remove from Reading List
          </Button>
        </CardActions>
      </Card>
      <DividerVariants />
    </Grid>
  );
};

export default BookDetailCard;
