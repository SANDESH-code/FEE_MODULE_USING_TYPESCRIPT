
const FacultyUpcomingEvents = () => {
  const events = [
    {
      id: 1,
      title: 'Applied Science Assignment',
      time: '10 : 00 : AM',
      color: 'red',
    },
    {
      id: 2,
      title: 'Technology Exam',
      time: '11 : 30 : AM',
      color: 'orange',
    },
    {
      id: 3,
      title: 'Technology Exam',
      time: '02 : 00 : PM',
      color: 'orange',
    },
    {
      id: 4,
      title: 'Artificial Intelligence Workshop',
      time: '03 : 30 : PM',
      color: 'yellow',
    },
    {
      id: 5,
      title: 'UI Design Conference',
      time: '04 : 45 : PM',
      color: 'green',
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Upcoming Events</h2>
        <button className="text-sm text-gray-500 hover:text-gray-700">View Calendar</button>
      </div>

      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="flex items-start space-x-4">
            <div className={`w-1 h-full min-h-[2.5rem] rounded-full bg-${event.color}-500`} />
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-900">{event.title}</h3>
              <p className="text-sm text-gray-500">{event.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FacultyUpcomingEvents;
