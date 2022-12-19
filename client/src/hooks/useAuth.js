import jwtDecode from 'jwt-decode'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../features/auth/authSlice'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    let isMod = false
    let isAdmin = false
    let status = 'Member'

    if (token) {
        const decoded = jwtDecode(token)
        const { id, username, roles } = decoded

        isMod = roles.includes('Mod')
        isAdmin = roles.includes('Admin')

        if (isMod) status = 'Mod'
        if (isAdmin) status = 'Admin'

        return { id, username, roles, status, isMod, isAdmin }
    }

    return { id: '', username: '', roles: [], isMod, isAdmin, status }
}
export default useAuth
