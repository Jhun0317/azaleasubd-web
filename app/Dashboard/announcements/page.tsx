import { prisma } from "@/lib/prisma";

export default async function AnnouncementsPage() {
  const announcements = await prisma.announcement.findMany({
    orderBy: [
      { isPinned: "desc" },
      { createdAt: "desc" },
    ],
  });

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Announcements</h1>

      <div className="space-y-3">
        {announcements.map((a) => (
          <div
            key={a.id}
            className="bg-white border rounded-xl p-4"
          >
            <div className="flex items-center gap-2">
              {a.isPinned && (
                <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded">
                  PINNED
                </span>
              )}
              <h3 className="font-semibold">{a.title}</h3>
            </div>

            <p className="text-sm text-slate-600 mt-2">
              {a.content}
            </p>

            <p className="text-xs text-slate-400 mt-3">
              {new Date(a.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
