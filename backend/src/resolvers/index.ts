/* eslint-disable quotes */
import { booksData } from "../data/books";

export const resolvers = {
  Query: {
    books: () => {
      // Simulating a delay of 5 seconds before resolving
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(booksData);
        }, 2000);
      });
    },
  },
};
