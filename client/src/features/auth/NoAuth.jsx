import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { PART } from '../../config/constant.'
import { selectCurrentToken } from './authSlice'

const NotAuth = () => {
    const token = useSelector(selectCurrentToken)

    return token ? <Navigate to={`/${PART.Dash}`} /> : <Outlet />
}
export default NotAuth
