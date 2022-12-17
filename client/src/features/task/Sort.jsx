import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SORT } from '../../config/constant.'
import { typeSortSelector } from './taskSelector'
import { changeSortType, resetSort } from './taskSlice'

const Sort = () => {
    const type = useSelector(typeSortSelector)
    const dispatch = useDispatch()

    const onChangeSortType = (e) => {
        dispatch(changeSortType(e.target.value))
    }

    useEffect(() => {
        return () => dispatch(resetSort())
    }, [dispatch])

    return (
        <>
            <select
                className="mb-4 block w-full rounded-lg border-transparent bg-gray-50 px-4 py-2 text-sm text-gray-900 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-400"
                onChange={onChangeSortType}
                value={type}
            >
                {Object.values(SORT).map((type) => (
                    <option key={type} value={type}>
                        Sort {type}
                    </option>
                ))}
            </select>
        </>
    )
}

export default Sort
