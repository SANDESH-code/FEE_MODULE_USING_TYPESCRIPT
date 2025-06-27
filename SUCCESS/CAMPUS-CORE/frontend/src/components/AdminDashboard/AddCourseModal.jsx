import { useState } from 'react';

const AddCourseModal = ({ isOpen, onClose, onSubmit }) => {
  const [form, setForm] = useState({
    name: '',
    code: '',
    department: '',
    credits: 1,
    students: 0,
    faculty: 'Not Assigned',
    status: 'Pending',
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({
      name: '',
      code: '',
      department: '',
      credits: 1,
      students: 0,
      faculty: 'Not Assigned',
      status: 'Pending',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-4">Add New Course</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" value={form.name} onChange={handleChange} required placeholder="Course Name" className="w-full border rounded px-3 py-2" />
          <input name="code" value={form.code} onChange={handleChange} required placeholder="Course Code" className="w-full border rounded px-3 py-2" />
          <input name="department" value={form.department} onChange={handleChange} required placeholder="Department" className="w-full border rounded px-3 py-2" />
          <input name="credits" type="number" min="1" max="10" value={form.credits} onChange={handleChange} required placeholder="Credits" className="w-full border rounded px-3 py-2" />
          <div className="flex gap-2 justify-end mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Add Course</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourseModal;
