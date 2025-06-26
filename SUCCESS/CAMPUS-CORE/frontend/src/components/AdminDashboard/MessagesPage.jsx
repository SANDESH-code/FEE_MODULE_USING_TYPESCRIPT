import React, { useState, useRef, useEffect } from "react";
import {
  FaPaperPlane,
  FaUserCircle,
  FaEnvelopeOpenText,
  FaSearch,
  FaTrash,
  FaCheckCircle,
} from "react-icons/fa";

// Mocked message threads
const initialConversations = [
  {
    id: 1,
    name: "Admin Office",
    avatar: <FaUserCircle className="text-blue-500 text-2xl" />,
    messages: [
      {
        from: "Admin Office",
        time: "2025-06-22 09:30",
        text: "Welcome to the new semester!",
        read: true,
      },
      {
        from: "You",
        time: "2025-06-22 09:31",
        text: "Thank you!",
        read: true,
      },
    ],
    unread: 0,
  },
  {
    id: 2,
    name: "Prof. Sharma",
    avatar: <FaUserCircle className="text-green-500 text-2xl" />,
    messages: [
      {
        from: "Prof. Sharma",
        time: "2025-06-21 15:00",
        text: "Don't forget the assignment deadline is Friday.",
        read: false,
      },
    ],
    unread: 1,
  },
  {
    id: 3,
    name: "Library",
    avatar: <FaUserCircle className="text-purple-500 text-2xl" />,
    messages: [
      {
        from: "Library",
        time: "2025-06-19 10:10",
        text: "Your requested book is available for pickup.",
        read: true,
      },
    ],
    unread: 0,
  },
];

export default function MessagesPage() {
  const [conversations, setConversations] = useState(initialConversations);
  const [activeId, setActiveId] = useState(conversations[0].id);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const messagesEndRef = useRef(null);

  const activeConversation = conversations.find((c) => c.id === activeId);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConversation]);

  // Mark as read when opening
  useEffect(() => {
    setConversations((convs) =>
      convs.map((c) =>
        c.id === activeId
          ? {
              ...c,
              messages: c.messages.map((m) => ({ ...m, read: true })),
              unread: 0,
            }
          : c
      )
    );
  }, [activeId]);

  function sendMessage() {
    if (!input.trim()) return;
    const now = new Date();
    setConversations((convs) =>
      convs.map((c) =>
        c.id === activeId
          ? {
              ...c,
              messages: [
                ...c.messages,
                {
                  from: "You",
                  time: now.toLocaleString("sv-SE", {
                    hour: "2-digit",
                    minute: "2-digit",
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  }),
                  text: input,
                  read: true,
                },
              ],
            }
          : c
      )
    );
    setInput("");
  }

  function deleteConversation(id) {
    let idx = conversations.findIndex((c) => c.id === id);
    let nextActive =
      conversations.length > 1
        ? conversations[(idx === 0 ? 1 : idx - 1)].id
        : null;
    setConversations(conversations.filter((c) => c.id !== id));
    setActiveId(nextActive);
  }

  // Filter conversations by search
  const filteredConversations = conversations.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-6 px-2">
      <div className="w-full max-w-5xl h-[650px] bg-white rounded-2xl shadow flex flex-col md:flex-row overflow-hidden">
        {/* Sidebar */}
        <aside className="w-full md:w-1/3 bg-gray-100 border-r flex flex-col">
          <div className="flex items-center gap-2 p-4 border-b">
            <FaEnvelopeOpenText className="text-blue-600 text-2xl" />
            <h2 className="font-bold text-blue-700 text-lg flex-1">Messages</h2>
          </div>
          <div className="p-2">
            <div className="relative mb-2">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                className="w-full pl-10 pr-3 py-2 rounded-lg border text-sm"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.length === 0 && (
              <div className="p-4 text-gray-400">No messages found.</div>
            )}
            {filteredConversations.map((c) => (
              <div
                key={c.id}
                className={`flex items-center gap-3 px-4 py-3 cursor-pointer border-b group ${
                  c.id === activeId
                    ? "bg-white border-l-4 border-blue-500"
                    : "hover:bg-blue-50"
                }`}
                onClick={() => setActiveId(c.id)}
              >
                <span>{c.avatar}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold truncate">{c.name}</div>
                  <div
                    className={`text-xs truncate ${
                      c.unread > 0 ? "text-blue-700" : "text-gray-400"
                    }`}
                  >
                    {c.messages.length
                      ? c.messages[c.messages.length - 1].text
                      : ""}
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  {c.unread > 0 && (
                    <span className="bg-blue-500 text-white rounded-full px-2 py-0.5 text-xs font-semibold">
                      {c.unread}
                    </span>
                  )}
                  <button
                    className="text-gray-400 ml-3 hover:text-red-500"
                    title="Delete conversation"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteConversation(c.id);
                    }}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </aside>
        {/* Main message view */}
        <main className="flex-1 flex flex-col">
          {activeConversation ? (
            <>
              <div className="flex items-center gap-2 px-6 py-4 border-b">
                <span>{activeConversation.avatar}</span>
                <span className="font-bold text-blue-700 text-lg">
                  {activeConversation.name}
                </span>
              </div>
              <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                {activeConversation.messages.length === 0 ? (
                  <div className="text-gray-400 text-center mt-16">
                    No messages yet. Start the conversation!
                  </div>
                ) : (
                  activeConversation.messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`mb-4 flex ${
                        msg.from === "You"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[70%] px-4 py-2 rounded-xl shadow ${
                          msg.from === "You"
                            ? "bg-blue-100 text-blue-900"
                            : "bg-white text-gray-800 border"
                        }`}
                      >
                        <div className="text-xs font-semibold mb-1">
                          {msg.from}
                        </div>
                        <div className="text-sm">{msg.text}</div>
                        <div className="text-[11px] text-right mt-1 text-gray-400">
                          {msg.time}
                        </div>
                      </div>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>
              <form
                className="p-4 border-t flex gap-2 bg-white"
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage();
                }}
              >
                <input
                  className="flex-1 p-2 border rounded-lg text-sm"
                  placeholder="Type your message…"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      sendMessage();
                    }
                  }}
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                  disabled={!input.trim()}
                >
                  <FaPaperPlane />
                  Send
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
              <FaEnvelopeOpenText className="text-6xl mb-2" />
              <div className="text-lg font-semibold">No conversation selected.</div>
            </div>
          )}
        </main>
      </div>
      {/* Footer */}
      <footer className="text-center text-gray-400 text-xs mt-8">
        <span className="mr-2">✂️ Designed and developed by ZoaTeam</span>
        <span>© 2025 Zoa Innovation</span>
      </footer>
    </div>
  );
}