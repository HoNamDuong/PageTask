import { faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import useTitle from '../../hooks/useTitle'
import Filter from './Filter'
import NewTask from './NewTaskModal'
import Sort from './Sort'
import TaskList from './TaskList'

const TaskLayout = () => {
    useTitle('Task')

    const [showModel, setShowModel] = useState(false)

    const toggleNewTaskModal = () => setShowModel((prev) => !prev)

    return (
        <>
            <section className="px-4 py-4">
                <Filter />
                <Sort />
                <TaskList />
                {/* New task */}
                <div className="group fixed right-6 bottom-6">
                    <button
                        type="button"
                        className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-700 text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={toggleNewTaskModal}
                    >
                        <FontAwesomeIcon className="h-6 w-6" icon={faPen} />
                    </button>
                </div>
                {showModel && <NewTask toggle={toggleNewTaskModal} />}
            </section>
        </>
    )
}

export default TaskLayout
