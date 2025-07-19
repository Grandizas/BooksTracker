# 📚 My Reading Tracker

A fun, personal web app to track your reading progress — built with **Nuxt 3** and **Supabase**.

- Track pages read per book
- Add books to wishlist
- View completed books
- Upload and store book cover images
- Mobile‑friendly, playful UI

---

## 🚀 Tech Stack

- [Nuxt 3](https://nuxt.com/)
- [Supabase](https://supabase.com/) (PostgreSQL, Auth, Storage)
- [Tailwind CSS](https://tailwindcss.com/)
- TypeScript

---

## 📸 Features

| Feature             | Description                                      |
|--------------------|--------------------------------------------------|
| ✅ Add books        | Title, author, page count, cover upload          |
| 📖 Track progress   | See how many pages you've read                   |
| 📚 Wishlist         | Books you want to read next                      |
| 🏁 Completed list   | Celebrate finished books with notes              |
| ☁️ Cloud storage    | Book cover images stored in Supabase             |
| 🔐 Optional auth    | Email/password login (if enabled in Supabase)    |

---

## ⚙️ Setup

```bash
# Clone the repo
git clone https://github.com/your-username/reading-tracker.git
cd reading-tracker

# Install dependencies
npm install

# Create .env file
cp .env.example .env



Add to .env:
SUPABASE_URL= https://your-project.supabase.co
SUPABASE_ANON_KEY= your-anon-key
⚠️ Make sure RLS is enabled and policies are configured in Supabase

Go to SQL Editor:
create table books (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid references auth.users(id),
  title       text not null,
  author      text,
  total_pages int,
  pages_read  int default 0,
  status      text default 'wishlist',
  cover_url   text,
  notes       text,
  inserted_at timestamptz default now()
);

alter table books enable row level security;

create policy "Users can CRUD own books"
  on books
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);


Create storage -> covers


This project is for personal use — but feel free to fork and customize it! MIT License.
