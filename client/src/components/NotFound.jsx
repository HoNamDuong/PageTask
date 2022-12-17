import { Link } from 'react-router-dom'
import useTitle from '../hooks/useTitle'

const NotFound = () => {
    useTitle('Not found')

    return (
        <section className="flex h-screen items-center bg-white p-16 dark:bg-gray-900">
            <div className="container mx-auto my-8 flex flex-col items-center justify-center px-5">
                <div className="max-w-md text-center">
                    <h2 className="mb-8 text-9xl font-bold dark:text-gray-600">
                        404
                    </h2>
                    <Link
                        to={'/'}
                        className="rounded bg-gray-800 px-8 py-3 font-semibold text-white dark:bg-slate-400 dark:text-gray-900"
                    >
                        Back to homepage
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default NotFound
