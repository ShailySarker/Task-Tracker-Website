const ProjectStats = ({ tasks }) => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.status === 'completed').length;
    const inProgressTasks = tasks.filter(task => task.status === 'in-progress').length;
    const todoTasks = tasks.filter(task => task.status === 'todo').length;
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 md:gap-4 gap-2 mb-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex flex-col gap-2">
          <h3 className="md:text-base text-sm text-gray-500 font-medium dark:text-gray-400">Total Tasks</h3>
          <p className="xl:text-2xl md:text-xl text-lg font-semibold dark:text-white">{totalTasks}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex flex-col gap-2">
          <h3 className="md:text-base text-sm text-gray-500 font-medium dark:text-gray-400">Completed</h3>
          <p className="xl:text-2xl md:text-xl text-lg font-semibold text-green-600 dark:text-green-400">{completedTasks}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex flex-col gap-2">
          <h3 className="md:text-base text-sm text-gray-500 font-medium dark:text-gray-400">In Progress</h3>
          <p className="xl:text-2xl md:text-xl text-lg font-semibold text-blue-600 dark:text-blue-400">{inProgressTasks}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex flex-col gap-2">
          <h3 className="md:text-base text-sm text-gray-500 font-medium dark:text-gray-400">Completion Rate</h3>
          <p className="xl:text-2xl md:text-xl text-lg font-semibold dark:text-white">{completionRate}%</p>
        </div>
      </div>
    );
  };
  
  export default ProjectStats;