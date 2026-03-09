"use client";

export default function Error({
  error,
}: {
  error: Error;
}) {
  return (
    <p>Ops something went wrong... {error.message}</p>
  );
}