import { faClose, faPlus, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import {
    PRIORITY,
    TITLE_REGEX,
    DESCRIPTION_REGEX,
} from '../../config/constant.'
import { useAddNewTaskMutation } from './taskApiSlice'

const NewTask = ({ toggle }) => {
    const [addNewTask, { isLoading, isSuccess, isError, error }] =
        useAddNewTaskMutation()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [priority, setPriority] = useState(PRIORITY.Medium)

    useEffect(() => {
        if (isSuccess) {
            setTitle('')
            setDescription('')
            setDate('')
            setTime('')
            setPriority(PRIORITY.Medium)
            toggle()
        }
    }, [isSuccess, toggle])

    const onChangeTitleInput = (e) => setTitle(e.target.value)
    const onChangeDescriptionInput = (e) => setDescription(e.target.value)
    const onChangePriorityInput = (e) => setPriority(e.target.value)
    const onChangeTimeInput = (e) => setTime(e.target.value)
    const onChangeDateInput = (e) => setDate(e.target.value)

    const canSave =
        TITLE_REGEX.test(title) &&
        DESCRIPTION_REGEX.test(description) &&
        !isLoading

    const handleSubmitNewTask = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewTask({
                title,
                description,
                priority,
                time,
                date,
            })
        }
    }

    return (
        <>
            <div className="fixed top-0 right-0 left-0 z-50 flex h-screen items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-900 bg-opacity-50 dark:bg-opacity-80">
                <div className="relative w-full max-w-md rounded-lg bg-white px-4 py-3 shadow dark:bg-gray-800">
                    {/* Header */}
                    <div className="flex items-start justify-between dark:border-gray-600">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                            New task
                        </h3>
                        <button
                            className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                            type="button"
                            onClick={toggle}
                        >
                            <FontAwesomeIcon
                                className="h-5 w-5"
                                icon={faClose}
                            />
                        </button>
                    </div>
                    {/* Body */}
                    <p
                        className={
                            isError
                                ? 'w-full rounded-lg border border-red-700 px-5 py-2.5 text-center text-sm font-medium text-red-700'
                                : 'absolute left-full'
                        }
                        aria-live="assertive"
                    >
                        {error?.status} {error?.data?.message}
                    </p>
                    <form className="mt-4" onSubmit={handleSubmitNewTask}>
                        <label
                            htmlFor="title"
                            className="mb-2 block text-base font-medium text-gray-700 dark:text-gray-300"
                        >
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            className="mb-4 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500"
                            required
                            value={title}
                            onChange={onChangeTitleInput}
                        />
                        <label
                            htmlFor="description"
                            className="mb-2 block text-base font-medium text-gray-700 dark:text-gray-300"
                        >
                            Description
                        </label>
                        <textarea
                            id="description"
                            rows="5"
                            className="mb-4 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 "
                            value={description}
                            onChange={onChangeDescriptionInput}
                        />
                        <label
                            htmlFor="date"
                            className="mb-2 block text-base font-medium text-gray-700 dark:text-gray-300"
                        >
                            Date and time
                        </label>
                        <div className="mb-4 flex gap-2">
                            <input
                                id="date"
                                type="date"
                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500"
                                value={date}
                                onChange={onChangeDateInput}
                            />
                            <input
                                disabled={date ? false : true}
                                type="time"
                                className="block w-48 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500"
                                value={time}
                                onChange={onChangeTimeInput}
                            />
                        </div>
                        <label
                            htmlFor="priority"
                            className="mb-2 block text-base font-medium text-gray-700 dark:text-gray-300"
                        >
                            Priority
                        </label>
                        <div className="my-2 flex">
                            <select
                                id="priority"
                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 "
                                value={priority}
                                onChange={onChangePriorityInput}
                            >
                                {Object.values(PRIORITY).map((item) => {
                                    return (
                                        <option key={item} value={item}>
                                            {item}
                                        </option>
                                    )
                                })}
                            </select>
                            {isLoading ? (
                                <button
                                    disabled
                                    type="button"
                                    className="ml-2 w-56 rounded-lg border border-blue-700 bg-blue-700 p-2.5 text-sm font-medium text-white hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 "
                                >
                                    <FontAwesomeIcon
                                        className="mr-2 inline h-4 w-4 animate-spin text-gray-200 dark:text-gray-600"
                                        icon={faSpinner}
                                    />
                                    Loading...
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className="ml-2 w-56 rounded-lg border border-blue-700 bg-blue-700 p-2.5 text-sm font-medium text-white hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 "
                                    disabled={!canSave}
                                >
                                    <FontAwesomeIcon
                                        className="mr-2 h-4 w-4"
                                        icon={faPlus}
                                    />
                                    New task
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default NewTask
