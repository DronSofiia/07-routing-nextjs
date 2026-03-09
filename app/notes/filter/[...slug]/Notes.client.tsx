"use client";

import { useState } from "react";
import css from "./Notes.client.module.css";

import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";

import { useDebouncedCallback } from "use-debounce";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { fetchNotes, fetchNotesByCategory } from "@/lib/api";
import { NoteTag } from "@/types/note";

interface Props {
  tag?: NoteTag;
}

export default function NotesClient({ tag }: Props) {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

  const handleSearch = useDebouncedCallback((value: string) => {
    setQuery(value);
    setPage(1);
  }, 500);

  const { data, isError, isLoading } = useQuery({
    queryKey: ["notes", page, query, tag],

    queryFn: () =>
      tag
        ? fetchNotesByCategory({
            currentPage: page,
            searchText: query,
            noteTag: tag,
          })
        : fetchNotes(query, page),

    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  if (isLoading) {
    return <p className={css.loading}>Loading notes...</p>;
  }

  if (isError) {
    return <p className={css.error}>Failed to load notes</p>;
  }

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={handleSearch} />

        {totalPages > 1 && (
          <Pagination
            pageCount={totalPages}
            onPageChange={setPage}
            currentPage={page}
          />
        )}

        <button className={css.button} onClick={() => setModalOpen(true)}>
          Create note +
        </button>
      </header>

      {notes.length > 0 && <NoteList notes={notes} />}

      {isModalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <NoteForm onClose={() => setModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}