import { useState } from 'react';
import { format } from 'date-fns';

const TaskCard = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description,
    status: task.status,
    dueDate: task.dueDate ? format(new Date(task.dueDate), 'yyyy-MM-dd') : '',
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
    if (formData.description.length > 500) newErrors.description = 'Description must be less than 500 characters';
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
      dueDate: formData.dueDate ? new Date(formData.dueDate) : null,
    };
    
    onUpdate(task._id, formattedData);
    setIsEditing(false);
  };

  const statusColors = {
    todo: 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
    'in-progress': 'bg-blue-200 text-blue-800 dark:bg-blue-700 dark:text-blue-200',
    completed: 'bg-green-200 text-green-800 dark:bg-green-700 dark:text-green-200',
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4">
      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
              rows="3"
            />
            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Due Date
            </label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-3 py-1 font-medium bg-gray-200 rounded dark:bg-gray-600 dark:text-white"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-3 py-1 font-medium bg-blue-700 text-white rounded hover:bg-indigo-700"
            >
              Update
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg dark:text-white">{task.title}</h3>
            <span
              className={`px-3 py-1 text-xs rounded-full font-medium ${statusColors[task.status]}`}
            >
              {task.status.replace('-', ' ')}
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            {task.description || 'No description'}
          </p>
          {task.dueDate && (
            <p className={`text-sm mt-2 font-semibold italic ${
              new Date(task.dueDate) < new Date() && task.status !== 'completed'
                ? 'text-red-500'
                : 'text-yellow-500 dark:text-gray-400'
            }`}>
              Due: {format(new Date(task.dueDate), 'MMM dd, yyyy')}
              {new Date(task.dueDate) < new Date() && task.status !== 'completed' && ' (Overdue)'}
            </p>
          )}
          {task.completedAt && (
            <p className="text-sm font-medium text-green-500 dark:text-green-400 mt-1">
              Completed: {format(new Date(task.completedAt), 'MMM dd, yyyy')}
            </p>
          )}
          <div className="flex justify-end space-x-2 mt-3">
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-700 font-medium md:text-base text-sm dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-blue-700"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(task._id)}
              className="text-red-600 font-medium md:text-base text-sm dark:text-red-400 hover:text-red-800 dark:hover:text-red-600"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskCard;