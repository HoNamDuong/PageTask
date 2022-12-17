import { Link } from 'react-router-dom'
import { PART } from '../config/constant.'
import useAuth from '../hooks/useAuth'
import useTitle from '../hooks/useTitle'

const Welcome = () => {
    useTitle('Welcome!')

    const { id } = useAuth()

    return (
        <section className="my-12 flex flex-col items-center justify-center text-center">
            <h2 className="text-6xl font-bold dark:text-gray-600">Welcome!</h2>
            <p className="my-8 px-8 dark:text-gray-400">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Cupiditate eveniet eligendi fugiat iusto! Quos, temporibus enim?
                Eum corrupti alias, doloremque mollitia sint quasi tempora vero
                facere error totam deleniti doloribus?
            </p>
            <div className="flex items-center gap-2">
                {id ? (
                    <Link
                        className="rounded-lg bg-gradient-to-br from-green-400 to-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl dark:text-black"
                        to={`/${PART.Dash}`}
                    >
                        Task
                    </Link>
                ) : (
                    <>
                        <Link
                            className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700"
                            to={`/${PART.Login}`}
                        >
                            Login
                        </Link>
                        <Link
                            className="rounded-lg bg-gradient-to-br from-green-400 to-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl dark:text-black"
                            to={`/${PART.Register}`}
                        >
                            Register
                        </Link>
                    </>
                )}
            </div>
        </section>
    )
}

export default Welcome
