import { ClockIcon, MapPinIcon } from '@heroicons/react/24/outline';

const FacultySchedule = () => {
  const scheduleItems = [
    {
      id: 1,
      subject: 'Introduction to Computer Science',
      time: '10:00 AM - 11:30 AM',
      location: 'Room 101',
      status: 'Completed',
    },
    {
      id: 2,
      subject: 'Advanced Mathematics',
      time: '12:00 PM - 1:30 PM',
      location: 'Room 202',
      status: 'Upcoming',
    },
    {
      id: 3,
      subject: 'Physics Laboratory',
      time: '2:00 PM - 3:30 PM',
      location: 'Lab Building',
      status: 'Upcoming',
    },
    {
      id: 4,
      subject: 'English Literature',
      time: '4:00 PM - 5:30 PM',
      location: 'Room 305',
      status: 'Upcoming',
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Today's Schedule</h2>
        <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500">Full Schedule</a>
      </div>
      
      <div className="space-y-4">
        {scheduleItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-lg flex items-center justify-center">
              <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            
            <div className="ml-4 flex-1">
              <h3 className="text-sm font-medium text-gray-900">{item.subject}</h3>
              <div className="mt-1 flex items-center text-sm text-gray-500">
                <ClockIcon className="flex-shrink-0 mr-1.5 h-4 w-4" />
                {item.time}
                <MapPinIcon className="flex-shrink-0 ml-4 mr-1.5 h-4 w-4" />
                {item.location}
              </div>
            </div>
            
            <div className="ml-4">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                ${item.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-indigo-100 text-indigo-800'}`}>
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FacultySchedule;
