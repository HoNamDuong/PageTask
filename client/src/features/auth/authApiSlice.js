import { apiSlice } from '../../app/api/apiSlice'
import { logout, setCredentials } from './authSlice'

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: { ...credentials },
            }),
        }),
        register: builder.mutation({
            query: (form) => ({
                url: '/auth/register',
                method: 'POST',
                body: { ...form },
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                    dispatch(logout())
                    dispatch(apiSlice.util.resetApiState())
                } catch (err) {
                    console.error(err)
                }
            },
        }),
        refresh: builder.mutation({
            query: () => ({
                url: '/auth/refresh',
                method: 'GET',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    const { accessToken } = data
                    dispatch(setCredentials({ accessToken }))
                } catch (err) {
                    console.error(err)
                }
            },
        }),
    }),
})

export const {
    useLoginMutation,
    useLogoutMutation,
    useRegisterMutation,
    useRefreshMutation,
} = authApiSlice
