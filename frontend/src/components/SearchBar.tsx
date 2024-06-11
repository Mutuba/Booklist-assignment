import React from "react";
import { TextField, Autocomplete } from "@mui/material";
import BookDetail from "./BookDetail";
import CustomDivider from "./CustomDivider";

interface Book {
  id: string;
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
        <div key={option.id}>
          <BookDetail
            book={option}
            addBookToReadingList={addBookToReadingList}
          />
          <CustomDivider />
        </div>
      )}
      style={{
        width: "100%",
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          InputProps={{
            ...params.InputProps,
            endAdornment: null,
          }}
        />
      )}
    />
  );
};

export default SearchBar;
