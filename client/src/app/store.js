import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import accountSlice from '../features/account/accountSlice'
import authSlice from '../features/auth/authSlice'
import taskSlice from '../features/task/taskSlice'
import { apiSlice } from './api/apiSlice'

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        task: taskSlice.reducer,
        account: accountSlice.reducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(apiSlice.middleware)
    },
    devTools: process.env.NODE_ENV === 'development' ? true : false,
})

setupListeners(store.dispatch)
