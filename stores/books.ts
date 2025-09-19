import { ref } from 'vue';
import type { Book } from '../types/types';
export const useBooksStore = defineStore('books', () => {
  const books = ref<Record<string, Book>>({});
  const statistics = ref({
    booksCompleted: 0,
    currentlyReading: 0,
    wishlist: 0,
    pagesRead: 0,
  });
  const loading = ref(false);

  /**
   * Fetch books from the API only if books are empty
   * or force is true (typically after adding a new book)
   */
  async function fetchBooks(force = false) {
    if (!Object.keys(books.value)?.length || force) {
      loading.value = true;
      try {
        return $fetch('/api/books').then((data: Book[]) => {
          books.value = {};
          data.forEach((book) => {
            books.value[book.id] = book;
          });
          loading.value = false;
        });
      } catch (error) {
        console.error('Failed to fetch books:', error);
      }
    }
  }

  async function getStatistics() {
    await fetchBooks();

    if (!books.value || !Object.keys(books.value).length) return;

    const booksCompleted = Object.values<Book>(books.value).filter(
      (book) => book.status === 'completed',
    ).length;
    const currentlyReading = Object.values<Book>(books.value).filter(
      (book) => book.status === 'reading',
    ).length;
    const wishlist = Object.values<Book>(books.value).filter(
      (book) => book.status === 'wishlist',
    ).length;
    const pagesRead = Object.values<Book>(books.value).reduce(
      (total, book) => total + book.pages_read || 0,
      0,
    );

    statistics.value = {
      booksCompleted,
      currentlyReading,
      wishlist,
      pagesRead,
    };
  }

  return {
    books,
    statistics,
    loading,
    fetchBooks,
    getStatistics,
  };
});
