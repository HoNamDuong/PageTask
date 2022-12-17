import { createSelector } from '@reduxjs/toolkit'
import { SORT } from '../../config/constant.'
import { selectTasksResult } from './taskApiSlice'

// creates memoized selector
export const selectTasksData = createSelector(
    selectTasksResult,
    (tasksResult) => tasksResult.data // normalized state object with ids & entities
)

export const taskListSelector = (state) => selectTasksData(state)

export const searchFilterSelector = (state) => state.task.filter.search
export const statusFilterSelector = (state) => state.task.filter.status
export const prioritiesFilterSelector = (state) => state.task.filter.priorities

export const typeSortSelector = (state) => state.task.sort.type

export const taskListRemaining = createSelector(
    taskListSelector,
    searchFilterSelector,
    statusFilterSelector,
    prioritiesFilterSelector,
    typeSortSelector,
    (taskList, search, status, priorities, type) => {
        if (!taskList) {
            return []
        }
        return taskList
            .filter(
                (task) =>
                    task.title.toLowerCase().includes(search.toLowerCase()) ||
                    task.description
                        ?.toLowerCase()
                        .includes(search.toLowerCase())
            )
            .filter((task) => {
                switch (status) {
                    case 'completed':
                        return task.completed === true
                    case 'todo':
                        return task.completed === false
                    default:
                        return true
                }
            })
            .filter((task) => {
                return priorities.length
                    ? priorities.includes(task.priority)
                    : true
            })
            .sort((a, b) => {
                const timeA = new Date(a.date).getTime()
                const timeB = new Date(b.date).getTime()
                if (type === SORT.Time) return timeA - timeB
                return true
            })
            .reverse()
    }
)
