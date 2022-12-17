const mongoose = require('mongoose')

const accountsSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        roles: {
            type: [String],
            default: ['Member'], // ['Admin','Mod', 'Member']
        },
        token: {
            type: String,
        },
        active: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

module.exports = mongoose.model('Accounts', accountsSchema)
