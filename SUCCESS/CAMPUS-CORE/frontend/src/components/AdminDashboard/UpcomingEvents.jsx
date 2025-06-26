import React from 'react';
import { FaClock, FaMapMarkerAlt } from 'react-icons/fa';

const UpcomingEvents = () => {
  const events = [
    {
      id: 1,
      title: 'Faculty Development Workshop',
      date: 'JUN 23',
      time: '09:00 AM',
      location: 'Main Auditorium',
    },
    {
      id: 2,
      title: 'Student Orientation Day',
      date: 'JUN 25',
      time: '10:00 AM',
      location: 'Conference Hall',
    },
    {
      id: 3,
      title: 'Board Meeting',
      date: 'JUN 30',
      time: '02:00 PM',
      location: 'Meeting Room A',
    },
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Upcoming Events</h3>
        <button className="text-sm text-blue-600 hover:text-blue-700">
          View Calendar
        </button>
      </div>
      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="flex items-start gap-4">
            <div className="flex flex-col items-center">
              <span className="text-sm font-semibold text-blue-600">{event.date}</span>
              <div className="w-px h-full bg-gray-200 my-2"></div>
            </div>
            <div className="flex-1 bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900">{event.title}</h4>
              <div className="mt-2 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <FaClock className="text-blue-500" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <FaMapMarkerAlt className="text-red-500" />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
