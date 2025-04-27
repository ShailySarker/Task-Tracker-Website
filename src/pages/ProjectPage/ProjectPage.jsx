import React from 'react';
import { useParams } from 'react-router';
import { useTaskNotifications } from '../../hooks/useTaskNotifications';
import TasksList from './Components/TasksList';

const ProjectPage = () => {
    const { projectId } = useParams();
    useTaskNotifications(projectId);
    return (
        <div>
            <TasksList projectId={projectId} />
        </div>
    );
};

export default ProjectPage;