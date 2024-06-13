/* eslint-disable quotes */
import { booksData } from "../data/books";

export const resolvers = {
  Query: {
    books: () => {
      // Simulating a delay of 5 seconds before resolving
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(booksData);
        }, 5000); // 2000 milliseconds = 2 seconds
      });
    },
  },
};
