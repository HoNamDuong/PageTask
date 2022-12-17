import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Loading = () => {
    return (
        <section className="flex h-80 max-h-full flex-col items-center justify-center text-center">
            <h1 className="text-4xl font-bold dark:text-gray-600">
                <FontAwesomeIcon
                    className="mr-2 inline animate-spin text-gray-200 dark:text-gray-600"
                    icon={faSpinner}
                />
            </h1>
        </section>
    )
}

export default Loading
