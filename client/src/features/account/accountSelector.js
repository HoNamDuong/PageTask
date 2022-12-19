import { createSelector } from '@reduxjs/toolkit'
import { selectAccountsResult } from './accountApiSlice'

// creates memoized selector
export const selectAccountsData = createSelector(
    selectAccountsResult,
    (accountsResult) => accountsResult.data // normalized state object with ids & entities
)

export const accountListSelector = (state) => selectAccountsData(state)

export const searchFilterSelector = (state) => state.account.filter.search
export const activeFilterSelector = (state) => state.account.filter.active

export const accountListRemaining = createSelector(
    accountListSelector,
    searchFilterSelector,
    activeFilterSelector,
    (accountList, search, active) => {
        if (!accountList) {
            return []
        }
        return accountList
            .filter((account) =>
                account.username.toLowerCase().includes(search.toLowerCase())
            )
            .filter((account) => account.active === active)
            .reverse()
    }
)
