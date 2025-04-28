import React from 'react';
import { useParams } from 'react-router';
import { useTaskNotifications } from '../../hooks/useTaskNotifications';
import TasksList from './Components/TasksList';

const ProjectPage = () => {
    const { projectId } = useParams();
    useTaskNotifications(projectId);
    return (
        <div className='bg-blue-50 xl:px-20 lg:px-14 md:px-8 px-5 min-h-screen'>
            <TasksList projectId={projectId} />
        </div>
    );
};

export default ProjectPage;