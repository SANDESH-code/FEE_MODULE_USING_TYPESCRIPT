import React, { useState } from "react";
import {
  FaUserTie,
  FaEnvelope,
  FaPhone,
  FaChalkboardTeacher,
  FaBookOpen,
  FaStar,
  FaCommentDots,
  FaLinkedin,
  FaCalendarAlt,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

const mentorsMock = [
  {
    id: 1,
    name: "Dr. Nisha Verma",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    title: "Professor of Computer Science",
    email: "nisha.verma@example.edu",
    phone: "+91 98765 43210",
    expertise: ["AI", "Machine Learning", "Data Mining"],
    rating: 4.8,
    reviews: 24,
    bio: "Dr. Verma has 15+ years experience in AI and ML, guiding students for research and industry careers.",
    linkedin: "https://linkedin.com/in/nishaverma",
    availableSlots: [
      { date: "2025-06-24", time: "10:00 - 11:00" },
      { date: "2025-06-25", time: "15:00 - 16:00" },
    ],
    messages: [
      {
        from: "Dr. Nisha Verma",
        text: "Looking forward to our mentorship session!",
        date: "2025-06-20",
      },
      {
        from: "You",
        text: "Thank you, see you then!",
        date: "2025-06-20",
      },
    ],
  },
  {
    id: 2,
    name: "Dr. Nisha Verma",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    title: "Professor of Computer Science",
    email: "nisha.verma@example.edu",
    phone: "+91 98765 43210",
    expertise: ["AI", "Machine Learning", "Data Mining"],
    rating: 4.8,
    reviews: 24,
    bio: "Dr. Verma has 15+ years experience in AI and ML, guiding students for research and industry careers.",
    linkedin: "https://linkedin.com/in/nishaverma",
    availableSlots: [
      { date: "2025-06-24", time: "10:00 - 11:00" },
      { date: "2025-06-25", time: "15:00 - 16:00" },
    ],
    messages: [
      {
        from: "Dr. Nisha Verma",
        text: "Looking forward to our mentorship session!",
        date: "2025-06-20",
      },
      {
        from: "You",
        text: "Thank you, see you then!",
        date: "2025-06-20",
      },
    ],
  },
  {
    id: 3,
    name: "Dr. Nisha Verma",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    title: "Professor of Computer Science",
    email: "nisha.verma@example.edu",
    phone: "+91 98765 43210",
    expertise: ["AI", "Machine Learning", "Data Mining"],
    rating: 4.8,
    reviews: 24,
    bio: "Dr. Verma has 15+ years experience in AI and ML, guiding students for research and industry careers.",
    linkedin: "https://linkedin.com/in/nishaverma",
    availableSlots: [
      { date: "2025-06-24", time: "10:00 - 11:00" },
      { date: "2025-06-25", time: "15:00 - 16:00" },
    ],
    messages: [
      {
        from: "Dr. Nisha Verma",
        text: "Looking forward to our mentorship session!",
        date: "2025-06-20",
      },
      {
        from: "You",
        text: "Thank you, see you then!",
        date: "2025-06-20",
      },
    ],
  },
  {
    id: 1,
    name: "Dr. Nisha Verma",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    title: "Professor of Computer Science",
    email: "nisha.verma@example.edu",
    phone: "+91 98765 43210",
    expertise: ["AI", "Machine Learning", "Data Mining"],
    rating: 4.8,
    reviews: 24,
    bio: "Dr. Verma has 15+ years experience in AI and ML, guiding students for research and industry careers.",
    linkedin: "https://linkedin.com/in/nishaverma",
    availableSlots: [
      { date: "2025-06-24", time: "10:00 - 11:00" },
      { date: "2025-06-25", time: "15:00 - 16:00" },
    ],
    messages: [
      {
        from: "Dr. Nisha Verma",
        text: "Looking forward to our mentorship session!",
        date: "2025-06-20",
      },
      {
        from: "You",
        text: "Thank you, see you then!",
        date: "2025-06-20",
      },
    ],
  },
  {
    id: 2,
    name: "Prof. Amit Sharma",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    title: "Associate Professor, Physics",
    email: "amit.sharma@example.edu",
    phone: "+91 91234 56789",
    expertise: ["Quantum Physics", "Electromagnetism"],
    rating: 4.5,
    reviews: 18,
    bio: "Prof. Sharma is passionate about making physics easy for everyone, with 10+ years of teaching experience.",
    linkedin: "https://linkedin.com/in/amitsharma",
    availableSlots: [
      { date: "2025-06-26", time: "09:00 - 10:00" },
      { date: "2025-06-27", time: "13:00 - 14:00" },
    ],
    messages: [],
  },
];

function StarRating({ value, max = 5 }) {
  const fullStars = Math.floor(value);
  const half = value - fullStars >= 0.5;
  return (
    <span className="flex items-center gap-0.5">
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={i} className="text-yellow-400" />
      ))}
      {half && <FaStar className="text-yellow-300 opacity-70" />}
      {[...Array(max - fullStars - (half ? 1 : 0))].map((_, i) => (
        <FaStar key={i} className="text-gray-300" />
      ))}
    </span>
  );
}

