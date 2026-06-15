"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios"; // Change to "@/lib/api" if your file is api.js
import { useAuth } from "@/context/AuthContext";

export default function ResourcesPage() {
  const { user } = useAuth();

  const [resources, setResources] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    subject: "",
    type: "Notes",
    branch: "",
    year: "",
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

  useEffect(() => {
    fetchResources();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      return alert("Please select a PDF file");
    }

    try {
      setUploading(true);

      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });

      formData.append("file", file);

      await api.post("/resources", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Resource uploaded successfully 🎉");

      setForm({
        title: "",
        description: "",
        subject: "",
        type: "Notes",
        branch: "",
        year: "",
      });

      setFile(null);

      fetchResources();
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.error || "Upload failed"
      );
    } finally {
      setUploading(false);
    }
  };

  const handleDownload = async (resource) => {
    try {
      await api.patch(
        `/resources/${resource._id}/download`
      );

      window.open(resource.fileUrl, "_blank");

      fetchResources();
    } catch (err) {
      console.error(err);

      alert("Download failed");
    }
  };

  return (
    <div>
      <div
        style={{
          padding: "24px",
          fontFamily: "sans-serif",
        }}
      >
        <h1>Resources</h1>

        {user && (
          <form
            onSubmit={handleUpload}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              maxWidth: "450px",
              marginBottom: "30px",
            }}
          >
            <h3>Upload a Resource</h3>

            <input
              type="text"
              placeholder="Title"
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title: e.target.value,
                })
              }
              required
            />

            <input
              type="text"
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="Subject (e.g. DSA)"
              value={form.subject}
              onChange={(e) =>
                setForm({
                  ...form,
                  subject: e.target.value,
                })
              }
              required
            />

            <select
              value={form.type}
              onChange={(e) =>
                setForm({
                  ...form,
                  type: e.target.value,
                })
              }
            >
              <option value="Notes">
                Notes
              </option>

              <option value="PYQ">
                PYQ
              </option>

              <option value="Slides">
                Slides
              </option>
            </select>

            <input
              type="text"
              placeholder="Branch (e.g. CSE)"
              value={form.branch}
              onChange={(e) =>
                setForm({
                  ...form,
                  branch: e.target.value,
                })
              }
              required
            />

            <input
              type="text"
              placeholder="Year (e.g. 2nd Year)"
              value={form.year}
              onChange={(e) =>
                setForm({
                  ...form,
                  year: e.target.value,
                })
              }
              required
            />

            <input
              type="file"
              accept=".pdf"
              onChange={(e) =>
                setFile(e.target.files[0])
              }
              required
            />

            <button
              type="submit"
              disabled={uploading}
            >
              {uploading
                ? "Uploading..."
                : "Upload (+10 points)"}
            </button>
          </form>
        )}

        <h2>All Resources</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "16px",
          }}
        >
          {resources.map((resource) => (
            <div
              key={resource._id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "16px",
              }}
            >
              <h3>{resource.title}</h3>

              <p>
                {resource.subject} •{" "}
                {resource.type}
              </p>

              <p>
                {resource.branch} •{" "}
                {resource.year}
              </p>

              <p
                style={{
                  fontSize: "14px",
                  color: "#666",
                }}
              >
                Uploaded by:{" "}
                {resource.uploadedBy?.name ||
                  "Unknown"}
              </p>

              <p
                style={{
                  fontSize: "14px",
                  color: "#666",
                }}
              >
                Downloads:{" "}
                {resource.downloads}
              </p>

              <button
                onClick={() =>
                  handleDownload(resource)
                }
              >
                Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}