import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDeleteTaskMutation, useUpdateTaskMutation } from './taskApiSlice'

const Task = ({ task }) => {
    const [deleteTask] = useDeleteTaskMutation()
    const [updateTask] = useUpdateTaskMutation()

    const handleChangeStatusTask = async () => {
        await updateTask({
            id: task._id,
            completed: !task.completed,
        })
    }

    const handleDeleteTask = async () => {
        await deleteTask({ id: task._id })
    }

    const date = task.date
        ? new Date(task.date).toLocaleString('en', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
          })
        : ''

    const dateAndTime = (
        <>
            {date} {task.time}
        </>
    )

    let classBg
    let priority

    if (task.priority === 'Medium') {
        classBg = 'bg-[#3b83f610] dark:border-[#1d4ed8]'
        priority = (
            <span className="mr-2 rounded bg-blue-100 px-2.5 py-0.5 text-sm font-medium text-blue-900 dark:bg-blue-900 dark:text-blue-100">
                Medium
            </span>
        )
    } else if (task.priority === 'High') {
        classBg = 'bg-[#eab30810] dark:border-[#a16207]'
        priority = (
            <span className="mr-2 rounded bg-yellow-100 px-2.5 py-0.5 text-sm font-medium text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100">
                High
            </span>
        )
    } else if (task.priority === 'Low') {
        classBg = 'bg-[#64748b10] dark:border-[#374151]'
        priority = (
            <span className="mr-2 rounded bg-gray-200 px-2.5 py-0.5 text-sm font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                Low
            </span>
        )
    } else {
        priority = <></>
        classBg = ''
    }

    classBg += task.completed ? ' opacity-50' : ''

    return (
        <>
            <div
                className={`${classBg} rounded-lg border border-gray-200 px-4 py-2 dark:bg-gray-900`}
            >
                <div className="flex flex-wrap items-center justify-between py-1">
                    <input
                        id="completed"
                        type="checkbox"
                        className="mr-2 h-6 w-6 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                        onChange={handleChangeStatusTask}
                        checked={task.completed}
                    />
                    {priority}
                    {dateAndTime}
                    <button
                        type="button"
                        className="ml-auto h-6 w-6 rounded text-gray-500 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                        onClick={handleDeleteTask}
                    >
                        <FontAwesomeIcon className="h-6 w-6" icon={faXmark} />
                    </button>
                </div>
                <h3 className="text-lg text-gray-800 dark:text-gray-300">
                    {task.title}
                </h3>
                {task.description}
            </div>
        </>
    )
}

export default Task
