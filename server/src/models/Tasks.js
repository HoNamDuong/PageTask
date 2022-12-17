const mongoose = require('mongoose')

const tasksSchema = new mongoose.Schema(
    {
        account: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Accounts',
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        priority: {
            type: String,
            default: 'Medium', // 'Low', 'Medium', 'High'
        },
        completed: {
            type: Boolean,
            default: false,
        },
        time: {
            type: String,
        },
        date: {
            type: Date,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

module.exports = mongoose.model('Tasks', tasksSchema)
