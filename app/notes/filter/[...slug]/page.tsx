import { fetchNotes } from "@/lib/api";
import NotesList from "@/components/NoteList/NoteList";

interface Props {
  params: Promise<{ slug: string[] }>;
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const tag = slug?.[0];

  const data =
    tag === "all"
      ? await fetchNotes("", 1)
      : await fetchNotes("", 1, tag);

  return <NotesList notes={data.notes} />;
}