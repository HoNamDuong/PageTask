import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { PART, ROLES } from './config/constant.'
import useLocalStorage from './hooks/useLocalStorage'

import NotFound from './components/NotFound'

import Layout from './components/Layout'
import About from './components/About'
import Unauthorized from './features/auth/Unauthorized'

import NoAuth from './features/auth/NoAuth'
import Welcome from './components/Welcome'
import Login from './features/auth/Login'
import Register from './features/auth/Register'

import PersistLogin from './features/auth/PersistLogin'
import RequireAuth from './features/auth/RequireAuth'
import DashLayout from './components/DashLayout'
import Dash from './features/auth/Dash'
import Profile from './features/account/Profile'
import AccountLayout from './features/account/AccountLayout'
import TaskLayout from './features/task/TaskLayout'

const App = () => {
    const [dark] = useLocalStorage('dark', false)

    useEffect(() => {
        if (dark) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [dark])

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    {/* Public routes */}
                    <Route
                        path={PART.Unauthorized}
                        element={<Unauthorized />}
                    />
                    <Route path={PART.About} element={<About />} />

                    {/* Protected Routes */}
                    <Route element={<PersistLogin />}>
                        <Route index element={<Welcome />} />

                        <Route element={<NoAuth />}>
                            <Route path={PART.Login} element={<Login />} />
                            <Route
                                path={PART.Register}
                                element={<Register />}
                            />
                        </Route>

                        <Route
                            element={
                                <RequireAuth
                                    allowedRoles={[
                                        ROLES.Admin,
                                        ROLES.Mod,
                                        ROLES.Member,
                                    ]}
                                />
                            }
                        >
                            <Route path={PART.Dash} element={<DashLayout />}>
                                <Route index element={<Dash />} />
                                <Route
                                    path={PART.Task}
                                    element={<TaskLayout />}
                                />

                                <Route
                                    path={PART.Profile}
                                    element={<Profile />}
                                />

                                <Route
                                    element={
                                        <RequireAuth
                                            allowedRoles={[
                                                ROLES.Admin,
                                                ROLES.Mod,
                                            ]}
                                        />
                                    }
                                >
                                    <Route
                                        path={PART.Account}
                                        element={<AccountLayout />}
                                    />
                                </Route>
                            </Route>
                        </Route>
                    </Route>
                </Route>
                {/* Not Found Route */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
