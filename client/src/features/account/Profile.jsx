import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import Loading from '../../components/Loading'
import useTitle from '../../hooks/useTitle'
import { useLogoutMutation } from '../auth/authApiSlice'
import { useGetAccountQuery } from './accountApiSlice'
import ChangePasswordModal from './ChangePasswordModal'
import ChangeUsernameModal from './ChangeUsernameModal'
import DeleteModal from './DeleteModal'

const Profile = () => {
    useTitle(`Profile`)

    const {
        data: account,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetAccountQuery(undefined, {
        pollingInterval: 60000,
        refetchOnMountOrArgChange: true,
    })

    const [logout, { isLoading: isLoadingLogout }] = useLogoutMutation()

    const [showChangeUsernameModal, setShowChangeUsernameModal] =
        useState(false)
    const [showChangePasswordModal, setShowChangePasswordModal] =
        useState(false)
    const [showDeleteAccountModel, setShowDeleteAccountModel] = useState(false)

    const toggleChangeUsernameModel = () =>
        setShowChangeUsernameModal((prev) => !prev)

    const toggleChangePasswordModel = () =>
        setShowChangePasswordModal((prev) => !prev)

    const toggleDeleteAccountModel = () =>
        setShowDeleteAccountModel((prev) => !prev)

    let content

    if (isLoading)
        content = (
            <>
                <Loading />
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
        const created = new Date(account.createdAt).toLocaleString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        })
        const rolesAccount = account.roles.toString().replaceAll(',', ', ')

        content = (
            <>
                <section className="p-4">
                    {content}
                    <div className="mb-4">Id: {account._id}</div>
                    <div className="mb-4">Roles: {rolesAccount}</div>
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <p>Username:</p>
                            <p>{account.username}</p>
                        </div>
                        <button
                            type="button"
                            className="rounded-lg border border-yellow-400 px-3 py-1 text-center text-sm font-medium text-yellow-400 hover:bg-yellow-500 hover:text-white focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:border-yellow-300 dark:text-yellow-300 dark:hover:bg-yellow-400 dark:hover:text-white dark:focus:ring-yellow-900"
                            onClick={toggleChangeUsernameModel}
                        >
                            Change username
                        </button>
                        {showChangeUsernameModal && (
                            <ChangeUsernameModal
                                toggle={toggleChangeUsernameModel}
                            />
                        )}
                    </div>
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <p>Password:</p>
                            <p>**********</p>
                        </div>
                        <button
                            type="button"
                            className="rounded-lg border border-yellow-400 px-3 py-1 text-center text-sm font-medium text-yellow-400 hover:bg-yellow-500 hover:text-white focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:border-yellow-300 dark:text-yellow-300 dark:hover:bg-yellow-400 dark:hover:text-white dark:focus:ring-yellow-900"
                            onClick={toggleChangePasswordModel}
                        >
                            Change password
                        </button>
                        {showChangePasswordModal && (
                            <ChangePasswordModal
                                toggle={toggleChangePasswordModel}
                            />
                        )}
                    </div>
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <p>Created:</p>
                            <p>{created}</p>
                        </div>
                        <button
                            type="button"
                            className="rounded-lg border border-red-700 px-3 py-1 text-center text-sm font-medium text-red-700 hover:bg-red-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900"
                            onClick={toggleDeleteAccountModel}
                        >
                            Delete account
                        </button>
                        {showDeleteAccountModel && (
                            <DeleteModal toggle={toggleDeleteAccountModel} />
                        )}
                    </div>
                    {isLoadingLogout ? (
                        <button
                            disabled
                            type="button"
                            className="w-full rounded-lg border border-gray-800 px-5 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-gray-300 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-800"
                        >
                            <FontAwesomeIcon
                                className="mr-2 inline h-4 w-4 animate-spin text-gray-200 dark:text-gray-600"
                                icon={faSpinner}
                            />
                            Loading...
                        </button>
                    ) : (
                        <button
                            type="button"
                            className="w-full rounded-lg border border-gray-800 px-5 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-gray-300 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-800"
                            title="Logout"
                            onClick={logout}
                        >
                            Logout
                        </button>
                    )}
                </section>
            </>
        )
    }

    return content
}

export default Profile
