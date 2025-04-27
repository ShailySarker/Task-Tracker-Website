import { format } from 'date-fns';
import { Link } from 'react-router';

const ProjectCard = ({ project }) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="xl:p-6 lg:p-5 p-4">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                    {project?.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 md:text-base text-sm">
                    {project?.description || 'No description'}
                </p>
                <span className="xl:hidden lg:block hidden text-xs text-gray-500 dark:text-gray-400">
                    Created: {format(new Date(project?.createdAt), 'MMM d, yyyy')}
                </span>
                <div className="flex justify-between items-center xl:mt-0 lg:mt-2 mt-0">
                    <span className="text-sm text-gray-500 font-semibold dark:text-gray-400">
                        {project?.tasks?.length || 0} tasks
                    </span>
                    <span className="xl:block lg:hidden block text-xs text-gray-500 dark:text-gray-400">
                        Created: {format(new Date(project?.createdAt), 'MMM d, yyyy')}
                    </span>
                    <Link
                        to={`/projects/${project?._id}`}
                        className="text-blue-700 border-2 border-blue-700 px-2 rounded-xl text-sm py-1 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-600 font-medium"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;