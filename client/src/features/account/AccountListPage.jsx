import { useState } from 'react'
import Account from './Account'
import { useGetAccountsByPageQuery } from './accountApiSlice'
import AccountSkeleton from './AccountSkeleton'

const AccountListPage = () => {
    const [page, setPage] = useState(1)
    const perPage = 3
    const perPageArr = [...Array(perPage).keys()]

    const {
        data: result,
        isPreviousData,
        isFetching,
        isSuccess,
        isError,
        error,
    } = useGetAccountsByPageQuery({ page, perPage })

    let content
    let nav

    if (isError) return <p>Error: {error.message}</p>

    if (isSuccess) {
        const lastPage = () => setPage(result.totalPage)

        const firstPage = () => setPage(1)

        const pagesArray = Array(result.totalPage)
            .fill()
            .map((_, index) => index + 1)

        nav = (
            <nav className="mb-4 inline-flex w-full justify-center -space-x-px">
                <button
                    className="ml-0 rounded-l-lg border border-gray-300 bg-white px-3 py-1 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    onClick={firstPage}
                    disabled={isPreviousData || page === 1}
                >
                    First
                </button>
                {/* Removed isPreviousData from PageButton to keep button focus color instead */}
                {pagesArray.map((pg) => (
                    <button
                        key={pg}
                        className={
                            page === pg
                                ? 'border border-gray-300 bg-blue-50 px-3 py-1 text-blue-600 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
                                : 'border border-gray-300 bg-white px-3 py-1 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                        }
                        onClick={() => setPage(pg)}
                    >
                        {pg}
                    </button>
                ))}
                <button
                    className="rounded-r-lg border border-gray-300 bg-white px-3 py-1 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    onClick={lastPage}
                    disabled={isPreviousData || page === result.totalPage}
                >
                    Last
                </button>
            </nav>
        )

        content = (
            <ul className="flex flex-col gap-2">
                {result.data.map((account) => (
                    <li key={account._id}>
                        <Account account={account} />
                    </li>
                ))}
            </ul>
        )
    }

    return (
        <>
            {nav}
            {isFetching ? (
                <ul className="flex flex-col gap-2">
                    {perPageArr.map((i) => (
                        <li key={i}>
                            <AccountSkeleton />
                        </li>
                    ))}
                </ul>
            ) : (
                content
            )}
        </>
    )
}

export default AccountListPage
