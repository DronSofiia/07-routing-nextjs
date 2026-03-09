import axios from "axios";
import type { Note, NoteCreate, NoteId, NoteTag } from "../types/note";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

axios.defaults.headers.common.Authorization =
  `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`;

interface FetchNotesProps {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesByCategoryParam{
    currentPage: number;
	searchText: string;
	noteTag: NoteTag
}

export async function fetchNotes(
    search: string,
    page: number,
  ): Promise<FetchNotesProps> {
    const { data } = await axios.get<FetchNotesProps>("/notes", {
        params: {
            search,
            page,
            perPage: 10,
          },
    });
  
    return data;
};

export async function FetchNotesByCategory({ currentPage, searchText, noteTag }: FetchNotesByCategoryParam): Promise<FetchNotesProps>{
    const { data } = await axios.get<FetchNotesProps>("/", {
        params: {
            search: searchText || "",
            tag: noteTag,
            page: currentPage,
            perPage: 12
        }
    });
    return data;
}

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