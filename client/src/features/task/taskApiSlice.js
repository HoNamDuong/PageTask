import { apiSlice } from '../../app/api/apiSlice'

export const tasksApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTasks: builder.query({
            query: () => ({
                url: '/task',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            providesTags: (result, error, arg) => {
                if (result) {
                    return [
                        { type: 'Task', id: 'LIST' },
                        ...result.map((task) => ({
                            type: 'Task',
                            id: task._id,
                        })),
                    ]
                } else {
                    return [{ type: 'Task', id: 'LIST' }]
                }
            },
        }),
        addNewTask: builder.mutation({
            query: (initialTask) => ({
                url: '/task',
                method: 'POST',
                body: {
                    ...initialTask,
                },
            }),
            invalidatesTags: (result, error, arg) =>
                error ? [] : [{ type: 'Task', id: 'LIST' }],
        }),
        updateTask: builder.mutation({
            query: (initialTask) => ({
                url: '/task',
                method: 'PATCH',
                body: {
                    ...initialTask,
                },
            }),
            invalidatesTags: (result, error, arg) =>
                error ? [] : [{ type: 'Task', id: arg.id }],
        }),
        deleteTask: builder.mutation({
            query: ({ id }) => ({
                url: `/task`,
                method: 'DELETE',
                body: { id },
            }),
            invalidatesTags: (result, error, arg) =>
                error ? [] : [{ type: 'Task', id: arg.id }],
        }),
    }),
})

export const {
    useGetTasksQuery,
    useAddNewTaskMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation,
} = tasksApiSlice

// returns the query result object
export const selectTasksResult = tasksApiSlice.endpoints.getTasks.select()
