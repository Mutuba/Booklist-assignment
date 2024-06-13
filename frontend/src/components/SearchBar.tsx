import React from "react";
import { TextField, Autocomplete } from "@mui/material";
import BookDetail from "./BookDetail";
import CustomDivider from "./shared/CustomDivider";
import { Book } from "../interfaces/Book";

interface SearchBarProps {
  books: Book[];
  setSearchResults: React.Dispatch<React.SetStateAction<Book[]>>;
}

const SearchBar: React.FC<SearchBarProps> = ({ books, setSearchResults }) => {
  return (
    <Autocomplete
      data-testid={"search-results-autocomplete"}
      disablePortal
      options={books}
      getOptionLabel={(option) => option.title}
      filterOptions={(options, { inputValue }) =>
        options?.filter((option) =>
          option.title.toLowerCase().includes(inputValue.toLowerCase())
        )
      }
      onChange={(_event, value) => {
        setSearchResults(value ? [value] : []);
      }}
      renderOption={(_props, option) => (
        <div key={option.id}>
          <BookDetail book={option} />
          <CustomDivider />
        </div>
      )}
      style={{
        width: "100%",
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search Books "
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
