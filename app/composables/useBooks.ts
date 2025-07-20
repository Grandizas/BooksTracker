import type { Book, NewBook } from "~~/types/types";
import { useSupabaseClient, useSupabaseUser } from "#imports";

export function useBooks() {
  const client = useSupabaseClient();
  const user = useSupabaseUser();
  const books = ref<Book[]>([]);
  const loading = ref(false);
  const error = ref<null | string>(null);

  const fetchBooks = async () => {
    loading.value = true;
    error.value = null;

    const { data, error: fetchError } = await client
      .from("books")
      .select("*")
      .order("inserted_at", { ascending: false });

    if (fetchError) {
      error.value = fetchError.message;
    } else {
      books.value = data as Book[];
    }

    loading.value = false;
  };

  const addBook = async (payload: NewBook) => {
    console.log(payload);
    // if (!user.value) throw new Error("User not authenticated");
    //
    // const { data, error: insertError } = await client
    //   .from<Book>("books")
    //   .insert([{ ...payload, user_id: user.value.id }])
    //   .single();
    //
    // if (insertError) throw insertError;
    //
    // books.value.unshift(data as Book);
  };

  const uploadCover = async (file: File): Promise<string> => {
    if (!user.value) throw new Error("User not authenticated");

    const filename = `${user.value.id}/${crypto.randomUUID()}.${file.name.split(".").pop()}`;
    const { error: uploadError } = await client.storage
      .from("covers")
      .upload(filename, file);

    if (uploadError) throw uploadError;

    const { data } = client.storage.from("covers").getPublicUrl(filename);
    return data.publicUrl;
  };

  return {
    books,
    loading,
    error,
    fetchBooks,
    addBook,
    uploadCover,
  };
}
