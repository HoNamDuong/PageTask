import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { PART } from '../../config/constant.'
import useAuth from '../../hooks/useAuth'

const RequireAuth = ({ allowedRoles }) => {
    const { roles } = useAuth()
    const location = useLocation()

    if (!roles.length) {
        return <Navigate to={'/'} />
    } else {
        return roles.some((role) => allowedRoles.includes(role)) ? (
            <Outlet />
        ) : (
            <Navigate
                to={`/${PART.Unauthorized}`}
                state={{ from: location }}
                replace
            />
        )
    }
}

export default RequireAuth
