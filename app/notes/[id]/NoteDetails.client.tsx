"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import css from "./NoteDetails.module.css";

interface NoteDetailsClientProps {
  noteId: string;
}

export default function NoteDetailsClient({ noteId }: NoteDetailsClientProps) {
  const { data: note, isLoading, isError } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (isError || !note) return <p>Could not fetch note details.</p>;

  return (
    <div className={css.container}>
        <div className={css.item}>
              <h2 >{note.title}</h2>
        </div>
        <p className={css.tag}>Tag: {note.tag}</p>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>Created: {note.createdAt ? new Date(note.createdAt).toLocaleDateString() : "—"}</p>
    </div>
  );
}