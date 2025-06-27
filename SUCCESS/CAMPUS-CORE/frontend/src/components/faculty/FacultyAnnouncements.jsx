
const FacultyAnnouncements = () => {
  const announcements = [
    {
      id: 1,
      title: 'Campus Closure Notice',
      content: 'Due to renovations on building B, this campus will be closed on Saturday, June 24. All scheduled classes will be conducted online.',
      type: 'Important',
      date: 'June 15, 2025',
    },
    {
      id: 2,
      title: 'Summer Registration Open',
      content: 'Please complete your registration by June 20 to secure your seat.',
      type: 'Action Required',
      date: 'June 14, 2025',
    },
    {
      id: 3,
      title: 'Library Extended Hours',
      content: 'The library will extend its opening hours during the examination period (8AM - 10PM) starting next week.',
      type: 'Information',
      date: 'June 13, 2025',
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Announcements</h2>
        <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500">
          View All
        </a>
      </div>

      <div className="space-y-4">
        {announcements.map((announcement) => (
          <div
            key={announcement.id}
            className="border-l-4 border-indigo-500 bg-indigo-50 p-4 rounded-r-lg"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-900">
                  {announcement.title}
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  {announcement.content}
                </p>
              </div>
              <span className={`ml-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                ${
                  announcement.type === 'Important'
                    ? 'bg-red-100 text-red-800'
                    : announcement.type === 'Action Required'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
                }`}
              >
                {announcement.type}
              </span>
            </div>
            <div className="mt-2 text-xs text-gray-500">{announcement.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FacultyAnnouncements;
