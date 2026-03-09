import { fetchNoteById } from "@/lib/api";
import css from "./NotePreview.module.css";

interface NotePreviewProps{
    id: string;
}

export default async function NotePreview({ id }: NotePreviewProps) {
    const note = await fetchNoteById(id);

    return (
        <div className={css.container}>
          <h2>{note.title}</h2>
          <p>{note.content}</p>
          <p>{note.tag}</p>
        </div>
      );
}