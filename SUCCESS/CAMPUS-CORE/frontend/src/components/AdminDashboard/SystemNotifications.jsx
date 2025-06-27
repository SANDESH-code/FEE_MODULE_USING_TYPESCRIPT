
const SystemNotifications = () => {
  const notifications = [
    {
      id: 1,
      type: 'maintenance',
      message: 'System maintenance scheduled for June 15th',
      time: '2 hours ago',
      severity: 'warning'
    },
    {
      id: 2,
      type: 'registration',
      message: 'New course registration opens next week',
      time: '5 hours ago',
      severity: 'info'
    },
    {
      id: 3,
      type: 'grades',
      message: 'Semester grades have been finalized',
      time: '1 day ago',
      severity: 'success'
    }
  ];

  const getSeverityStyle = (severity) => {
    switch (severity) {
      case 'warning':
        return 'bg-yellow-50 text-yellow-600 border-yellow-200';
      case 'info':
        return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'success':
        return 'bg-green-50 text-green-600 border-green-200';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">System Notifications</h3>
        <button className="text-sm text-gray-500 hover:text-gray-700">
          Clear all
        </button>
      </div>
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 rounded-lg border ${getSeverityStyle(notification.severity)}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium">{notification.message}</p>
                <p className="text-xs mt-1 text-gray-500">{notification.time}</p>
              </div>
              <button className="text-gray-400 hover:text-gray-600 ml-2">×</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SystemNotifications;
