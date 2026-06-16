"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";

export default function DeadlinesPage() {
  const [deadlines, setDeadlines] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [adding, setAdding] = useState(false);

  useEffect(() => { fetchDeadlines(); }, []);

  const fetchDeadlines = async () => {
    try {
      const res = await api.get("/deadlines");
      setDeadlines(res.data);
    } catch (error) {
      console.error("Error fetching deadlines:", error);
    }
  };

  const createDeadline = async () => {
    if (!title.trim() || !dueDate) return alert("Title and due date are required");
    try {
      setAdding(true);
      await api.post("/deadlines", { title, description, dueDate });
      setTitle("");
      setDescription("");
      setDueDate("");
      fetchDeadlines();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add deadline");
    } finally {
      setAdding(false);
    }
  };

  const deleteDeadline = async (deadlineId) => {
    try {
      await api.delete(`/deadlines/${deadlineId}`);
      fetchDeadlines();
    } catch (error) {
      console.error("Error deleting deadline:", error);
    }
  };

  const getDaysLeft = (dueDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    return Math.ceil((due - today) / (1000 * 60 * 60 * 24));
  };

  const getUrgencyStyle = (daysLeft) => {
    if (daysLeft < 0) return { badge: "bg-gray-100 text-gray-500", label: "Overdue" };
    if (daysLeft === 0) return { badge: "bg-red-100 text-red-600", label: "Due Today!" };
    if (daysLeft <= 3) return { badge: "bg-orange-100 text-orange-600", label: `${daysLeft}d left` };
    if (daysLeft <= 7) return { badge: "bg-yellow-100 text-yellow-700", label: `${daysLeft}d left` };
    return { badge: "bg-green-100 text-green-600", label: `${daysLeft}d left` };
  };

  const inputClass = "w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-700 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition";

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900">Deadlines 📅</h1>
        <p className="mt-2 text-gray-500">Keep track of important assignments and exams.</p>
      </div>

      <div className="mb-12 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Add New Deadline</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input type="text" placeholder="e.g. DSA Assignment 3" value={title}
              onChange={(e) => setTitle(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description (optional)</label>
            <textarea placeholder="Any additional details..." value={description}
              onChange={(e) => setDescription(e.target.value)} rows={3} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
            <input type="date" value={dueDate}
              onChange={(e) => setDueDate(e.target.value)} className={inputClass} />
          </div>
          <div className="sm:col-span-2">
            <button onClick={createDeadline} disabled={adding}
              className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
              {adding ? "Adding..." : "📌 Add Deadline"}
            </button>
          </div>
        </div>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">Upcoming Deadlines</h2>
        <span className="text-sm text-gray-400">{deadlines.length} deadline{deadlines.length !== 1 ? "s" : ""}</span>
      </div>

      {deadlines.length === 0 ? (
        <div className="rounded-2xl border border-gray-100 bg-white p-16 text-center shadow-sm">
          <p className="text-5xl mb-4">🎉</p>
          <p className="text-lg font-medium text-gray-700">All clear!</p>
          <p className="text-sm text-gray-400">No upcoming deadlines. Enjoy the break!</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {deadlines.map((deadline) => {
            const daysLeft = getDaysLeft(deadline.dueDate);
            const urgency = getUrgencyStyle(daysLeft);
            return (
              <div key={deadline._id}
                className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-xl hover:-translate-y-1">
                <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold mb-3 ${urgency.badge}`}>
                  ⏰ {urgency.label}
                </span>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{deadline.title}</h3>
                {deadline.description && (
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">{deadline.description}</p>
                )}
                <p className="text-sm font-medium text-gray-600 mb-6">
                  📅 {new Date(deadline.dueDate).toLocaleDateString("en-IN", {
                    day: "numeric", month: "short", year: "numeric",
                  })}
                </p>
                <button onClick={() => deleteDeadline(deadline._id)}
                  className="w-full rounded-xl border-2 border-red-400 py-2 text-sm font-semibold text-red-500 transition-all hover:bg-red-500 hover:text-white active:scale-95">
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}