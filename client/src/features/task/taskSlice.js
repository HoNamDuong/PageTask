import { createSlice } from '@reduxjs/toolkit'
import { SORT } from '../../config/constant.'

const taskSlice = createSlice({
    name: 'task',
    initialState: {
        tasks: [],
        filter: {
            search: '',
            priorities: [],
            status: 'all',
        },
        sort: {
            type: SORT.Default,
        },
    },
    reducers: {
        // Filter
        changeFilterSearch: (state, action) => {
            state.filter.search = action.payload
        },
        changeFilterStatus: (state, action) => {
            state.filter.status = action.payload
        },
        changeFilterPriorities: (state, action) => {
            state.filter.priorities = action.payload
        },
        resetFilter: (state) => {
            state.filter = { search: '', priorities: [], status: 'all' }
        },
        // Sort
        changeSortType: (state, action) => {
            state.sort.type = action.payload
        },
        resetSort: (state) => {
            state.sort = { type: 'default' }
        },
    },
})

export const {
    // Filter
    changeFilterPriorities,
    changeFilterSearch,
    changeFilterStatus,
    resetFilter,
    // Sort
    changeSortType,
    resetSort,
} = taskSlice.actions

export default taskSlice
