import { useState } from 'react';
import {
  FaBook,
  FaBookOpen,
  FaBriefcase,
  FaBuilding,
  FaCalculator,
  FaChalkboardTeacher,
  FaEllipsisH,
  FaFlask,
  FaLaptopCode,
  FaSearch,
  FaUserGraduate
} from 'react-icons/fa';
import { toast, Toaster } from 'react-hot-toast';
import AddCourseModal from './AddCourseModal';
import EditCourseModal from './EditCourseModal';

const getCourseIcon = (department) => {
  const iconClass = "text-white text-base";
  switch (department) {
    case 'Computer Science':
      return <FaLaptopCode className={iconClass} />;
    case 'Mathematics':
      return <FaCalculator className={iconClass} />;
    case 'Physics':
      return <FaFlask className={iconClass} />;
    case 'Literature':
      return <FaBook className={iconClass} />;
    case 'Business':
      return <FaBriefcase className={iconClass} />;
    default:
      return <FaBookOpen className={iconClass} />;
  }
};

const CourseSetup = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [assignOnly, setAssignOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const [courses, setCourses] = useState([
    {
      id: 1,
      name: 'Introduction to Computer Science',
      code: 'CS101',
      department: 'Computer Science',
      credits: 4,
      students: 42,
      faculty: 'Dr. Robert Chen',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Advanced Mathematics',
      code: 'MATH302',
      department: 'Mathematics',
      credits: 3,
      students: 28,
      faculty: 'Dr. Emily Wilson',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Physics Laboratory',
      code: 'PHYS205',
      department: 'Physics',
      credits: 2,
      students: 35,
      faculty: 'Dr. Michael Thompson',
      status: 'Active'
    },
    {
      id: 4,
      name: 'English Literature',
      code: 'ENG204',
      department: 'Literature',
      credits: 3,
      students: 31,
      faculty: 'Dr. Sarah Johnson',
      status: 'Active'
    },
    {
      id: 5,
      name: 'Business Economics',
      code: 'BUS201',
      department: 'Business',
      credits: 3,
      students: 0,
      faculty: 'Not Assigned',
      status: 'Pending'
    },
    {
      id: 6,
      name: 'Database Systems',
      code: 'CS305',
      department: 'Computer Science',
      credits: 4,
      students: 0,
      faculty: 'Dr. James Anderson',
      status: 'Inactive'
    }
  ]);

  const departments = [...new Set(courses.map(c => c.department))];
  const statuses = [...new Set(courses.map(c => c.status))];

  const filteredCourses = courses.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = !departmentFilter || c.department === departmentFilter;
    const matchesStatus = !statusFilter || c.status === statusFilter;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const handleAddCourse = (newCourse) => {
    setCourses([...courses, { ...newCourse, id: Date.now() }]);
    toast.success('Course added successfully!');
  };

  const handleEditCourse = (updatedCourse) => {
    setCourses(courses.map(c => c.id === updatedCourse.id ? updatedCourse : c));
    setIsEditModalOpen(false);
    setSelectedCourse(null);
    setAssignOnly(false);
    toast.success(assignOnly ? 'Faculty assigned successfully!' : 'Course updated successfully!');
  };

  const openEditModal = (course) => {
    setSelectedCourse(course);
    setAssignOnly(false);
    setIsEditModalOpen(true);
  };

  const openAssignModal = (course) => {
    setSelectedCourse(course);
    setAssignOnly(true);
    setIsEditModalOpen(true);
  };

  const getStatusColor = (status) => {
    if (status === 'Active') return 'bg-green-100 text-green-600';
    if (status === 'Pending') return 'bg-yellow-100 text-yellow-600';
    return 'bg-red-100 text-red-600';
  };

  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
      <Toaster position="top-right" />

      {/* Header Section */}
      <div className="bg-white shadow-md rounded-xl border p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Course Management</h2>
            <p className="text-sm text-gray-500">Manage all courses for Summer Semester 2025</p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-blue-600 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-700"
          >
            + Add New Course
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard icon={<FaBookOpen />} label="Total Courses" value={48} color="text-blue-600" />
          <StatCard icon={<FaBuilding />} label="Departments" value={12} color="text-purple-600" />
          <StatCard icon={<FaChalkboardTeacher />} label="Active Faculty" value={36} color="text-green-600" />
          <StatCard icon={<FaUserGraduate />} label="Total Students" value={1248} color="text-yellow-600" />
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <select className="px-6 py-2 border rounded-md" value={departmentFilter} onChange={(e) => setDepartmentFilter(e.target.value)}>
          <option value="">All Departments</option>
          {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
        </select>

        <select className="px-5 py-2 border rounded-md" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All Status</option>
          {statuses.map(status => <option key={status} value={status}>{status}</option>)}
        </select>

        <div className="relative">
          <input type="text" placeholder="Search courses..." className="px-3 py-2 border rounded-md pl-10" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <FaSearch className="absolute top-2.5 left-3 text-gray-400" />
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map(course => (
          <div key={course.id} className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all">
            <div className="flex items-start justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                  {getCourseIcon(course.department)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm">{course.name}</h3>
                  <p className="text-xs text-gray-400 font-medium">{course.code}</p>
                </div>
              </div>
              <span className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(course.status)}`}>{course.status}</span>
            </div>

            <div className="px-4 pb-4 text-xs text-gray-600 space-y-1">
              <div>Department: <span className="font-medium text-gray-900">{course.department}</span></div>
              <div>Credits: <span className="font-medium text-gray-900">{course.credits}</span></div>
              <div>Students: <span className="font-medium text-gray-900">{course.students}</span></div>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 border-t text-xs text-gray-600">
              <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                <FaChalkboardTeacher className="text-gray-400 text-xs" />
              </div>
              <span className="text-sm text-gray-700 font-medium">{course.faculty}</span>
            </div>

            <div className="flex items-center justify-between px-4 py-3 border-t text-sm">
              <button onClick={() => openEditModal(course)} className="border border-gray-300 px-4 py-1.5 rounded-lg text-gray-600 hover:bg-gray-50">Edit</button>
              <button
                onClick={() => openAssignModal(course)}
                className={`px-4 py-1.5 rounded-lg font-medium ${course.faculty === 'Not Assigned' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'border border-gray-300 text-gray-600 hover:bg-gray-50'}`}
              >
                Assign
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <FaEllipsisH />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-10 flex justify-between items-center text-sm text-gray-500">
        <span>Showing {filteredCourses.length} of {courses.length} courses</span>
        <div className="flex gap-1">
          <button className="px-3 py-1 rounded-lg hover:bg-gray-100">‹</button>
          <button className="px-3 py-1 bg-blue-600 text-white rounded-lg">1</button>
          <button className="px-3 py-1 hover:bg-gray-100 rounded-lg">2</button>
          <button className="px-3 py-1 hover:bg-gray-100 rounded-lg">3</button>
          <button className="px-3 py-1 hover:bg-gray-100 rounded-lg">4</button>
          <button className="px-3 py-1 hover:bg-gray-100 rounded-lg">›</button>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-xs text-gray-400 mt-10 border-t pt-24">
        <div className="flex items-center justify-center gap-2">
          <span>🎯</span>
          <span>Designed and developed by <strong>ZoroTeam</strong></span>
          <span className="mx-2">©</span>
          <span><strong>2025 Zoro Innovations</strong></span>
        </div>
      </footer>

      {/* Modals */}
      <AddCourseModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddCourse}
      />
      <EditCourseModal
        isOpen={isEditModalOpen}
        onClose={() => { setIsEditModalOpen(false); setSelectedCourse(null); setAssignOnly(false); }}
        onSubmit={handleEditCourse}
        courseData={selectedCourse}
        assignOnly={assignOnly}
      />
    </div>
  );
};

const StatCard = ({ icon, label, value, color }) => (
  <div className="bg-gray-50 rounded-lg p-4 border hover:shadow-md transition">
    <div className="flex items-center gap-3">
      <div className={`h-10 w-10 rounded-lg bg-white flex items-center justify-center shadow ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-xl font-bold text-gray-800">{value.toLocaleString()}</p>
      </div>
    </div>
  </div>
);

export default CourseSetup;
