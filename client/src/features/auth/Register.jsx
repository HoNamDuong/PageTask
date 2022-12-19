import {
    faCheck,
    faEye,
    faEyeSlash,
    faInfoCircle,
    faSpinner,
    faTimes,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { PART, PASSWORD_REGEX, USERNAME_REGEX } from '../../config/constant.'
import useTitle from '../../hooks/useTitle'
import { useRegisterMutation } from './authApiSlice'

const Register = () => {
    useTitle('Register')

    const usernameRef = useRef()
    const errorRef = useRef()

    const [username, setUsername] = useState('')
    const [validUsername, setValidUsername] = useState(false)
    const [usernameFocus, setUsernameFocus] = useState(false)

    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [passwordFocus, setPasswordFocus] = useState(false)

    const [matchPassword, setMatchPassword] = useState('')
    const [validMatchPassword, setValidMatchPassword] = useState(false)
    const [matchPasswordFocus, setMatchPasswordFocus] = useState(false)

    const [errorMessage, setErrorMessage] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const [register, { isLoading, isSuccess }] = useRegisterMutation()

    useEffect(() => {
        usernameRef.current.focus()
    }, [])

    useEffect(() => {
        setValidUsername(USERNAME_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(PASSWORD_REGEX.test(password))
        setValidMatchPassword(password && password === matchPassword)
    }, [password, matchPassword])

    useEffect(() => {
        setErrorMessage('')
    }, [username, passwordFocus, matchPassword])

    const onChangeUsernameInput = (e) => setUsername(e.target.value)
    const onChangePasswordInput = (e) => setPassword(e.target.value)
    const onChangeMatchPasswordInput = (e) => setMatchPassword(e.target.value)
    const toggleShowPassword = () => setShowPassword((prev) => !prev)

    const handleSubmitRegister = async (e) => {
        e.preventDefault()
        // if button enabled with JS hack
        const v1 = USERNAME_REGEX.test(username)
        const v2 = PASSWORD_REGEX.test(password)

        if (!v1 || !v2) {
            setErrorMessage('Invalid Entry')
            return
        }

        try {
            await register({
                username,
                password,
            }).unwrap()

            //clear state and controlled inputs
            setUsername('')
            setPassword('')
            setMatchPassword('')
        } catch (err) {
            if (!err.status) {
                setErrorMessage('No Server Response')
            } else if (err.status === 400) {
                setErrorMessage(err.data.message)
            } else if (err.status === 401) {
                setErrorMessage('Unauthorized')
            } else if (err.status === 409) {
                setErrorMessage(err.data.message)
            } else {
                setErrorMessage('Registration Failed')
            }
            errorRef.current.focus()
        }
    }

    return (
        <>
            {isSuccess ? (
                <section className="space-y-6 p-4">
                    <h5 className="text-3xl font-medium text-gray-900 dark:text-white">
                        Success!
                    </h5>
                    <p>
                        <Link to={`/${PART.Login}`}>Login</Link>
                    </p>
                </section>
            ) : (
                <form className="space-y-6 p-4" onSubmit={handleSubmitRegister}>
                    <h5 className="text-3xl font-medium text-gray-900 dark:text-white">
                        Register
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
                            className="mb-2 flex items-end text-base font-medium text-gray-900 dark:text-white"
                        >
                            Username
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
                            id="username"
                            autoComplete="off"
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-base text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                            required
                            aria-invalid={validUsername ? false : true}
                            aria-describedby="username-note"
                            ref={usernameRef}
                            value={username}
                            onChange={onChangeUsernameInput}
                            onFocus={() => setUsernameFocus(true)}
                            onBlur={() => setUsernameFocus(false)}
                        />
                        <p
                            id="username-note"
                            className={
                                usernameFocus && !validUsername
                                    ? 'mt-2 rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 dark:border-gray-700  dark:bg-gray-900'
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
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="mb-2 flex items-end text-base font-medium text-gray-900 dark:text-white"
                        >
                            Password
                            <FontAwesomeIcon
                                icon={faCheck}
                                className={
                                    validPassword
                                        ? 'ml-2 h-5 w-5 text-green-500'
                                        : 'hidden'
                                }
                            />
                            <FontAwesomeIcon
                                icon={faTimes}
                                className={
                                    validPassword || !password
                                        ? 'hidden'
                                        : 'ml-2 h-5 w-5 text-red-500'
                                }
                            />
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                autoComplete="off"
                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-base text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                                required
                                aria-invalid={validPassword ? false : true}
                                aria-describedby="password-note"
                                value={password}
                                onChange={onChangePasswordInput}
                                onFocus={() => setPasswordFocus(true)}
                                onBlur={() => setPasswordFocus(false)}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 flex items-center p-3"
                                onClick={toggleShowPassword}
                            >
                                {showPassword ? (
                                    <FontAwesomeIcon
                                        className="mr-2 h-4 w-4"
                                        icon={faEye}
                                    />
                                ) : (
                                    <FontAwesomeIcon
                                        className="mr-2 h-4 w-4"
                                        icon={faEyeSlash}
                                    />
                                )}
                            </button>
                        </div>
                        <p
                            id="password-note"
                            className={
                                passwordFocus && !validPassword
                                    ? 'mt-2 rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 dark:border-gray-700  dark:bg-gray-900'
                                    : 'hidden'
                            }
                        >
                            <FontAwesomeIcon
                                className="mr-2"
                                icon={faInfoCircle}
                            />
                            8 to 24 characters.
                            <br />
                            Must include a letters and a number.
                        </p>
                    </div>
                    <div>
                        <label
                            htmlFor="match-password"
                            className="mb-2 flex items-end text-base font-medium text-gray-900 dark:text-white"
                        >
                            Confirm password
                            <FontAwesomeIcon
                                icon={faCheck}
                                className={
                                    validPassword &&
                                    validMatchPassword &&
                                    matchPassword
                                        ? 'ml-2 h-5 w-5 text-green-500'
                                        : 'hidden'
                                }
                            />
                            <FontAwesomeIcon
                                icon={faTimes}
                                className={
                                    validMatchPassword || !matchPassword
                                        ? 'hidden'
                                        : 'ml-2 h-5 w-5 text-red-500'
                                }
                            />
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="match-password"
                                autoComplete="off"
                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-base text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                                required
                                aria-invalid={validMatchPassword ? false : true}
                                aria-describedby="match-password-note"
                                value={matchPassword}
                                onChange={onChangeMatchPasswordInput}
                                onFocus={() => setMatchPasswordFocus(true)}
                                onBlur={() => setMatchPasswordFocus(false)}
                            />
                            <span
                                className="absolute inset-y-0 right-0 flex cursor-pointer items-center p-3"
                                onClick={toggleShowPassword}
                            >
                                {showPassword ? (
                                    <FontAwesomeIcon
                                        className="mr-2 h-4 w-4"
                                        icon={faEye}
                                    />
                                ) : (
                                    <FontAwesomeIcon
                                        className="mr-2 h-4 w-4"
                                        icon={faEyeSlash}
                                    />
                                )}
                            </span>
                        </div>
                        <p
                            id="match-password-note"
                            className={
                                matchPasswordFocus &&
                                !validMatchPassword &&
                                validPassword
                                    ? 'mt-2 rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 dark:border-gray-700  dark:bg-gray-900'
                                    : 'hidden'
                            }
                        >
                            <FontAwesomeIcon
                                className="mr-2"
                                icon={faInfoCircle}
                            />
                            Must match the first password input field.
                        </p>
                    </div>
                    {isLoading ? (
                        <button
                            disabled
                            type="button"
                            className="w-full rounded-lg bg-gradient-to-br from-green-400 to-blue-600 px-5 py-2.5 text-center text-lg font-medium text-white hover:bg-gradient-to-bl disabled:opacity-50 disabled:hover:bg-gradient-to-br dark:text-black"
                        >
                            <FontAwesomeIcon
                                className="mr-2 inline h-4 w-4 animate-spin text-gray-200 dark:text-gray-600"
                                icon={faSpinner}
                            />
                            Loading...
                        </button>
                    ) : (
                        <button
                            disabled={
                                !validUsername ||
                                !validPassword ||
                                !validMatchPassword
                                    ? true
                                    : false
                            }
                            type="submit"
                            className="w-full rounded-lg bg-gradient-to-br from-green-400 to-blue-600 px-5 py-2.5 text-center text-lg font-medium text-white hover:bg-gradient-to-bl disabled:opacity-50 disabled:hover:bg-gradient-to-br dark:text-black"
                        >
                            Register
                        </button>
                    )}
                    <div className="text-base font-medium">
                        Registered?
                        <Link
                            to={`/${PART.Login}`}
                            className="ml-2 text-blue-700 hover:underline dark:text-blue-500"
                        >
                            Login
                        </Link>
                    </div>
                </form>
            )}
        </>
    )
}

export default Register
