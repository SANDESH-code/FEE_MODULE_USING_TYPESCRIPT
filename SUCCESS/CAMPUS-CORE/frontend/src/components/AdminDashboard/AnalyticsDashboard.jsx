import React, { useState } from "react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer, Legend,
} from "recharts";
import {
  FaBookOpen, FaEnvelope, FaPoll, FaCalendarAlt, FaChartBar, FaBell,
} from "react-icons/fa";

const COLORS = ["#3888FF", "#FEBE3E", "#F24C4C"];
const PIE_COLORS = ["#3888FF", "#FEBE3E", "#F24C4C", "#6c47ff"];

const weeklyActiveUsers = [
  { week: "Mon", users: 200 }, { week: "Tue", users: 400 },
  { week: "Wed", users: 600 }, { week: "Thu", users: 500 },
  { week: "Fri", users: 700 }, { week: "Sat", users: 600 }, { week: "Sun", users: 800 },
];
const userDistribution = [
  { name: "Learner", value: 60 }, { name: "Staff", value: 25 }, { name: "Admin", value: 15 },
];
const studentSatisfaction = [
  { sem: "Sem 1", score: 70 }, { sem: "Sem 2", score: 80 },
  { sem: "Sem 3", score: 60 }, { sem: "Sem 4", score: 85 }, { sem: "Sem 5", score: 78 },
];
const coursePopularity = [
  { name: "Course A", value: 55 }, { name: "Course B", value: 25 }, { name: "Course C", value: 20 },
];

const activities = [
  {
    icon: <FaBookOpen size={40} className="text-blue-600" />,
    title: "New Course Uploaded", desc: "Intro to Data Science", time: "3 days ago",
  },
  {
    icon: <FaEnvelope size={40} className="text-yellow-400" />,
    title: "Email Campaign Sent", desc: "Welcome series", time: "1 week ago",
  },
  {
    icon: <FaPoll size={40} className="text-red-500" />,
    title: "Survey Results", desc: "End of Semester", time: "2 days ago",
  },
  {
    icon: <FaCalendarAlt size={40} className="text-indigo-500" />,
    title: "Final Exam Schedule", desc: "Download available", time: "5 days ago",
  },
];

const metrics = [
  { label: "Total Students", value: "9000", border: "border-blue-500", text: "text-blue-700", sub: "", subColor: "" },
  { label: "New Enrollments", value: "150", border: "border-green-500", text: "text-green-700", sub: "+20%", subColor: "text-green-500" },
  { label: "Active Courses", value: "45", border: "border-yellow-500", text: "text-yellow-700", sub: "", subColor: "" },
  { label: "Graduation Rate", value: "95%", border: "border-purple-500", text: "text-purple-700", sub: "↑", subColor: "text-purple-500" },
  { label: "Faculty/Instructors", value: "458", border: "border-pink-500", text: "text-pink-700", sub: "", subColor: "" },
];

function ActivityCard({ icon, title, desc, time }) {
  return (
    <div className="flex flex-col items-center justify-center px-3 w-48">
      <div className="mb-2">{icon}</div>
      <div className="font-medium text-lg text-center">{title}</div>
      <div className="text-base text-gray-500 mb-2 text-center">{desc}</div>
      <div className="text-base text-blue-600 font-semibold">{time}</div>
    </div>
  );
}
function MetricCard({ label, value, border, text, sub, subColor }) {
  return (
    <div className={`rounded-lg border-l-4 ${border} bg-white p-4 flex flex-col mb-3`}>
      <span className={`font-semibold ${text} text-lg`}>{label}</span>
      <div className="flex items-center gap-2">
        <span className="font-bold text-2xl">{value}</span>
        {sub && (
          <span className={`text-lg font-medium ${subColor}`}>
            {sub}
          </span>
        )}
      </div>
    </div>
  );
}

