import { FaChartBar, FaDollarSign, FaFileAlt, FaUsers } from 'react-icons/fa';

const QuickReports = () => {
  const reports = [
    {
      id: 1,
      title: 'Attendance Report',
      icon: <FaUsers className="text-blue-500" />,
      lastUpdated: 'Last updated today',
      bgColor: 'bg-blue-50'
    },
    {
      id: 2,
      title: 'Performance Stats',
      icon: <FaChartBar className="text-purple-500" />,
      lastUpdated: 'Last updated yesterday',
      bgColor: 'bg-purple-50'
    },
    {
      id: 3,
      title: 'Course Report',
      icon: <FaFileAlt className="text-green-500" />,
      lastUpdated: 'Last updated 2 days ago',
      bgColor: 'bg-green-50'
    },
    {
      id: 4,
      title: 'Financial Summary',
      icon: <FaDollarSign className="text-orange-500" />,
      lastUpdated: 'Last updated 5 days ago',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Quick Reports</h3>
        <button className="text-sm text-blue-600 hover:text-blue-700">
          Download All
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {reports.map((report) => (
          <div
            key={report.id}
            className="p-4 rounded-lg border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${report.bgColor}`}>
                {report.icon}
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">{report.title}</h4>
                <p className="text-xs text-gray-500 mt-1">{report.lastUpdated}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickReports;
