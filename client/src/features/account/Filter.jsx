import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
    changeFilterActive,
    changeFilterSearch,
    resetFilter,
} from './accountSlice'

const Filter = () => {
    const [search, setSearch] = useState('')
    const dispatch = useDispatch()

    const onChangeFilterSearch = (e) => {
        setSearch(e.target.value)
        dispatch(changeFilterSearch(e.target.value))
    }

    const onChangeFilterActive = (e) => {
        dispatch(changeFilterActive(e.target.value === 'true'))
    }

    useEffect(() => {
        return () => dispatch(resetFilter())
    }, [dispatch])

    return (
        <>
            <div className="relative mb-4 w-full">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <FontAwesomeIcon
                        className="h-4 w-4"
                        icon={faMagnifyingGlass}
                    />
                </div>
                <input
                    type="text"
                    id="search"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-200 focus:ring-blue-500  dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="Search"
                    required
                    value={search}
                    onChange={onChangeFilterSearch}
                />
            </div>
            {/*  */}
            <select
                className="mb-4 block w-full rounded-lg border-transparent bg-gray-50 px-4 py-2 text-sm text-gray-900 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-400"
                onChange={onChangeFilterActive}
            >
                <option value={true}>List account active</option>
                <option value={false}>List account ban</option>
            </select>
        </>
    )
}

export default Filter
