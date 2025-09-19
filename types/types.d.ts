export type BookStatus = 'reading' | 'wishlist' | 'paused' | 'completed';

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
  rating?: number; // 1 to 5
}

export type NewBook = Omit<Book, 'id' | 'user_id' | 'inserted_at'>;

export type Languages = 'en' | 'lt';

export type StatisticsColorScheme =
  | 'yellow'
  | 'blue'
  | 'red'
  | 'green'
  | 'black';
