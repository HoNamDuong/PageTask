import { useNavigate } from 'react-router-dom'
import useTitle from '../../hooks/useTitle'

const Unauthorized = () => {
    useTitle('Unauthorized')

    const navigate = useNavigate()

    const goBack = () => navigate(-1)

    return (
        <section className="my-8 flex flex-col items-center justify-center p-4 text-center">
            <h1 className="text-4xl font-bold">Unauthorized</h1>
            <br />
            <p>You do not have access to the requested page.</p>
            <br />
            <button
                className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                onClick={goBack}
            >
                Go Back
            </button>
        </section>
    )
}

export default Unauthorized
