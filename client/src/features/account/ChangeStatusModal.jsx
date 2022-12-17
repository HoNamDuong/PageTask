import { faClose, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { ROLES } from '../../config/constant.'
import useAuth from '../../hooks/useAuth'
import {
    useDeleteOtherAccountMutation,
    useUpdateOtherAccountRoleMutation,
    useUpdateOtherAccountStatusMutation,
} from './accountApiSlice'

const ChangeStatusModal = ({ toggle, account }) => {
    const { isAdmin } = useAuth()

    const [roles, setRoles] = useState(account.roles)
    const [password, setPassword] = useState('')

    const [
        deleteOtherAccount,
        {
            isLoading: isLoadingDelete,
            isSuccess: isSuccessDelete,
            isError: isErrorDelete,
            error: errorDelete,
        },
    ] = useDeleteOtherAccountMutation()

    const [
        updateOtherAccountStatus,
        {
            isLoading: isLoadingStatus,
            isSuccess: isSuccessStatus,
            isError: isErrorStatus,
            error: errorStatus,
        },
    ] = useUpdateOtherAccountStatusMutation()
    const [
        updateOtherAccountRole,
        {
            isLoading: isLoadingRole,
            isSuccess: isSuccessRole,
            isError: isErrorRole,
            error: errorRole,
        },
    ] = useUpdateOtherAccountRoleMutation()

    const created = new Date(account.createdAt).toLocaleString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })

    const rolesContent = account.roles.toString().replaceAll(',', ', ')

    const handleRolesChanged = (e) => {
        const values = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        )
        setRoles(values)
    }

    const onChangePasswordInput = (e) => setPassword(e.target.value)

    useEffect(() => {
        if (isSuccessRole || isSuccessDelete || isSuccessStatus) {
            toggle()
        }
    }, [isSuccessRole, isSuccessDelete, isSuccessStatus, toggle])

    const handleUpdateOtherAccountRole = async (e) => {
        e.preventDefault()
        await updateOtherAccountRole({ id: account._id, roles, password })
    }

    const handleUpdateOtherAccountStatus = async () => {
        await updateOtherAccountStatus({
            id: account._id,
            active: !account.active,
        })
    }

    const handleDeleteOtherAccount = async () => {
        await deleteOtherAccount({ id: account._id })
    }

    return (
        <>
            <div className="fixed top-0 right-0 left-0 z-50 flex h-screen items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-900 bg-opacity-50 dark:bg-opacity-80">
                <div className="relative w-full max-w-md rounded-lg bg-white px-4 py-4 shadow dark:bg-gray-800">
                    {/* Header */}
                    <div className="mb-4 flex items-start justify-between dark:border-gray-600">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                            Information and control
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
                            isErrorRole || isErrorStatus || isErrorDelete
                                ? 'mb-4 w-full rounded-lg border border-red-700 px-5 py-2.5 text-center text-sm font-medium text-red-700'
                                : 'absolute left-full'
                        }
                        aria-live="assertive"
                    >
                        {errorRole?.status} {errorRole?.data?.message}
                        {errorStatus?.status} {errorStatus?.data?.message}
                        {errorDelete?.status} {errorDelete?.data?.message}
                    </p>
                    {/* Body */}
                    <div className="mb-4">
                        <p>Id: {account._id}</p>
                        <p>Username: {account.username}</p>
                        <p>Active: {`${account.active}`}</p>
                        <p>Roles: {rolesContent}</p>
                        <p>Created: {created}</p>
                    </div>
                    <div className="flex gap-4">
                        {isLoadingStatus ? (
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
                                type="button"
                                className="w-full rounded-lg bg-yellow-400 px-5 py-2.5 text-sm font-medium text-white hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-900"
                                onClick={() => handleUpdateOtherAccountStatus()}
                            >
                                {account.active ? 'Ban' : 'UnBan'}
                            </button>
                        )}
                        {isAdmin && (
                            <>
                                {isLoadingDelete ? (
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
                                        type="button"
                                        className="w-full rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                        onClick={handleDeleteOtherAccount}
                                    >
                                        Delete
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                    {isAdmin && (
                        <form
                            className="mt-4"
                            onSubmit={handleUpdateOtherAccountRole}
                        >
                            <label
                                htmlFor="roles"
                                className="mb-2 block text-base font-medium text-gray-700 dark:text-gray-300"
                            >
                                Roles
                            </label>
                            <select
                                multiple
                                size={3}
                                id="roles"
                                className="mb-4 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                value={roles}
                                onChange={handleRolesChanged}
                            >
                                {Object.values(ROLES).map((role) => {
                                    return (
                                        <option key={role} value={role}>
                                            {role}
                                        </option>
                                    )
                                })}
                            </select>
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
                                className="mb-4 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500"
                                value={password}
                                onChange={onChangePasswordInput}
                            />
                            {isLoadingRole ? (
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
                                    className="w-full rounded-lg border-blue-700 bg-blue-700 p-2.5 text-sm font-medium text-white hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 disabled:dark:opacity-50"
                                >
                                    Update
                                </button>
                            )}
                        </form>
                    )}
                </div>
            </div>
        </>
    )
}

export default ChangeStatusModal
