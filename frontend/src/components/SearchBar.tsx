import React from "react";
import { TextField, Autocomplete } from "@mui/material";
import BookDetail from "./BookDetail";

interface Book {
  title: string;
  author: string;
  coverPhotoURL: string;
  readingLevel: string;
}

interface SearchBarProps {
  books: Book[];
  setSearchResults: React.Dispatch<React.SetStateAction<Book[]>>;
  addBookToReadingList: (book: Book) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  books,
  setSearchResults,
  addBookToReadingList,
}) => {
  return (
    <Autocomplete
      disablePortal
      options={books}
      getOptionLabel={(option) => option.title}
      filterOptions={(options, { inputValue }) =>
        options.filter((option) =>
          option.title.toLowerCase().includes(inputValue.toLowerCase())
        )
      }
      onChange={(_event, value) => {
        setSearchResults(value ? [value] : []);
      }}
      renderOption={(_props, option) => (
        <BookDetail book={option} addBookToReadingList={addBookToReadingList} />
      )}
      style={{
        width: "100%",
      }}
      renderInput={(params) => <TextField {...params} />}
    />
  );
};

export default SearchBar;
