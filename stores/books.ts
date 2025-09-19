import { defineStore } from 'pinia';
import type { Book } from '../types/types';

export const useBooksStore = defineStore('books', {
  state: () => ({
    books: {} as Record<string, Book>,
    statistics: {
      booksCompleted: 0,
      currentlyReading: 0,
      wishlist: 0,
      pagesRead: 0,
    },
    loading: false,
  }),
  actions: {
    /**
     * Fetch books from the API only if books are empty
     * or force is true (typically after adding a new book)
     */
    async fetchBooks(force = false) {
      if (!Object.keys(this.books)?.length || force) {
        this.loading = true;

        try {
          return $fetch('/api/books').then((data: Book[]) => {
            this.books = {};

            console.log('data', data);

            data.forEach((book) => {
              this.books[book.id] = book;
            });

            this.loading = false;
          });
        } catch (error) {
          console.error('Failed to fetch books:', error);
        }
      }
    },
    async getStatistics() {
      await this.fetchBooks();

      if (!this.books || !Object.keys(this.books).length) return;

      const booksCompleted = Object.values<Book>(this.books).filter(
        (book) => book.status === 'completed',
      ).length;
      const currentlyReading = Object.values<Book>(this.books).filter(
        (book) => book.status === 'reading',
      ).length;
      const wishlist = Object.values<Book>(this.books).filter(
        (book) => book.status === 'wishlist',
      ).length;
      const pagesRead = Object.values<Book>(this.books).reduce(
        (total, book) => total + book.pages_read,
        0,
      );

      this.statistics = {
        booksCompleted,
        currentlyReading,
        wishlist,
        pagesRead,
      };
    },
  },
});
