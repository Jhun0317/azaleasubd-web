"use client";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white p-8 rounded-xl shadow-sm w-full max-w-sm">
        <h1 className="text-xl font-bold mb-4">Login</h1>

        <button
          className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700"
          onClick={() => {
            document.cookie = "session=valid; path=/";
            window.location.href = "/dashboard";
          }}
        >
          Mock Login
        </button>
      </div>
    </div>
  );
}
