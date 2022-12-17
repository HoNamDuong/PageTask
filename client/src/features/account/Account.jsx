import { useState } from 'react'
import { ROLES } from '../../config/constant.'
import ChangeStatusModal from './ChangeStatusModal'

const Account = ({ account }) => {
    const [showChangeStatusModel, setShowChangeStatusModel] = useState(false)

    const toggleChangeStatusModel = () =>
        setShowChangeStatusModel((prev) => !prev)

    return (
        <>
            <div
                className={`${
                    !account.active && 'opacity-50'
                } flex flex-wrap items-center justify-between rounded-lg bg-gray-50 px-4 py-2 dark:bg-gray-900`}
            >
                <span className="text-base font-medium text-gray-700 dark:text-gray-300">
                    {account.username}
                    {account.roles.includes(ROLES.Admin) && ' [Admin]'}
                    {account.roles.includes(ROLES.Mod) && ' [Mod]'}
                </span>
                <button
                    type="button"
                    className="rounded-lg border border-yellow-400 px-5 py-1 text-center text-sm font-medium text-yellow-400 hover:bg-yellow-500 hover:text-white focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:border-yellow-300 dark:text-yellow-300 dark:hover:bg-yellow-400 dark:hover:text-white dark:focus:ring-yellow-900"
                    onClick={toggleChangeStatusModel}
                >
                    Change
                </button>
            </div>
            {showChangeStatusModel && (
                <ChangeStatusModal
                    toggle={toggleChangeStatusModel}
                    account={account}
                />
            )}
        </>
    )
}

export default Account
