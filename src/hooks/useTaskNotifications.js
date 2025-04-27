import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useTasks } from './useTasks';


export const useTaskNotifications = (projectId) => {
  const { tasks } = useTasks(projectId);

  useEffect(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    tasks.forEach(task => {
      if (task.dueDate && !task.completedAt) {
        const dueDate = new Date(task.dueDate);
        const daysUntilDue = Math.floor((dueDate - today) / (1000 * 60 * 60 * 24));
        
        if (daysUntilDue === 0) {
          toast.warning(`Task "${task.title}" is due today!`);
        } else if (daysUntilDue === 1) {
          toast.info(`Task "${task.title}" is due tomorrow!`);
        } else if (daysUntilDue < 0) {
          toast.error(`Task "${task.title}" is overdue by ${Math.abs(daysUntilDue)} days!`);
        }
      }
    });
  }, [tasks]);
};