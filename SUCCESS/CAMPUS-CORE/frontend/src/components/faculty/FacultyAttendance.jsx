import { useState } from 'react';

const FacultyAttendance = () => {
  const [selectedClass, setSelectedClass] = useState('Math');
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Submit Attendance</h2>
        <a href="#" className="text-sm text-blue-600 hover:text-blue-800">View Details</a>
      </div>

      {/* Attendance Statistics */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-lg font-semibold text-blue-600">65%</p>
          <p className="text-sm text-blue-600">Student Present</p>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4">
          <p className="text-lg font-semibold text-yellow-600">21%</p>
          <p className="text-sm text-yellow-600">Late</p>
        </div>
        <div className="bg-red-50 rounded-lg p-4">
          <p className="text-lg font-semibold text-red-600">9%</p>
          <p className="text-sm text-red-600">Absent</p>
        </div>
      </div>

      {/* Class Selection */}
      <div className="mb-6">
        <div className="flex space-x-4">
          {['Math', 'English', 'Science'].map((subject) => (
            <button
              key={subject}
              onClick={() => setSelectedClass(subject)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                selectedClass === subject
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {subject}
            </button>
          ))}
        </div>
      </div>

      {/* Status Selection */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Status</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="flex items-center space-x-2">
            <input type="radio" name="status" id="present" className="text-blue-600" />
            <label htmlFor="present" className="text-sm text-gray-600">Present</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="radio" name="status" id="absent" className="text-blue-600" />
            <label htmlFor="absent" className="text-sm text-gray-600">Absent</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="radio" name="status" id="late" className="text-blue-600" />
            <label htmlFor="late" className="text-sm text-gray-600">Late</label>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <button className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
          Cancel
        </button>
        <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
          Submit Attendance
        </button>
      </div>
    </div>
  );
};

export default FacultyAttendance;
