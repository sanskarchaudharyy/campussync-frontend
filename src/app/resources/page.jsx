"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { useAuth } from "@/context/AuthContext";

export default function ResourcesPage() {
  const { user } = useAuth();
  const [resources, setResources] = useState([]);
  const [form, setForm] = useState({
    title: "", description: "", subject: "",
    type: "Notes", branch: "", year: "",
  });
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const fetchResources = async () => {
    try {
      const res = await api.get("/resources");
      setResources(res.data);
    } catch (err) {
      console.error("Failed to fetch resources:", err);
    }
  };

  useEffect(() => { fetchResources(); }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a PDF file");
    try {
      setUploading(true);
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => formData.append(key, value));
      formData.append("file", file);
      await api.post("/resources", formData, { headers: { "Content-Type": "multipart/form-data" } });
      alert("Resource uploaded successfully 🎉");
      setForm({ title: "", description: "", subject: "", type: "Notes", branch: "", year: "" });
      setFile(null);
      fetchResources();
    } catch (err) {
      alert(err.response?.data?.error || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDownload = async (resource) => {
    try {
      await api.patch(`/resources/${resource._id}/download`);
      window.open(resource.fileUrl, "_blank");
      fetchResources();
    } catch (err) {
      alert("Download failed");
    }
  };

  const inputClass = "w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-700 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition";

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">

      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900">Resources 📚</h1>
        <p className="mt-2 text-gray-500">Share notes, PYQs, and study materials with your peers.</p>
      </div>

      {/* Upload Form */}
      {user && (
        <div className="mb-12 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Upload a Resource</h2>

          <form onSubmit={handleUpload} className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text" placeholder="e.g. OS Notes Unit 1"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required className={inputClass}
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <input
                type="text" placeholder="Brief description (optional)"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input
                type="text" placeholder="e.g. DSA"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                required className={inputClass}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className={inputClass}
              >
                <option value="Notes">Notes</option>
                <option value="PYQ">PYQ</option>
                <option value="Slides">Slides</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Branch</label>
              <input
                type="text" placeholder="e.g. CSE"
                value={form.branch}
                onChange={(e) => setForm({ ...form, branch: e.target.value })}
                required className={inputClass}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
              <input
                type="text" placeholder="e.g. 2nd Year"
                value={form.year}
                onChange={(e) => setForm({ ...form, year: e.target.value })}
                required className={inputClass}
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">PDF File</label>
              <input
                type="file" accept=".pdf"
                onChange={(e) => setFile(e.target.files[0])}
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-500 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-1.5 file:text-sm file:font-medium file:text-blue-700 hover:file:bg-blue-100 transition cursor-pointer"
              />
            </div>

            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={uploading}
                className="w-full rounded-xl bg-blue-600 py-3 text-white font-semibold transition-all hover:bg-blue-700 hover:shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading ? "Uploading..." : "⬆️ Upload (+10 points)"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Resources Grid */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Available Resources</h2>
        <p className="text-sm text-gray-400 mt-1">{resources.length} resource{resources.length !== 1 ? "s" : ""} found</p>
      </div>

      {resources.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-5xl mb-4">📭</p>
          <p className="text-lg font-medium">No resources yet</p>
          <p className="text-sm">Be the first to upload study material!</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => (
            <div
              key={resource._id}
              className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Type Badge */}
              <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 mb-3">
                {resource.type}
              </span>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-snug">
                📄 {resource.title}
              </h3>

              {/* Meta */}
              <div className="space-y-1 mb-4">
                <p className="text-sm text-gray-500">
                  📖 {resource.subject} &nbsp;|&nbsp; 🏛️ {resource.branch}
                </p>
                <p className="text-sm text-gray-500">
                  🎓 {resource.year}
                </p>
                <p className="text-sm text-gray-400">
                  👤 {resource.uploadedBy?.name || "Unknown"}
                </p>
                <p className="text-sm text-gray-400">
                  ⬇️ {resource.downloads} downloads
                </p>
              </div>

              {/* Download Button */}
              <button
                onClick={() => handleDownload(resource)}
                className="w-full rounded-xl bg-blue-600 py-2.5 text-sm text-white font-medium transition-all hover:bg-blue-700 hover:shadow-md active:scale-95 group-hover:bg-blue-700"
              >
                Download
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}