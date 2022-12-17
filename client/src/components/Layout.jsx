import { Link, Outlet } from 'react-router-dom'
import useLocalStorage from '../hooks/useLocalStorage'

const Layout = () => {
    const [dark, setDark] = useLocalStorage('dark', false)

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
        <div className="flex min-h-screen flex-col items-center bg-white text-gray-700 dark:bg-gray-900 dark:text-gray-400">
            {/* Header */}
            <header className="mt-8 w-full max-w-md text-center text-6xl font-bold text-gray-900 dark:text-white">
                <Link to={'/'}>
                    <span className="bg-gradient-to-r from-green-400 to-blue-600 bg-clip-text text-transparent">
                        Task
                    </span>
                    App
                </Link>
            </header>
            {/* Body */}
            <div className="my-8 w-full max-w-md rounded-lg border border-gray-200 shadow-md dark:border-gray-700 dark:bg-gray-800">
                <Outlet />
            </div>
            {/* Footer */}
            <footer className="mb-8 w-full max-w-md text-center">
                Built by
                <span className="ml-2 bg-gradient-to-r from-green-400 to-blue-600 bg-clip-text text-transparent">
                    HoNamDuong
                </span>
                <span className="ml-4 cursor-pointer" onClick={toggleDarkMode}>
                    Toggle Dark Mode
                </span>
            </footer>
        </div>
    )
}

export default Layout
