"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import NotePreview from "@/components/NotePreview/NotePreview";

export default function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  return (
    <Modal onClose={() => router.back()}>
      <NotePreview id={id} />
    </Modal>
  );
}