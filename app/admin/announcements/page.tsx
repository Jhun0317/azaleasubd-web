"use client";

import { useState } from "react";

export default function AdminAnnouncementsPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [priority, setPriority] = useState("normal");
  const [isPinned, setIsPinned] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await fetch("/api/admin/announcements", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        content,
        priority,
        isPinned,
      }),
    });

    setTitle("");
    setContent("");
    setIsPinned(false);
    alert("Announcement posted");
  }

  return (
    <div className="max-w-xl space-y-4">
      <h1 className="text-xl font-bold">Post Announcement</h1>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          className="border p-2 w-full rounded"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="border p-2 w-full rounded"
          placeholder="Announcement content"
          rows={5}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <select
          className="border p-2 w-full rounded"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="normal">Normal</option>
          <option value="important">Important</option>
          <option value="urgent">Urgent</option>
        </select>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={isPinned}
            onChange={(e) => setIsPinned(e.target.checked)}
          />
          Pin this announcement
        </label>

        <button className="bg-emerald-600 text-white px-4 py-2 rounded">
          Post Announcement
        </button>
      </form>
    </div>
  );
}
