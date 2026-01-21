import { prisma } from "@/lib/prisma";

export default async function DocumentsPage() {
  const documents = await prisma.document.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Documents</h1>

      <div className="bg-white rounded-xl border">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center justify-between p-4 border-b"
          >
            <div>
              <p className="font-medium">{doc.title}</p>
              <p className="text-xs text-slate-500">
                {new Date(doc.createdAt).toLocaleDateString()}
              </p>
            </div>

            <a
              href={doc.fileUrl}
              download
              className="text-emerald-600 font-medium"
            >
              Download
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
