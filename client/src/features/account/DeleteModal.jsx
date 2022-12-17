import { faClose, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { useDeleteAccountMutation } from './accountApiSlice'

const DeleteModal = ({ toggle }) => {
    const [password, setPassword] = useState('')

    const [deleteAccount, { isLoading, isError, error }] =
        useDeleteAccountMutation()

    const onChangePasswordInput = (e) => setPassword(e.target.value)

    const handleDeleteAccount = async (e) => {
        e.preventDefault()
        await deleteAccount({ password })
    }

    return (
        <>
            <div className="fixed top-0 right-0 left-0 z-50 flex h-screen items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-900 bg-opacity-50 dark:bg-opacity-80">
                <div className="relative w-full max-w-md rounded-lg bg-white px-4 py-4 shadow dark:bg-gray-800">
                    {/* Header */}
                    <div className="mb-4 flex items-start justify-between dark:border-gray-600">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                            Are you sure to delete the account?
                        </h3>
                        <button
                            className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                            type="button"
                            onClick={toggle}
                        >
                            <FontAwesomeIcon
                                className="h-5 w-5"
                                icon={faClose}
                            />
                        </button>
                    </div>
                    <p
                        className={
                            isError
                                ? 'mb-2 w-full rounded-lg border border-red-700 px-5 py-2.5 text-center text-sm font-medium text-red-700'
                                : 'absolute left-full'
                        }
                        aria-live="assertive"
                    >
                        {error?.status} {error?.data?.message}
                    </p>
                    <form onSubmit={handleDeleteAccount}>
                        <label
                            htmlFor="password"
                            className="mb-2 block text-base font-medium text-gray-700 dark:text-gray-300"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            autoComplete="off"
                            className="mb-4 w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500"
                            required
                            value={password}
                            onChange={onChangePasswordInput}
                        />

                        {isLoading ? (
                            <button
                                disabled
                                type="button"
                                className="w-full rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 disabled:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 disabled:dark:bg-gray-700"
                            >
                                <FontAwesomeIcon
                                    className="mr-2 inline h-4 w-4 animate-spin"
                                    icon={faSpinner}
                                />
                                Loading...
                            </button>
                        ) : (
                            <button
                                disabled={!password ? true : false}
                                type="submit"
                                className="w-full rounded-lg bg-red-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 disabled:opacity-50 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                            >
                                Delete
                            </button>
                        )}
                    </form>
                </div>
            </div>
        </>
    )
}

export default DeleteModal
