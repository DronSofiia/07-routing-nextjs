import NoteList from "@/components/NoteList/NoteList";
import { fetchNotes } from "@/lib/api";

interface FilterPageProps{
    params: Promise<{ tag: string }>;
}


export default async function FitlerPage({ params }: FilterPageProps) {
    const { tag } = await params;

    const data =
    tag === "all"
      ? await fetchNotes("", 1)
      : await fetchNotes("", 1, tag);

    return <NoteList notes={data.notes}/>
}