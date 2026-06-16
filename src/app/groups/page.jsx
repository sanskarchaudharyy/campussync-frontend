"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const API = "https://campussync-backend-1.onrender.com/api";

export default function GroupsPage() {
  const [groups, setGroups] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [creating, setCreating] = useState(false);

  useEffect(() => { fetchGroups(); }, []);

  const getToken = () => localStorage.getItem("token");

  const fetchGroups = async () => {
    try {
      const res = await axios.get(`${API}/groups`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setGroups(res.data);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  const createGroup = async () => {
    if (!name.trim()) return alert("Group name is required");
    try {
      setCreating(true);
      await axios.post(`${API}/groups`, { name, description }, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setName("");
      setDescription("");
      fetchGroups();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create group");
    } finally {
      setCreating(false);
    }
  };

  const joinGroup = async (groupId) => {
    try {
      await axios.post(`${API}/groups/${groupId}/join`, {}, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      fetchGroups();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to join group");
    }
  };

  const inputClass = "w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-700 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition";

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">

      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900">Study Groups 👥</h1>
        <p className="mt-2 text-gray-500">Collaborate, discuss, and learn together.</p>
      </div>

      {/* Create Group Form */}
      <div className="mb-12 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Create New Group</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Group Name</label>
            <input
              type="text"
              placeholder="e.g. DSA Study Circle"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              placeholder="What is this group about?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className={inputClass}
            />
          </div>

          <div className="sm:col-span-2">
            <button
              onClick={createGroup}
              disabled={creating}
              className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {creating ? "Creating..." : "➕ Create Group"}
            </button>
          </div>
        </div>
      </div>

      {/* Groups Grid */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">All Groups</h2>
        <span className="text-sm text-gray-400">{groups.length} group{groups.length !== 1 ? "s" : ""}</span>
      </div>

      {groups.length === 0 ? (
        <div className="rounded-2xl border border-gray-100 bg-white p-16 text-center shadow-sm">
          <p className="text-5xl mb-4">👥</p>
          <p className="text-lg font-medium text-gray-700">No groups yet</p>
          <p className="text-sm text-gray-400">Be the first to create a study group!</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <div
              key={group._id}
              className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Group Name */}
              <h3 className="text-xl font-bold text-gray-900 mb-2">{group.name}</h3>

              {/* Description */}
              {group.description && (
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{group.description}</p>
              )}

              {/* Members */}
              <div className="flex items-center gap-2 mb-6">
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                  👥 {group.members.length} member{group.members.length !== 1 ? "s" : ""}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => joinGroup(group._id)}
                  className="flex-1 rounded-xl border-2 border-green-500 py-2 text-sm font-semibold text-green-600 transition-all hover:bg-green-500 hover:text-white active:scale-95"
                >
                  Join
                </button>

                <Link href={`/groups/${group._id}`} className="flex-1">
                  <button className="w-full rounded-xl bg-blue-600 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-md active:scale-95">
                    Open Chat 💬
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}