export default function Analytics() {
  const [option, setOption] = useState("overview");

  return (
    <div className="w-full min-h-screen bg-[#f5f6fa] py-10 px-4 flex flex-col items-center">
      <div className="w-full max-w-[1200px] min-h-[90vh] bg-white rounded-2xl shadow p-10">
        {/* Top Card */}
        <div className="text-center mb-10">
          <h2 className="font-bold text-3xl text-blue-700 mb-2">
            User Engagement Trends
          </h2>
          <p className="text-gray-500 text-lg mb-6">
            Analyze the trends in campus user engagement.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left: Area and Pie Chart */}
            <div className="col-span-2 flex flex-col gap-4">
              {/* Area Chart */}
              <div className="w-full bg-white rounded-lg border shadow p-4">
                <div className="text-lg font-semibold text-gray-700 mb-2">
                  Weekly Active Users
                </div>
                <div className="w-full h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={weeklyActiveUsers}>
                      <defs>
                        <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="week" fontSize={14} />
                      <YAxis fontSize={14} />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="users"
                        stroke="#8884d8"
                        fill="url(#colorUsers)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              {/* Pie Chart + Overview */}
              <div className="flex flex-row items-center gap-6 mt-2">
                <div className="bg-white rounded-lg border shadow p-4 w-1/2 flex flex-col items-center">
                  <div className="text-lg font-semibold text-gray-700 mb-2">
                    User Distribution by Roles
                  </div>
                  <div className="w-full h-40">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={userDistribution}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={60}
                          label={({ name }) => name}
                          fontSize={14}
                        >
                          {userDistribution.map((entry, idx) => (
                            <Cell key={idx} fill={PIE_COLORS[idx % PIE_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                {/* Overview & Option Buttons */}
                <div className="flex-1 flex flex-col items-center justify-center">
                  <div className="font-bold text-xl mb-2">Overview</div>
                  <div className="text-gray-500 text-base mb-4 text-center">
                    Get insights into campus performance
                  </div>
                  <div className="flex flex-row gap-3 mb-3">
                    <button
                      className={`px-4 py-2 rounded text-base font-semibold border ${
                        option === "overview"
                          ? "bg-blue-700 text-white border-blue-700"
                          : "bg-white text-blue-700 border-blue-700 hover:bg-blue-50"
                      }`}
                      onClick={() => setOption("overview")}
                    >
                      Overview
                    </button>
                    <button
                      className={`px-4 py-2 rounded text-base font-semibold border ${
                        option === "recent"
                          ? "bg-blue-700 text-white border-blue-700"
                          : "bg-white text-blue-700 border-blue-700 hover:bg-blue-50"
                      }`}
                      onClick={() => setOption("recent")}
                    >
                      Recent Activity
                    </button>
                    <button
                      className={`px-4 py-2 rounded text-base font-semibold border ${
                        option === "alerts"
                          ? "bg-blue-700 text-white border-blue-700"
                          : "bg-white text-blue-700 border-blue-700 hover:bg-blue-50"
                      }`}
                      onClick={() => setOption("alerts")}
                    >
                      Alerts
                    </button>
                  </div>
                  <button
                    className="bg-blue-700 text-white rounded px-6 py-2 text-base font-bold flex items-center gap-2 shadow"
                    onClick={() => alert("Generating Report...")}
                  >
                    <FaChartBar />
                    Generate Report
                  </button>
                </div>
              </div>
            </div>
            {/* Key Metrics */}
            <div className="col-span-1 flex flex-col gap-2">
              <div className="bg-white rounded-xl shadow p-6 flex flex-col mb-2">
                <div className="font-bold text-2xl text-black mb-2">Key Metrics</div>
                <div className="text-gray-500 text-base mb-3">
                  Explore essential statistics
                </div>
                <button className="bg-blue-700 hover:bg-blue-800 text-white rounded w-full py-2 text-base font-semibold mb-6">
                  View More
                </button>
                <div className="flex flex-col gap-2">
                  {metrics.map((m, i) => (
                    <MetricCard key={i} {...m} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Activities & Metrics Section */}
        <div className="flex flex-col md:flex-row gap-10 mb-10">
          <div className="bg-white rounded-2xl shadow p-8 flex-1 min-w-[300px]">
            <div className="font-bold text-2xl text-blue-700 mb-2">
              Recent Activities
            </div>
            <div className="text-gray-500 mb-6 text-lg">
              Stay updated with campus happenings
            </div>
            <div className="flex flex-wrap gap-4 justify-start">
              {activities.map((act, i) => (
                <ActivityCard key={i} {...act} />
              ))}
            </div>
          </div>
        </div>
        {/* Performance Trends */}
        <div>
          <div className="text-center">
            <h2 className="font-bold text-3xl text-blue-700 mb-2">
              Performance Trends
            </h2>
            <p className="text-gray-500 text-lg mb-6">
              Review performance over past semesters
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Student Satisfaction */}
            <div className="bg-white rounded-lg border shadow p-6">
              <div className="text-lg font-semibold text-gray-700 mb-2">
                Student Satisfaction
              </div>
              <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={studentSatisfaction}>
                    <defs>
                      <linearGradient id="colorSatisfaction" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#43e97b" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#38f9d7" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="sem" fontSize={14} />
                    <YAxis fontSize={14} />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="score"
                      stroke="#43e97b"
                      fill="url(#colorSatisfaction)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            {/* Course Popularity */}
            <div className="bg-white rounded-lg border shadow p-6 flex flex-col items-center">
              <div className="text-lg font-semibold text-gray-700 mb-2">
                Course Popularity
              </div>
              <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={coursePopularity}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={90}
                      label={({ name }) => name}
                      fontSize={14}
                    >
                      {coursePopularity.map((entry, idx) => (
                        <Cell key={idx} fill={PIE_COLORS[idx % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
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