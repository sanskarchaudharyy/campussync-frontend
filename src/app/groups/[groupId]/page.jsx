"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

export default function GroupChatPage() {
  const { groupId } = useParams();

  const { user } = useAuth();

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:5000/api/messages/${groupId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessages(res.data);

    } catch (error) {
      console.error(
        "Error fetching messages:",
        error
      );
    }
  };

  const sendMessage = async () => {
    try {
      if (!text.trim()) {
        return;
      }

      const token = localStorage.getItem("token");

      await axios.post(
        `http://localhost:5000/api/messages/${groupId}`,
        {
          text,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setText("");

      fetchMessages();

    } catch (error) {
      console.error(
        "Error sending message:",
        error
      );
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">

      {/* Header */}
      <div className="mb-8 flex items-center justify-between">

        <div>
          <h1 className="text-4xl font-bold">
            Group Chat 💬
          </h1>

          <p className="mt-2 text-gray-600">
            Collaborate with your study group.
          </p>
        </div>

        <button
          onClick={fetchMessages}
          className="rounded-xl border px-4 py-2 transition hover:bg-gray-100"
        >
          Refresh
        </button>

      </div>

      {/* Chat Container */}
      <div className="mb-6 h-[500px] overflow-y-auto rounded-2xl border bg-gray-50 p-6 shadow-sm">

        {messages.length === 0 ? (

          <div className="flex h-full items-center justify-center">
            <p className="text-gray-500">
              No messages yet.
            </p>
          </div>

        ) : (

          messages.map((message) => {
            const isMe =
              message.sender.name ===
              user?.name;

            return (

              <div
                key={message._id}
                className={`mb-4 flex ${
                  isMe
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                <div
                  className={`max-w-sm rounded-2xl px-4 py-3 shadow ${
                    isMe
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-900"
                  }`}
                >

                  <p
                    className={`text-xs font-semibold ${
                      isMe
                        ? "text-blue-100"
                        : "text-gray-500"
                    }`}
                  >
                    {message.sender.name}
                  </p>

                  <p className="mt-2 break-words">
                    {message.text}
                  </p>

                </div>

              </div>

            );
          })

        )}

      </div>

      {/* Message Input */}
      <div className="flex gap-4">

        <input
          type="text"
          placeholder="Type a message..."
          value={text}
          onChange={(e) =>
            setText(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          className="flex-1 rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={sendMessage}
          className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          Send
        </button>

      </div>

    </div>
  );
}