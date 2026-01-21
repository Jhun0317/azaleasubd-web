"use client";

import { useEffect, useState } from "react";

type Profile = {
  fullName: string;
  lotNumber: string;
  phone?: string;
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile>({
    fullName: "",
    lotNumber: "",
    phone: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => {
        if (data) setProfile(data);
        setLoading(false);
      });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    });

    alert("Profile saved");
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-xl space-y-6">
      <h1 className="text-xl font-bold">My Profile</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="border p-2 w-full rounded"
          placeholder="Full Name"
          value={profile.fullName}
          onChange={(e) =>
            setProfile({ ...profile, fullName: e.target.value })
          }
        />

        <input
          className="border p-2 w-full rounded"
          placeholder="Lot / Unit Number"
          value={profile.lotNumber}
          onChange={(e) =>
            setProfile({ ...profile, lotNumber: e.target.value })
          }
        />

        <input
          className="border p-2 w-full rounded"
          placeholder="Phone Number"
          value={profile.phone || ""}
          onChange={(e) =>
            setProfile({ ...profile, phone: e.target.value })
          }
        />

        <button className="bg-emerald-600 text-white px-4 py-2 rounded">
          Save Profile
        </button>
      </form>
    </div>
  );
}
