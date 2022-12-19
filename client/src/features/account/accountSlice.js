import { createSlice } from '@reduxjs/toolkit'

const accountSlice = createSlice({
    name: 'account',
    initialState: {
        accounts: [],
        filter: {
            search: '',
            active: true,
        },
    },
    reducers: {
        // Filter
        changeFilterSearch: (state, action) => {
            state.filter.search = action.payload
        },
        changeFilterActive: (state, action) => {
            state.filter.active = action.payload
        },
        resetFilter: (state) => {
            state.filter = {
                search: '',
                active: true,
            }
        },
    },
})

export const {
    // Filter
    changeFilterSearch,
    changeFilterActive,
    resetFilter,
} = accountSlice.actions

export default accountSlice
