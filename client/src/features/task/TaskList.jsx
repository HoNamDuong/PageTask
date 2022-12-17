import { useSelector } from 'react-redux'
import { SORT } from '../../config/constant.'
import Task from './Task'
import { useGetTasksQuery } from './taskApiSlice'
import { taskListRemaining, typeSortSelector } from './taskSelector'
import TaskSkeleton from './TaskSkeleton'

const TaskList = () => {
    const { isLoading, isSuccess, isError, error } = useGetTasksQuery(
        undefined,
        {
            pollingInterval: 60000,
            refetchOnMountOrArgChange: true,
        }
    )

    const tasks = useSelector(taskListRemaining)
    const sortType = useSelector(typeSortSelector)

    let content

    if (isLoading)
        content = (
            <>
                <ul className="flex flex-col gap-4">
                    <li>
                        <TaskSkeleton />
                    </li>
                    <li>
                        <TaskSkeleton />
                    </li>
                    <li>
                        <TaskSkeleton />
                    </li>
                </ul>
            </>
        )

    if (isError) {
        content = (
            <p
                className={
                    'w-full rounded-lg border border-red-700 px-5 py-2.5 text-center text-sm font-medium text-red-700'
                }
                aria-live="assertive"
            >
                {error?.status} {error?.data?.message}
            </p>
        )
    }

    if (isSuccess) {
        if (sortType === SORT.Time) {
            const taskListHasTime = tasks.filter((task) => task.date)
            const taskListNoteHasTime = tasks.filter((task) => !task.date)

            content = (
                <ul className="flex flex-col gap-4">
                    <p>Sort time</p>
                    {taskListHasTime.map((task) => (
                        <li key={task._id}>
                            <Task task={task} />
                        </li>
                    ))}
                    <p>Not time</p>
                    {taskListNoteHasTime.map((task) => (
                        <li key={task._id}>
                            <Task task={task} />
                        </li>
                    ))}
                </ul>
            )
        } else {
            content = (
                <ul className="flex flex-col gap-4">
                    {tasks.map((task) => (
                        <li key={task._id}>
                            <Task task={task} />
                        </li>
                    ))}
                </ul>
            )
        }
    }

    return content
}

export default TaskList
