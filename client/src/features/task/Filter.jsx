import {
    faMagnifyingGlass,
    faChevronDown,
    faFilter,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
    changeFilterPriorities,
    changeFilterSearch,
    changeFilterStatus,
    resetFilter,
} from './taskSlice'

const Filter = () => {
    const [toggleFilter, setToggleFilter] = useState(false)
    const [search, setSearch] = useState('')
    const dispatch = useDispatch()

    const handleToggleFilter = () => {
        if (toggleFilter) {
            dispatch(resetFilter())
            setSearch('')
        }
        setToggleFilter((prev) => !prev)
    }
    const handleFilterSearchChange = (event) => {
        setSearch(event.target.value)
        dispatch(changeFilterSearch(event.target.value))
    }

    const handleFilterStatusChange = (event) => {
        dispatch(changeFilterStatus(event.target.id))
    }

    const handleFilterPrioritiesChange = (event) => {
        let priorities = []
        for (const input of event.target.form) {
            if (input.checked === true) {
                priorities.push(input.id)
            }
        }
        dispatch(changeFilterPriorities(priorities))
    }

    useEffect(() => {
        return () => dispatch(resetFilter())
    }, [dispatch])

    return (
        <>
            <div className="mb-4 rounded-lg bg-gray-50 dark:bg-gray-900">
                <button
                    type="button"
                    className="flex w-full items-center justify-between px-4 py-2 text-gray-700 dark:text-gray-300"
                    onClick={handleToggleFilter}
                >
                    <span>Filter</span>
                    {/* <FontAwesomeIcon
                        className={`h-3 w-3 shrink-0 text-gray-500 ${
                            toggleFilter ? 'rotate-180' : ''
                        }`}
                        icon={faChevronDown}
                    /> */}
                    <FontAwesomeIcon
                        className={`h-5 w-5 shrink-0 text-gray-500`}
                        icon={faFilter}
                    />
                </button>
                {toggleFilter && (
                    <div className={`border-t px-4 py-2 dark:border-gray-700`}>
                        <div className="">
                            <label
                                htmlFor="search"
                                className="text-gray-500 dark:text-gray-400"
                            >
                                Filter by search
                            </label>
                            <div className="relative my-2 w-full">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <FontAwesomeIcon
                                        className="h-4 w-4 text-gray-500 dark:text-gray-400"
                                        icon={faMagnifyingGlass}
                                    />
                                </div>
                                <input
                                    type="text"
                                    id="search"
                                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-200 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                    placeholder="Search"
                                    required
                                    value={search}
                                    onChange={handleFilterSearchChange}
                                />
                            </div>
                        </div>
                        <div className="">
                            <label
                                htmlFor="status"
                                className="text-gray-500 dark:text-gray-400"
                            >
                                Filter by status
                            </label>
                            <form
                                className="my-2"
                                onChange={handleFilterStatusChange}
                            >
                                <ul className="flex w-full justify-start gap-2">
                                    <li>
                                        <input
                                            type="radio"
                                            name="status"
                                            id="all"
                                            className="peer hidden"
                                            defaultChecked
                                        />
                                        <label
                                            htmlFor="all"
                                            className="block rounded border border-gray-200 px-4 py-1 text-sm font-medium text-gray-900 peer-checked:border-blue-400 dark:border-gray-700 dark:text-gray-300 sm:mr-4"
                                        >
                                            All
                                        </label>
                                    </li>
                                    <li>
                                        <input
                                            type="radio"
                                            name="status"
                                            id="completed"
                                            className="peer hidden"
                                        />
                                        <label
                                            htmlFor="completed"
                                            className="block rounded border border-gray-200  px-4 py-1 text-sm font-medium text-gray-900 peer-checked:border-blue-400 dark:border-gray-700 dark:text-gray-300 sm:mr-4"
                                        >
                                            Completed
                                        </label>
                                    </li>
                                    <li>
                                        <input
                                            type="radio"
                                            name="status"
                                            id="todo"
                                            className="peer hidden"
                                        />
                                        <label
                                            htmlFor="todo"
                                            className="block rounded border border-gray-200  px-4 py-1 text-sm font-medium text-gray-900 peer-checked:border-blue-400 dark:border-gray-700 dark:text-gray-300 sm:mr-4"
                                        >
                                            To do
                                        </label>
                                    </li>
                                </ul>
                            </form>
                        </div>
                        <div className="">
                            <label
                                htmlFor="status"
                                className="text-gray-500 dark:text-gray-400"
                            >
                                Filter by priority
                            </label>
                            <form
                                className="my-4"
                                onChange={handleFilterPrioritiesChange}
                            >
                                <ul className="flex justify-start gap-2">
                                    <li className="block">
                                        <input
                                            type="checkbox"
                                            id="Low"
                                            className="peer hidden"
                                        />
                                        <label
                                            htmlFor="Low"
                                            className="cursor-pointer rounded-lg border border-gray-800 px-3 py-1 text-center text-sm font-medium text-gray-900 hover:bg-gray-900 hover:text-white peer-checked:bg-gray-600 peer-checked:text-white dark:border-gray-600  dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white dark:peer-checked:bg-gray-600 sm:mr-4"
                                        >
                                            Low
                                        </label>
                                    </li>
                                    <li className="block">
                                        <input
                                            type="checkbox"
                                            className="peer hidden"
                                            id="Medium"
                                        />
                                        <label
                                            className="cursor-pointer rounded-lg border border-blue-200 px-3 py-1 text-center text-sm font-medium text-blue-200 hover:bg-blue-200 hover:text-white peer-checked:bg-blue-200 peer-checked:text-blue-800 dark:border-blue-200  dark:text-blue-200 dark:hover:bg-blue-200 dark:hover:text-blue-800 dark:peer-checked:bg-blue-200 sm:mr-4"
                                            htmlFor="Medium"
                                        >
                                            Medium
                                        </label>
                                    </li>
                                    <li className="block">
                                        <input
                                            type="checkbox"
                                            className="peer hidden"
                                            id="High"
                                        />
                                        <label
                                            className="cursor-pointer rounded-lg border border-yellow-200 px-3 py-1 text-center text-sm font-medium text-yellow-200 hover:bg-yellow-200 hover:text-white peer-checked:bg-yellow-200 peer-checked:text-black dark:border-yellow-200  dark:text-yellow-200 dark:hover:bg-yellow-200 dark:hover:text-gray-800 dark:peer-checked:bg-yellow-200 sm:mr-4"
                                            htmlFor="High"
                                        >
                                            High
                                        </label>
                                    </li>
                                </ul>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default Filter
