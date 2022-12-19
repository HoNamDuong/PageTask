import {
    faCheck,
    faClose,
    faInfoCircle,
    faSpinner,
    faTimes,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { USERNAME_REGEX } from '../../config/constant.'
import { useUpdateAccountMutation } from './accountApiSlice'

const ChangeUsernameModal = ({ toggle }) => {
    const [username, setUsername] = useState('')
    const [validUsername, setValidUsername] = useState(false)
    const [usernameFocus, setUsernameFocus] = useState(false)
    const [password, setPassword] = useState('')

    useEffect(() => {
        setValidUsername(USERNAME_REGEX.test(username))
    }, [username])

    const [updateAccount, { isLoading, isSuccess, isError, error }] =
        useUpdateAccountMutation()

    const onChangePasswordInput = (e) => setPassword(e.target.value)
    const onChangeUsernameInput = (e) => setUsername(e.target.value)

    const handleChangeUsernameAccount = async (e) => {
        e.preventDefault()
        await updateAccount({
            username,
            password,
        })
    }

    useEffect(() => {
        if (isSuccess) {
            setPassword('')
            setUsername('')
            toggle()
        }
    }, [isSuccess, toggle])

    return (
        <>
            <div className="fixed top-0 right-0 left-0 z-50 flex h-screen items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-900 bg-opacity-50 dark:bg-opacity-80">
                <div className="relative w-full max-w-md rounded-lg bg-white p-4 shadow dark:bg-gray-800">
                    {/* Header */}
                    <div className="mb-4 flex items-start justify-between dark:border-gray-600">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                            Change username
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
                                ? 'w-full rounded-lg border border-red-700 px-5 py-2.5 text-center text-sm font-medium text-red-700'
                                : 'absolute left-full'
                        }
                        aria-live="assertive"
                    >
                        {error?.status} {error?.data?.message}
                    </p>
                    {/* Body */}
                    <form className="" onSubmit={handleChangeUsernameAccount}>
                        <label
                            htmlFor="new-username"
                            className="mb-2 flex items-end text-base font-medium text-gray-700 dark:text-gray-300"
                        >
                            New username
                            <FontAwesomeIcon
                                icon={faCheck}
                                className={
                                    validUsername
                                        ? 'ml-2 h-5 w-5 text-green-500'
                                        : 'hidden'
                                }
                            />
                            <FontAwesomeIcon
                                icon={faTimes}
                                className={
                                    validUsername || !username
                                        ? 'hidden'
                                        : 'ml-2 h-5 w-5 text-red-500'
                                }
                            />
                        </label>
                        <input
                            type="text"
                            id="new-username"
                            autoComplete="off"
                            className="mb-2 w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500"
                            required
                            value={username}
                            onChange={onChangeUsernameInput}
                            onFocus={() => setUsernameFocus(true)}
                            onBlur={() => setUsernameFocus(false)}
                        />
                        <p
                            className={
                                usernameFocus && !validUsername
                                    ? 'mb-4 rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 dark:border-gray-700  dark:bg-gray-900'
                                    : 'hidden'
                            }
                        >
                            <FontAwesomeIcon
                                className="mr-2"
                                icon={faInfoCircle}
                            />
                            3 to 16 characters.
                            <br />
                            Must begin with a letter.
                            <br />
                            Letters, numbers allowed.
                        </p>
                        <label
                            htmlFor="password"
                            className="my-2 block text-base font-medium text-gray-700 dark:text-gray-300"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            autoComplete="off"
                            className="mb-4 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500"
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
                                disabled={
                                    !validUsername || !password ? true : false
                                }
                                type="submit"
                                className="w-full rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 disabled:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 disabled:dark:bg-gray-700"
                            >
                                Change
                            </button>
                        )}
                    </form>
                </div>
            </div>
        </>
    )
}

export default ChangeUsernameModal
