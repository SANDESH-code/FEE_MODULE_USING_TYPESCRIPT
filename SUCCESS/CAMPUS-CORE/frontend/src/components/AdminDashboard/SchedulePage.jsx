import React, { useState } from "react";
import {
  FaCalendarAlt,
  FaClipboardList,
  FaClock,
  FaCheckCircle,
  FaTrash,
  FaPlus,
  FaBook,
} from "react-icons/fa";

const initialSchedule = [
  {
    id: 1,
    subject: "Mathematics",
    type: "Lecture",
    instructor: "Prof. Sharma",
    date: "2025-06-24",
    time: "09:00 - 10:00",
    location: "Room 101",
    status: "upcoming",
  },
  {
    id: 2,
    subject: "Physics",
    type: "Lab",
    instructor: "Dr. Mehta",
    date: "2025-06-24",
    time: "11:00 - 13:00",
    location: "Lab 3",
    status: "upcoming",
  },
  {
    id: 3,
    subject: "Computer Science",
    type: "Lecture",
    instructor: "Prof. Gupta",
    date: "2025-06-25",
    time: "10:00 - 11:00",
    location: "Room 202",
    status: "upcoming",
  },
  {
    id: 4,
    subject: "English",
    type: "Lecture",
    instructor: "Ms. Sen",
    date: "2025-06-25",
    time: "12:00 - 13:00",
    location: "Room 105",
    status: "completed",
  },
];

export default function SchedulePage() {
  const [schedule, setSchedule] = useState(initialSchedule);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({
    subject: "",
    type: "Lecture",
    instructor: "",
    date: "",
    time: "",
    location: "",
  });

  function handleDelete(id) {
    setSchedule((prev) => prev.filter((s) => s.id !== id));
  }

  function handleAdd(e) {
    e.preventDefault();
    if (
      !form.subject ||
      !form.type ||
      !form.instructor ||
      !form.date ||
      !form.time ||
      !form.location
    ) {
      alert("Please fill all fields");
      return;
    }
    setSchedule((prev) => [
      ...prev,
      {
        ...form,
        id: prev.length ? Math.max(...prev.map((s) => s.id)) + 1 : 1,
        status: "upcoming",
      },
    ]);
    setForm({
      subject: "",
      type: "Lecture",
      instructor: "",
      date: "",
      time: "",
      location: "",
    });
    setShowAdd(false);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-[1200px] min-h-[90vh] bg-white rounded-2xl shadow p-10">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <FaCalendarAlt className="text-blue-600 text-3xl" />
            <h1 className="text-3xl font-bold text-blue-700">
              My Schedule
            </h1>
          </div>
          <button
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 text-lg"
            onClick={() => setShowAdd(true)}
            title="Add schedule"
          >
            <FaPlus /> Add
          </button>
        </div>
        {/* Add Event Modal */}
        {showAdd && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <form
              className="bg-white rounded-lg shadow-lg p-10 w-full max-w-xl"
              onSubmit={handleAdd}
            >
              <h2 className="font-bold mb-6 text-2xl flex items-center gap-3">
                <FaClipboardList /> Add Schedule
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <input
                  className="border p-3 rounded text-lg"
                  placeholder="Subject"
                  value={form.subject}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, subject: e.target.value }))
                  }
                />
                <select
                  className="border p-3 rounded text-lg"
                  value={form.type}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, type: e.target.value }))
                  }
                >
                  <option>Lecture</option>
                  <option>Lab</option>
                  <option>Exam</option>
                  <option>Other</option>
                </select>
                <input
                  className="border p-3 rounded text-lg"
                  placeholder="Instructor"
                  value={form.instructor}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, instructor: e.target.value }))
                  }
                />
                <input
                  className="border p-3 rounded text-lg"
                  placeholder="Location"
                  value={form.location}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, location: e.target.value }))
                  }
                />
                <input
                  className="border p-3 rounded text-lg"
                  type="date"
                  value={form.date}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, date: e.target.value }))
                  }
                />
                <input
                  className="border p-3 rounded text-lg"
                  type="text"
                  placeholder="Time (e.g. 09:00 - 10:00)"
                  value={form.time}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, time: e.target.value }))
                  }
                />
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  className="px-6 py-2 bg-gray-100 rounded text-base"
                  onClick={() => setShowAdd(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded text-base"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        )}
        {/* Schedule Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-lg">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-4 text-left">Subject</th>
                <th className="px-6 py-4 text-left">Type</th>
                <th className="px-6 py-4 text-left">Instructor</th>
                <th className="px-6 py-4 text-left">Date</th>
                <th className="px-6 py-4 text-left">Time</th>
                <th className="px-6 py-4 text-left">Location</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right"></th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((s) => (
                <tr key={s.id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <FaBook className="text-indigo-400 text-xl" /> {s.subject}
                  </td>
                  <td className="px-6 py-4">{s.type}</td>
                  <td className="px-6 py-4">{s.instructor}</td>
                  <td className="px-6 py-4">{s.date}</td>
                  <td className="px-6 py-4">{s.time}</td>
                  <td className="px-6 py-4">{s.location}</td>
                  <td className="px-6 py-4 text-center">
                    {s.status === "completed" ? (
                      <span className="inline-flex items-center gap-2 text-green-600 text-lg">
                        <FaCheckCircle /> Completed
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-2 text-blue-600 text-lg">
                        <FaClock /> Upcoming
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      className="text-red-500 hover:text-red-700 text-xl"
                      onClick={() => handleDelete(s.id)}
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {schedule.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center text-gray-400 py-16 text-xl">
                    No schedules yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Footer */}
        <footer className="text-center text-gray-400 text-base mt-12 pb-8">
          <span className="mr-2">✂️ Designed and developed by ZoaTeam</span>
          <span>© 2025 Zoa Innovation</span>
        </footer>
      </div>
    </div>
  );
}