import {
    faListCheck,
    faUser,
    faUserGear,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router-dom'
import { PART } from '../config/constant.'
import useAuth from '../hooks/useAuth'
import useLocalStorage from '../hooks/useLocalStorage'

const DashHeader = () => {
    const [dark, setDark] = useLocalStorage('dark', false)
    const { isMod, isAdmin } = useAuth()

    const toggleDarkMode = () => {
        if (!dark) {
            setDark(true)
            document.documentElement.classList.add('dark')
        } else {
            setDark(false)
            document.documentElement.classList.remove('dark')
        }
    }

    return (
        <nav className="border-b border-gray-200 dark:border-gray-700">
            <ul className="-mb-px flex flex-wrap text-center text-sm font-medium text-gray-500 dark:text-gray-400">
                <li className="mr-2">
                    <NavLink to={PART.Task}>
                        {({ isActive }) => {
                            return (
                                <div
                                    className={`inline-flex rounded-t-lg border-b-2 border-transparent px-4 py-3
                            ${
                                isActive
                                    ? 'group border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500'
                                    : 'group hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300'
                            }`}
                                >
                                    <FontAwesomeIcon
                                        className="mr-2 h-5 w-5"
                                        icon={faListCheck}
                                    />
                                    {isActive && 'Task'}
                                </div>
                            )
                        }}
                    </NavLink>
                </li>
                <li className="mr-2">
                    <NavLink to={PART.Profile}>
                        {({ isActive }) => {
                            return (
                                <div
                                    className={`inline-flex rounded-t-lg border-b-2 border-transparent px-4 py-3
                            ${
                                isActive
                                    ? 'group border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500'
                                    : 'group hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300'
                            }`}
                                >
                                    <FontAwesomeIcon
                                        className="mr-2 h-5 w-5"
                                        icon={faUser}
                                    />
                                    {isActive && 'Profile'}
                                </div>
                            )
                        }}
                    </NavLink>
                </li>
                {(isMod || isAdmin) && (
                    <li className="mr-2">
                        <NavLink to={PART.Account}>
                            {({ isActive }) => {
                                return (
                                    <div
                                        className={`inline-flex rounded-t-lg border-b-2 border-transparent px-4 py-3
                            ${
                                isActive
                                    ? 'group border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500'
                                    : 'group hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300'
                            }`}
                                    >
                                        <FontAwesomeIcon
                                            className="mr-2 h-5 w-5"
                                            icon={faUserGear}
                                        />
                                        {isActive && 'Account'}
                                    </div>
                                )
                            }}
                        </NavLink>
                    </li>
                )}
                <li className="my-auto ml-auto pr-4">
                    <label className="relative inline-flex cursor-pointer items-center">
                        <input
                            type="checkbox"
                            className="peer sr-only"
                            onChange={() => toggleDarkMode()}
                            checked={dark}
                        />
                        <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white dark:border-gray-600 dark:bg-gray-700"></div>
                    </label>
                </li>
            </ul>
        </nav>
    )
}

export default DashHeader
