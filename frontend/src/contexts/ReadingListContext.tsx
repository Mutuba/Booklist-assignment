import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from "react";
import { Book } from "../interfaces/Book";

interface ReadingListContextProps {
  readingList: Book[];
  addBookToReadingList: (book: Book) => void;
  removeBookFromReadingList: (book: Book) => void;
}

interface ReadingListProviderProps {
  children: ReactNode;
  value?: {
    readingList?: Book[];
    addBookToReadingList?: (book: Book) => void;
    removeBookFromReadingList?: (book: Book) => void;
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
  value,
}) => {
  const [internalReadingList, setReadingList] = useState<Book[]>(
    value?.readingList ?? []
  );

  const addBookToReadingList =
    value?.addBookToReadingList ??
    ((book: Book) => {
      if (
        !internalReadingList.some(
          (internalReadingListBook) => internalReadingListBook.id === book.id
        )
      ) {
        setReadingList((prevReadingList) => [...prevReadingList, book]);
      }
    });

  const removeBookFromReadingList =
    value?.removeBookFromReadingList ??
    ((book: Book) => {
      setReadingList((prevReadingList) =>
        prevReadingList.filter(
          (prevReadingListBook) => prevReadingListBook.id !== book.id
        )
      );
    });

  const contextValue = useMemo(
    () => ({
      readingList: internalReadingList,
      addBookToReadingList,
      removeBookFromReadingList,
    }),
    [internalReadingList, addBookToReadingList, removeBookFromReadingList]
  );

  return (
    <ReadingListContext.Provider value={contextValue}>
      {children}
    </ReadingListContext.Provider>
  );
};

export default ReadingListContext;
