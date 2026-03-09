import axios from "axios";
import type { Note, NoteCreate, NoteId } from "../types/note";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

axios.defaults.headers.common.Authorization =
  `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`;

interface FetchNotesProps {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(
    search: string,
    page: number,
    tag?: string
  ): Promise<FetchNotesProps> {
    const { data } = await axios.get<FetchNotesProps>("/notes", {
        params: {
            search,
            page,
            perPage: 10,
            ...(tag && tag !== "all" ? { tag } : {}),
          },
    });
  
    return data;
};

export async function createNote(taskData: NoteCreate): Promise<Note> {
  const { data } = await axios.post<Note>("/notes", taskData);
  return data;
};

export async function deleteNote(id: NoteId): Promise<Note> {
  const { data } = await axios.delete<Note>(`/notes/${id}`);
  return data;
};

export async function fetchNoteById(id:string):Promise<Note> {
    const { data } = await axios.get<Note>(`/notes/${id}`);
    return data;
};