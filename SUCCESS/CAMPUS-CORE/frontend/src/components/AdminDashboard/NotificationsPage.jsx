import React, { useState } from "react";
import {
  FaBell,
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
  FaTimes,
  FaClock,
  FaEnvelopeOpenText,
  FaTrash,
  FaCalendarAlt,
} from "react-icons/fa";

const notificationsMock = [
  {
    id: 1,
    type: "success",
    title: "Payment Received",
    message: "Your recent payment of $1500 for tuition fee was successful.",
    date: "2025-06-22T08:30:00Z",
    read: false,
  },
  {
    id: 2,
    type: "alert",
    title: "Upcoming Due Date",
    message: "Library Fee of $100 is due on 2025-07-10.",
    date: "2025-06-20T13:00:00Z",
    read: false,
  },
  {
    id: 3,
    type: "info",
    title: "Exam Schedule Released",
    message: "Final exam schedule is now available. Download from your dashboard.",
    date: "2025-06-19T11:20:00Z",
    read: true,
  },
  {
    id: 4,
    type: "warning",
    title: "Profile Incomplete",
    message: "Please update your profile to receive important notifications.",
    date: "2025-06-18T09:00:00Z",
    read: false,
  },
  {
    id: 5,
    type: "info",
    title: "Survey Reminder",
    message: "Participate in the semester feedback survey before June 30.",
    date: "2025-06-16T12:00:00Z",
    read: true,
  },
];

function getIcon(type) {
  switch (type) {
    case "success":
      return <FaCheckCircle className="text-green-500 text-xl" />;
    case "alert":
      return <FaExclamationCircle className="text-red-500 text-xl" />;
    case "warning":
      return <FaExclamationCircle className="text-yellow-500 text-xl" />;
    case "info":
    default:
      return <FaInfoCircle className="text-blue-500 text-xl" />;
  }
}

function timeAgo(dateStr) {
  const now = new Date();
  const date = new Date(dateStr);
  const diff = Math.floor((now - date) / 1000);
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
  if (diff < 172800) return "yesterday";
  return date.toLocaleDateString();
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(notificationsMock);

  const markAllAsRead = () =>
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, read: true }))
    );

  const deleteNotification = (id) =>
    setNotifications((prev) => prev.filter((n) => n.id !== id));

  const clearAll = () => setNotifications([]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-6 px-2">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <FaBell className="text-blue-600 text-2xl" />
            <h1 className="text-2xl font-bold text-blue-700">
              Notifications
            </h1>
            {unreadCount > 0 && (
              <span className="ml-2 bg-red-500 text-white px-2.5 py-0.5 rounded-full text-xs font-semibold">
                {unreadCount} new
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <button
              className="flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded text-xs font-semibold hover:bg-blue-100"
              onClick={markAllAsRead}
              disabled={notifications.length === 0}
              title="Mark all as read"
            >
              <FaEnvelopeOpenText /> All Read
            </button>
            <button
              className="flex items-center gap-1 px-3 py-1 bg-red-50 text-red-600 rounded text-xs font-semibold hover:bg-red-100"
              onClick={clearAll}
              disabled={notifications.length === 0}
              title="Clear all"
            >
              <FaTrash /> Clear All
            </button>
          </div>
        </div>
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center py-20 opacity-60">
            <FaBell className="text-6xl mb-2" />
            <p className="text-gray-400 text-lg font-semibold">No notifications.</p>
          </div>
        ) : (
          <ul className="flex flex-col gap-3">
            {notifications.map((n) => (
              <li
                key={n.id}
                className={`flex items-start gap-4 px-4 py-4 rounded-lg border 
                  ${n.read ? "bg-gray-50" : "bg-blue-50 border-blue-100 shadow"}
                `}
              >
                <span>{getIcon(n.type)}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`font-bold text-sm ${n.read ? "text-gray-700" : "text-blue-700"}`}>
                      {n.title}
                    </span>
                    {!n.read && (
                      <span className="ml-1 text-blue-600 text-xs font-semibold bg-white border border-blue-200 rounded px-1 py-0.5">
                        New
                      </span>
                    )}
                  </div>
                  <div className="text-gray-600 text-sm mt-1">{n.message}</div>
                  <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                    <FaClock />
                    <span>{timeAgo(n.date)}</span>
                  </div>
                </div>
                <button
                  className="text-gray-400 hover:text-red-500 ml-2 mt-1"
                  title="Delete notification"
                  onClick={() => deleteNotification(n.id)}
                >
                  <FaTimes />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Footer */}
      <footer className="text-center text-gray-400 text-xs mt-10 mb-4">
        <span className="mr-2">✂️ Designed and developed by ZoaTeam</span>
        <span>© 2025 Zoa Innovation</span>
      </footer>
    </div>
  );
}