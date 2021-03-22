import TaskCard from './TaskCard'
const Task = ({tasksData, onDelete, onToggle}) => {
    return (
        <>
            {tasksData.map((task)=>(
                <TaskCard key={task.id} task={task} onDelete={onDelete} onToggle={onToggle} />
            ))}
        </>
    )
}

export default Task
