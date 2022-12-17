import { faEye, faEyeSlash, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { PART } from '../../config/constant.'
import useTitle from '../../hooks/useTitle'
import { useLoginMutation } from './authApiSlice'
import { setCredentials } from './authSlice'

const Login = () => {
    useTitle('Login')

    const dispatch = useDispatch()
    const [login, { isLoading }] = useLoginMutation()

    const usernameRef = useRef()
    const errorRef = useRef()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [persist, setPersist] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        usernameRef.current.focus()
    }, [])

    useEffect(() => {
        setErrorMessage('')
    }, [username, password])

    const onChangeUsernameInput = (e) => setUsername(e.target.value)
    const onChangePasswordInput = (e) => setPassword(e.target.value)
    const onChangePersistInput = () => setPersist((prev) => !prev)
    const toggleShowPassword = () => setShowPassword((prev) => !prev)

    const handleSubmitLogin = async (e) => {
        e.preventDefault()
        try {
            const { accessToken } = await login({
                username,
                password,
                persist,
            }).unwrap()
            dispatch(setCredentials({ accessToken }))
            setUsername('')
            setPassword('')
        } catch (err) {
            if (!err.status) {
                setErrorMessage('No Server Response')
            } else if (err.status === 400) {
                setErrorMessage(err.data.message)
            } else if (err.status === 401) {
                setErrorMessage('Unauthorized')
            } else {
                setErrorMessage('Login Failed')
            }
            errorRef.current.focus()
        }
    }

    return (
        <form className="space-y-6 p-4" onSubmit={handleSubmitLogin}>
            <h5 className="text-3xl font-medium text-gray-900 dark:text-white">
                Login
            </h5>
            <p
                ref={errorRef}
                className={
                    errorMessage
                        ? 'w-full rounded-lg border border-red-700 px-5 py-2.5 text-center text-sm font-medium text-red-700'
                        : 'absolute left-full'
                }
                aria-live="assertive"
            >
                {errorMessage}
            </p>
            <div>
                <label
                    htmlFor="username"
                    className="mb-2 block text-base font-medium text-gray-900 dark:text-white"
                >
                    Username
                </label>
                <input
                    type="text"
                    id="username"
                    autoComplete="off"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-base text-gray-900 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                    required
                    ref={usernameRef}
                    value={username}
                    onChange={onChangeUsernameInput}
                />
            </div>
            <div>
                <label
                    htmlFor="password"
                    className="mb-2 block text-base font-medium text-gray-900 dark:text-white"
                >
                    Password
                </label>
                <div className="relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        autoComplete="off"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-base text-gray-900 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                        required
                        value={password}
                        onChange={onChangePasswordInput}
                    />
                    <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center px-4 py-2"
                        onClick={toggleShowPassword}
                    >
                        {showPassword ? (
                            <FontAwesomeIcon className="h-4 w-4" icon={faEye} />
                        ) : (
                            <FontAwesomeIcon
                                className="h-4 w-4"
                                icon={faEyeSlash}
                            />
                        )}
                    </button>
                </div>
            </div>
            <div className="flex items-start">
                <div className="flex h-5 items-center">
                    <input
                        id="remember"
                        type="checkbox"
                        className="h-4 w-4 cursor-pointer rounded border border-gray-300 bg-gray-50 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                        onChange={onChangePersistInput}
                        checked={persist}
                    />
                </div>
                <label
                    htmlFor="remember"
                    className="ml-2 cursor-pointer text-base font-medium text-gray-900 dark:text-gray-300"
                >
                    Remember me
                </label>
            </div>
            {isLoading ? (
                <button
                    disabled
                    type="button"
                    className="w-full rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-lg font-medium text-gray-900 disabled:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 disabled:dark:bg-gray-700"
                >
                    <FontAwesomeIcon
                        className="mr-2 inline h-4 w-4 animate-spin"
                        icon={faSpinner}
                    />
                    Loading...
                </button>
            ) : (
                <button
                    disabled={!username || !password ? true : false}
                    type="submit"
                    className="w-full rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-lg font-medium text-gray-900 hover:bg-gray-100 disabled:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 disabled:dark:bg-gray-700"
                >
                    Login
                </button>
            )}

            <div className="text-base font-medium">
                Need an account?
                <Link
                    to={`/${PART.Register}`}
                    className="ml-2 text-blue-700 hover:underline dark:text-blue-500"
                >
                    Register
                </Link>
            </div>
        </form>
    )
}

export default Login
