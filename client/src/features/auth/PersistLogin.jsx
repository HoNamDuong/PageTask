import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Loading from '../../components/Loading.jsx'
import { selectCurrentToken } from '../auth/authSlice.js'
import { useRefreshMutation } from './authApiSlice.js'

const PersistLogin = () => {
    const effectRan = useRef(false)

    const token = useSelector(selectCurrentToken)
    const [isLoading, setIsLoading] = useState(true)
    const [refresh] = useRefreshMutation()

    useEffect(() => {
        if (
            effectRan.current === true ||
            process.env.NODE_ENV !== 'development'
        ) {
            // React 18 Strict Mode

            const verifyRefreshToken = async () => {
                try {
                    await refresh()
                } catch (error) {
                    console.error(error)
                } finally {
                    setIsLoading(false)
                }
            }
            !token ? verifyRefreshToken() : setIsLoading(false)
        }

        return () => {
            effectRan.current = true
        }

        // eslint-disable-next-line
    }, [])

    return <>{isLoading ? <Loading /> : <Outlet />}</>
}

export default PersistLogin
