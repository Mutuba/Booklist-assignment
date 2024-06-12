import React, { createContext, useContext, useState, ReactNode } from "react";
import { Book } from "../interfaces/Book";

interface ReadingListContextProps {
  readingList: Book[];
  addBookToReadingList: (book: Book) => void;
  removeBookFromReadingList: (book: Book) => void;
}
interface ReadingListProviderProps {
  children: ReactNode;
  value?: {
    readingList: Book[];
  };
}

const ReadingListContext = createContext<ReadingListContextProps | null>(null);

export const useReadingList = () => {
  const context = useContext(ReadingListContext);
  if (!context) {
    throw new Error("useReadingList must be used within a ReadingListProvider");
  }
  return context;
};

export const ReadingListProvider: React.FC<ReadingListProviderProps> = ({
  children,
}) => {
  const [readingList, setReadingList] = useState<Book[]>([]);

  const addBookToReadingList = (book: Book) => {
    setReadingList((prevList) => [...prevList, book]);
  };

  const removeBookFromReadingList = (book: Book) => {
    setReadingList((prevList) => prevList.filter((b) => b.id !== book.id));
  };

  return (
    <ReadingListContext.Provider
      value={{ readingList, addBookToReadingList, removeBookFromReadingList }}
    >
      {children}
    </ReadingListContext.Provider>
  );
};

export default ReadingListContext;
