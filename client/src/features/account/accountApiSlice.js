import { apiSlice } from '../../app/api/apiSlice'
import { logout } from '../auth/authSlice'

export const accountsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAccount: builder.query({
            query: () => ({
                url: '/account',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
        }),
        deleteAccount: builder.mutation({
            query: (params) => ({
                url: `/account`,
                method: 'DELETE',
                body: { ...params },
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
        updateAccount: builder.mutation({
            query: (initialAccountData) => ({
                url: '/account',
                method: 'PATCH',
                body: {
                    ...initialAccountData,
                },
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
        }),
        // Admin and mod
        getAccounts: builder.query({
            query: () => ({
                url: '/account/all',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            providesTags: (result, error, arg) => {
                if (result) {
                    return [
                        { type: 'Account', id: 'LIST' },
                        ...result.map((account) => ({
                            type: 'Account',
                            id: account._id,
                        })),
                    ]
                } else {
                    return [{ type: 'Account', id: 'LIST' }]
                }
            },
        }),
        getAccountsByPage: builder.query({
            query: ({ page, perPage }) => ({
                url: '/account/page',
                params: {
                    page,
                    perPage,
                },
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            providesTags: (result, error, arg) => {
                if (result) {
                    return [
                        { type: 'Account', id: 'LIST' },
                        ...result.data.map((account) => ({
                            type: 'Account',
                            id: account._id,
                        })),
                    ]
                } else {
                    return [{ type: 'Account', id: 'LIST' }]
                }
            },
        }),
        updateOtherAccountStatus: builder.mutation({
            query: (params) => ({
                url: '/account/status',
                method: 'PATCH',
                body: {
                    ...params,
                },
            }),
            invalidatesTags: (result, error, arg) =>
                error ? [] : [{ type: 'Account', id: arg.id }],
        }),
        updateOtherAccountRole: builder.mutation({
            query: (params) => ({
                url: '/account/role',
                method: 'PATCH',
                body: {
                    ...params,
                },
            }),
            invalidatesTags: (result, error, arg) =>
                error ? [] : [{ type: 'Account', id: arg.id }],
        }),
        deleteOtherAccount: builder.mutation({
            query: ({ id }) => ({
                url: `/account/delete`,
                method: 'DELETE',
                body: { id },
            }),
            invalidatesTags: (result, error, arg) =>
                error ? [] : [{ type: 'Account', id: arg.id }],
        }),
    }),
})

export const {
    useGetAccountQuery,
    useDeleteAccountMutation,
    useUpdateAccountMutation,
    //
    useGetAccountsQuery,
    useGetAccountsByPageQuery,
    useUpdateOtherAccountStatusMutation,
    //
    useUpdateOtherAccountRoleMutation,
    useDeleteOtherAccountMutation,
} = accountsApiSlice

// returns the query result object
export const selectAccountsResult =
    accountsApiSlice.endpoints.getAccounts.select()
