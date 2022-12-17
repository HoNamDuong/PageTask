const Tasks = require('../models/Tasks')
const mongoose = require('mongoose')
const {
    TITLE_REGEX,
    DESCRIPTION_REGEX,
    PRIORITY,
} = require('../config/constant')

// @desc Get all tasks
// @route GET /task
// @access Private
const getAllTasks = async (req, res) => {
    try {
        const { id } = req.account

        //Get all tasks with current account id
        const foundTasks = await Tasks.find({ account: id })
            .select(['-updatedAt', '-createdAt'])
            .lean()

        // If no tasks
        if (!foundTasks?.length) {
            return res.status(400).json({ message: 'No tasks found' })
        }

        return res.json(foundTasks)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Server error!' })
    }
}

// @desc Create new task
// @route POST /task
// @access Private
const createNewTask = async (req, res) => {
    try {
        const { id } = req.account
        const { title, description, priority, date, time } = req.body

        // Init task object
        let taskObject = { account: id }

        // Confirm title
        if (!title) {
            return res.status(400).json({ message: 'Title required' })
        }

        if (!TITLE_REGEX.test(title)) {
            return res.status(409).json({ message: 'Invalid title' })
        }

        // Check for duplicate title
        const duplicate = await Tasks.findOne({ account: id, title })
            .collation({ locale: 'en', strength: 2 })
            .lean()
            .exec()

        if (duplicate) {
            return res.status(409).json({ message: 'Duplicate task title' })
        } else {
            taskObject.title = title
        }

        // Confirm description
        if (description) {
            if (!DESCRIPTION_REGEX.test(description)) {
                return res.status(409).json({ message: 'Invalid description' })
            }
            taskObject.description = description
        }

        // Confirm priority
        if (priority) {
            if (!Object.values(PRIORITY).includes(priority)) {
                return res.status(409).json({ message: 'Invalid priority' })
            }
            taskObject.priority = priority
        }

        if (date) {
            taskObject.date = date
        }

        if (time) {
            taskObject.time = time
        }

        // Create and store the new task
        const result = await Tasks.create(taskObject)

        if (!result) {
            return res
                .status(400)
                .json({ message: 'Invalid task data received' })
        }

        // Created
        return res.status(201).json({ message: 'New task created' })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Server error!' })
    }
}

// @desc Update a task
// @route PATCH /task
// @access Private
const updateTask = async (req, res) => {
    try {
        const { id: currentAccountId } = req.account
        const { id, title, description, completed, priority, date, time } =
            req.body

        // Confirm task id
        if (!id) res.status(400).json({ message: 'Task ID required' })

        if (!mongoose.isValidObjectId(id)) {
            return res.status(409).json({ message: 'Invalid task ID' })
        }

        // Confirm task exists to update
        const foundTask = await Tasks.findById(id).exec()

        if (!foundTask) {
            return res.status(400).json({ message: 'Task not found' })
        }

        if (foundTask.account.toString() !== currentAccountId) {
            return res.status(403).json({ message: 'Forbidden' })
        }

        // Confirm title
        if (title) {
            if (!TITLE_REGEX.test(title)) {
                return res.status(409).json({ message: 'Invalid title' })
            }

            // Check for duplicate title
            const duplicate = await Tasks.findOne({
                account: currentAccountId,
                title,
            })
                .collation({ locale: 'en', strength: 2 })
                .lean()
                .exec()

            // Allow renaming of the original task
            if (duplicate && duplicate?._id.toString() !== id) {
                return res.status(409).json({ message: 'Duplicate task title' })
            }

            foundTask.title = title
        }

        // Confirm description
        if (description) {
            if (!DESCRIPTION_REGEX.test(description)) {
                return res.status(409).json({ message: 'Invalid description' })
            }
            foundTask.description = description
        }

        // Confirm priority
        if (priority) {
            if (!Object.values(PRIORITY).includes(priority)) {
                return res.status(409).json({ message: 'Invalid priority' })
            }
            foundTask.priority = priority
        }

        // Confirm completed
        if (typeof completed === 'boolean') {
            foundTask.completed = completed
        }

        if (date) {
            taskObject.date = date
        }

        if (time) {
            taskObject.time = time
        }

        const result = await foundTask.save()

        return res.json({ message: `'${result.title}' updated` })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Server error!' })
    }
}

// @desc Delete a task
// @route DELETE /task
// @access Private
const deleteTask = async (req, res) => {
    try {
        const { id } = req.body
        const { id: accountId } = req.account

        // Confirm task ID
        if (!id) res.status(400).json({ message: 'Task ID required' })

        if (!mongoose.isValidObjectId(id)) {
            return res.status(409).json({ message: 'Invalid task ID' })
        }

        // Confirm task exists to delete
        const foundTask = await Tasks.findById(id).exec()

        if (!foundTask) {
            return res.status(400).json({ message: 'Task not found' })
        }

        if (foundTask.account.toString() !== accountId) {
            return res.status(403).json({ message: 'Forbidden' })
        }

        const result = await foundTask.deleteOne()

        return res.json({
            message: `Task '${result.title}' with ID ${result._id} deleted`,
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Server error!' })
    }
}

module.exports = {
    getAllTasks,
    createNewTask,
    updateTask,
    deleteTask,
}
