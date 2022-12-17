import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import Account from './Account'
import { useGetAccountsQuery } from './accountApiSlice'
import { accountListRemaining } from './accountSelector'
import AccountSkeleton from './AccountSkeleton'
import Pagination from './Pagination'

let pageSize = 5

const AccountList = () => {
    const [currentPage, setCurrentPage] = useState(1)

    const { isLoading, isSuccess, isError, error } = useGetAccountsQuery(
        undefined,
        {
            pollingInterval: 60000,
            refetchOnMountOrArgChange: true,
        }
    )

    const accounts = useSelector(accountListRemaining)

    useEffect(() => {
        setCurrentPage(1)
    }, [accounts])

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize
        const lastPageIndex = firstPageIndex + pageSize
        return accounts.slice(firstPageIndex, lastPageIndex)
    }, [currentPage, accounts])

    let content

    if (isLoading)
        content = (
            <>
                <ul className="flex flex-col gap-2">
                    <li>
                        <AccountSkeleton />
                    </li>
                    <li>
                        <AccountSkeleton />
                    </li>
                    <li>
                        <AccountSkeleton />
                    </li>
                </ul>
            </>
        )

    if (isError) {
        content = (
            <p
                className={
                    'w-full rounded-lg border border-red-700 px-5 py-2.5 text-center text-sm font-medium text-red-700'
                }
                aria-live="assertive"
            >
                {error?.status} {error?.data?.message}
            </p>
        )
    }

    if (isSuccess) {
        content = (
            <>
                <Pagination
                    currentPage={currentPage}
                    totalCount={accounts.length}
                    pageSize={pageSize}
                    onPageChange={(page) => setCurrentPage(page)}
                />
                <ul className="flex flex-col gap-2">
                    {currentTableData.map((account) => {
                        return (
                            <li key={account._id}>
                                <Account account={account} />
                            </li>
                        )
                    })}
                </ul>
            </>
        )
    }

    return content
}

export default AccountList
