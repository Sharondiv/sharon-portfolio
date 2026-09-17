"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteProject } from "@/lib/project-actions";

export default function DeleteButton({ id }: { id: string }) {
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    setLoading(true);
    const result = await deleteProject(id);

    if (result?.error) {
      alert(result.error);
      setLoading(false);
      setConfirming(false);
      return;
    }

    router.refresh();
    setLoading(false);
    setConfirming(false);
  }

  if (!confirming) {
    return (
      <button
        onClick={() => setConfirming(true)}
        className="text-sm text-red-500 hover:text-red-700 font-medium"
      >
        Delete
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleDelete}
        disabled={loading}
        className="text-sm text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded font-medium disabled:opacity-50"
      >
        {loading ? "Deleting..." : "Confirm"}
      </button>
      <button
        onClick={() => setConfirming(false)}
        disabled={loading}
        className="text-sm text-slate-500 hover:text-slate-700"
      >
        Cancel
      </button>
    </div>
  );
}