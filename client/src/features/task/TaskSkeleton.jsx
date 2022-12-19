const TaskSkeleton = () => {
    return (
        <>
            <div className="animate-pulse rounded-lg border border-gray-200 bg-[#64748b10] px-4 py-2 dark:border-[#374151] dark:bg-gray-900">
                <div className="flex flex-wrap items-center justify-between py-1">
                    <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700"></div>
                    <div className="ml-4 h-6 w-48 bg-gray-200 dark:bg-gray-700"></div>
                    <div className="ml-auto h-6 w-6 bg-gray-200 dark:bg-gray-700"></div>
                </div>
                <div className="my-3 h-5 bg-gray-200 dark:bg-gray-700"></div>
                <div className="mb-3 h-2 bg-gray-200 dark:bg-gray-700"></div>
                <div className="mb-3 h-2 bg-gray-200 dark:bg-gray-700"></div>
            </div>
        </>
    )
}

export default TaskSkeleton