export default function MentorPage() {
  const [showDetail, setShowDetail] = useState(null);
  const [messageText, setMessageText] = useState({});
  const [mentors, setMentors] = useState(mentorsMock);

  function handleSendMessage(id) {
    if (!messageText[id] || !messageText[id].trim()) return;
    setMentors((prev) =>
      prev.map((m) =>
        m.id === id
          ? {
              ...m,
              messages: [
                ...(m.messages || []),
                {
                  from: "You",
                  text: messageText[id],
                  date: new Date().toISOString().slice(0, 10),
                },
              ],
            }
          : m
      )
    );
    setMessageText((prev) => ({ ...prev, [id]: "" }));
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-[1200px] min-h-[90vh] bg-white rounded-2xl shadow p-10">
        <div className="flex items-center gap-3 mb-10">
          <FaUserTie className="text-blue-600 text-3xl" />
          <h1 className="text-3xl font-bold text-blue-700">Mentors</h1>
        </div>
        {mentors.map((mentor) => (
          <div
            key={mentor.id}
            className="bg-white rounded-xl border shadow-sm mb-10 p-6 flex flex-col md:flex-row gap-6"
          >
            {/* Avatar and Basic Info */}
            <div className="flex flex-col items-center w-full md:w-1/5">
              <img
                src={mentor.avatar}
                alt={mentor.name}
                className="rounded-full w-28 h-28 object-cover border-2 border-blue-200 mb-3"
              />
              <div className="text-center font-semibold text-lg">{mentor.name}</div>
              <div className="text-sm text-gray-500 text-center">{mentor.title}</div>
              <div className="mt-3">
                <StarRating value={mentor.rating} />
                <span className="ml-2 text-xs text-gray-400">
                  ({mentor.reviews} reviews)
                </span>
              </div>
              <a
                href={mentor.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-blue-700 text-sm mt-2 hover:underline"
              >
                <FaLinkedin /> LinkedIn
              </a>
            </div>
            {/* Details */}
            <div className="flex-1 flex flex-col justify-between text-base">
              <div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {mentor.expertise.map((exp, i) => (
                    <span
                      key={i}
                      className="bg-blue-50 text-blue-700 px-3 py-1 rounded text-sm font-semibold"
                    >
                      {exp}
                    </span>
                  ))}
                </div>
                <div className="text-gray-700 mb-3">{mentor.bio}</div>
                <div className="flex items-center gap-6 flex-wrap mb-3 text-base">
                  <span className="flex items-center gap-2 text-gray-600">
                    <FaEnvelope /> {mentor.email}
                  </span>
                  <span className="flex items-center gap-2 text-gray-600">
                    <FaPhone /> {mentor.phone}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-3 text-sm text-gray-400">
                  <FaCalendarAlt />
                  Next Available:
                  {mentor.availableSlots.length ? (
                    <span className="ml-1 text-gray-700">
                      {mentor.availableSlots[0].date} ({mentor.availableSlots[0].time})
                    </span>
                  ) : (
                    <span className="ml-1">Not available</span>
                  )}
                </div>
                <div className="mb-3">
                  <button
                    className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                    onClick={() =>
                      setShowDetail((cur) => (cur === mentor.id ? null : mentor.id))
                    }
                  >
                    {showDetail === mentor.id ? <FaChevronUp /> : <FaChevronDown />}{" "}
                    {showDetail === mentor.id ? "Hide Details" : "View Details"}
                  </button>
                </div>
                {showDetail === mentor.id && (
                  <div className="bg-blue-50 rounded px-6 py-5 mt-2">
                    <div className="font-semibold mb-2 flex items-center gap-2 text-base">
                      <FaChalkboardTeacher /> Available Slots
                    </div>
                    {mentor.availableSlots.length === 0 ? (
                      <div className="text-gray-400 text-base mb-3">
                        No slots available.
                      </div>
                    ) : (
                      <ul className="mb-3">
                        {mentor.availableSlots.map((slot, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-2 text-base my-1"
                          >
                            <FaCalendarAlt className="text-blue-400" />
                            {slot.date} ({slot.time})
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="font-semibold mb-2 flex items-center gap-2 mt-2 text-base">
                      <FaCommentDots /> Recent Messages
                    </div>
                    {mentor.messages && mentor.messages.length > 0 ? (
                      <ul>
                        {mentor.messages
                          .slice(-3)
                          .reverse()
                          .map((msg, i) => (
                            <li key={i} className="mb-1 text-sm">
                              <span className="font-semibold">
                                {msg.from}:
                              </span>{" "}
                              {msg.text}
                              <span className="ml-2 text-gray-400">
                                {msg.date}
                              </span>
                            </li>
                          ))}
                      </ul>
                    ) : (
                      <div className="text-gray-400 text-base mb-2">
                        No messages yet.
                      </div>
                    )}
                    {/* Send Message */}
                    <form
                      className="flex gap-2 mt-3"
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSendMessage(mentor.id);
                      }}
                    >
                      <input
                        className="flex-1 p-3 border rounded text-base"
                        placeholder="Type a message..."
                        value={messageText[mentor.id] || ""}
                        onChange={(e) =>
                          setMessageText((prev) => ({
                            ...prev,
                            [mentor.id]: e.target.value,
                          }))
                        }
                      />
                      <button
                        type="submit"
                        className="bg-blue-700 text-white px-4 py-2 rounded text-base hover:bg-blue-800"
                        disabled={!messageText[mentor.id]?.trim()}
                        title="Send message"
                      >
                        Send
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Footer */}
      <footer className="text-center text-gray-400 text-base mt-12 pb-8">
        <span className="mr-2">✂️ Designed and developed by ZoaTeam</span>
        <span>© 2025 Zoa Innovation</span>
      </footer>
    </div>
  );
}