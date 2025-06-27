
const FacultyWelcomeBanner = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-2xl mx-6 my-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Welcome, Dr.Kab</h1>
          <p className="mt-1 text-sm text-white/80">Mon June 16, 2025 | Spring Semester 2025</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <span className="block text-xs text-white/80">Next Class</span>
            <span className="block text-sm font-medium text-white">Advanced Mathematics</span>
            <span className="block text-xs text-white/60 mt-1">10:00 AM - 11:30 AM</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyWelcomeBanner;
