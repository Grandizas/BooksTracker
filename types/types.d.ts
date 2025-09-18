export type BookStatus = 'reading' | 'wishlist' | 'completed';

export interface Book {
  id: string;
  user_id: string;
  title: string;
  author?: string;
  total_pages: number;
  pages_read: number;
  status: BookStatus;
  cover_url?: string;
  notes?: string;
  inserted_at: string;
}

export type NewBook = Omit<Book, 'id' | 'user_id' | 'inserted_at'>;

export type Languages = 'en' | 'lt';

export type StatisticsColorScheme =
  | 'yellow'
  | 'blue'
  | 'red'
  | 'green'
  | 'black';
