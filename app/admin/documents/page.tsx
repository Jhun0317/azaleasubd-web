"use client";

import { useState } from "react";

export default function AdminDocumentsPage() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);

    await fetch("/api/admin/documents/upload", {
      method: "POST",
      body: formData,
    });

    setTitle("");
    setFile(null);
    alert("Uploaded!");
  }

  return (
    <div className="max-w-lg space-y-4">
      <h1 className="text-xl font-bold">Upload Document</h1>

      <form onSubmit={handleUpload} className="space-y-3">
        <input
          className="border p-2 w-full"
          placeholder="Document title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        <button className="bg-emerald-600 text-white px-4 py-2 rounded">
          Upload
        </button>
      </form>
    </div>
  );
}
