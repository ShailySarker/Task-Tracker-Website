import { useState } from 'react';

const TaskForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'todo',
    // status: '',
    dueDate: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (formData.title.length > 100) newErrors.title = 'Title must be less than 100 characters';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (formData.description.length > 500) newErrors.description = 'Description must be less than 500 characters';
    if (!formData.status) newErrors.status = 'Status is required';
    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required';
    } else {
      const selectedDate = new Date(formData.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // remove time part
      if (selectedDate < today) {
        newErrors.dueDate = 'Due date cannot be a past day';
      }
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formattedData = {
      ...formData,
      // dueDate: formData.dueDate ? new Date(formData.dueDate) : null,
      dueDate: new Date(formData.dueDate),
    };

    onSubmit(formattedData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Title *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder='Task name'
          value={formData.title}
          onChange={handleChange}
          className={`placeholder:text-black mt-2 border-2 px-4 md:py-2 py-[6px] block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.title ? 'border-red-500' : ''
            }`}
        />
        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          placeholder='Task description'
          rows={3}
          value={formData.description}
          onChange={handleChange}
          className={`placeholder:text-black mt-2 border-2 px-4 md:py-2 py-[6px] block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.description ? 'border-red-500' : ''
            }`}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description}</p>
        )}
      </div>
      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Status
        </label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="mt-2 border-2 px-4 md:py-2 py-[6px] block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          {/* <option value="">Select Status</option> */}
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status}</p>}
      </div>
      <div>
        <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Due Date
        </label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          className="mt-2 border-2 px-4 md:py-2 py-[6px] block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        {errors.dueDate && <p className="mt-1 text-sm text-red-600">{errors.dueDate}</p>}
      </div>
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-gray-600 dark:text-white dark:border-gray-500 dark:hover:bg-gray-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Create Task
        </button>
      </div>
    </form>
  );
};

export default TaskForm;