import { useState, SetStateAction, Dispatch } from "react";

interface PaginationOptions {
  initialPage?: number;
  itemsPerPage: number;
}

interface PaginationResult<T> {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  currentItems: T[];
  totalPages: number;
}

function usePagination<T>(
  data: T[],
  options: PaginationOptions
): PaginationResult<T> {
  const { initialPage = 1, itemsPerPage } = options;
  const [currentPage, setCurrentPage] = useState(initialPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  return {
    currentPage,
    setCurrentPage,
    currentItems,
    totalPages,
  };
}

export default usePagination;
