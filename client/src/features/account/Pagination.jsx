import {
    faAngleDoubleLeft,
    faAngleDoubleRight,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { usePagination, DOTS } from '../../hooks/usePagination'

const Pagination = (props) => {
    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize,
    } = props

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize,
    })

    if (currentPage === 0 || paginationRange.length < 2) {
        return null
    }

    let lastPage = paginationRange[paginationRange.length - 1]

    const onNext = () => {
        onPageChange(currentPage + 1)
    }

    const onPrevious = () => {
        onPageChange(currentPage - 1)
    }

    const onFirst = () => {
        onPageChange(1)
    }

    const onLast = () => {
        onPageChange(lastPage)
    }

    return (
        <ul className="mb-4 inline-flex w-full justify-center -space-x-px">
            <li>
                <button
                    className="rounded-l-lg border border-gray-300 bg-white px-3 py-1 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white sm:hidden"
                    onClick={onFirst}
                    disabled={currentPage === 1}
                >
                    <FontAwesomeIcon icon={faAngleDoubleLeft} />
                </button>
            </li>
            <li>
                <button
                    className="rounded-l-lg border border-gray-300 bg-white px-3 py-1 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    onClick={onPrevious}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
            </li>
            {paginationRange.map((pageNumber, index) => {
                if (pageNumber === DOTS) {
                    return (
                        <li
                            key={index}
                            className="hidden border border-gray-300 bg-white px-3 py-1 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white sm:block"
                        >
                            &#8230;
                        </li>
                    )
                }

                return (
                    <li key={index}>
                        <button
                            className={
                                pageNumber === currentPage
                                    ? 'border border-gray-300 bg-blue-50 px-3 py-1 leading-tight text-blue-600 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
                                    : 'hidden border border-gray-300 bg-white px-3 py-1 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white sm:block'
                            }
                            onClick={() => onPageChange(pageNumber)}
                        >
                            {pageNumber}
                        </button>
                    </li>
                )
            })}
            <li>
                <button
                    onClick={onNext}
                    className="rounded-r-lg border border-gray-300 bg-white px-3 py-1 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    disabled={currentPage === lastPage}
                >
                    Next
                </button>
            </li>
            <li>
                <button
                    onClick={onLast}
                    className="rounded-r-lg border border-gray-300 bg-white px-3 py-1 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white sm:hidden"
                    disabled={currentPage === lastPage}
                >
                    <FontAwesomeIcon icon={faAngleDoubleRight} />
                </button>
            </li>
        </ul>
    )
}

export default Pagination
