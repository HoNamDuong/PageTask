const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const Tasks = require('../models/Tasks')
const Accounts = require('../models/Accounts')
const { USERNAME_REGEX, PASSWORD_REGEX, ROLES } = require('../config/constant')

// @desc Get account
// @route GET /account
// @access Private
const getAccount = async (req, res) => {
    try {
        const { id } = req.account

        // Get account with account id
        const foundAccount = await Accounts.findById(id)
            .select(['-password', '-token', '-updatedAt'])
            .lean()
            .exec()

        // If no account
        if (!foundAccount) {
            return res.status(400).json({ message: 'Account not found' })
        }

        return res.json(foundAccount)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Server error!' })
    }
}

// @desc Create new account
// @route POST /account
// @access Private
const createNewAccount = async (req, res) => {
    try {
        const { username, password } = req.body

        if (!username || !password) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        if (!USERNAME_REGEX.test(username) || !PASSWORD_REGEX.test(password)) {
            return res
                .status(409)
                .json({ message: 'Invalid username or password' })
        }

        // Check for duplicate username
        const duplicate = await Accounts.findOne({ username })
            .collation({ locale: 'en', strength: 2 })
            .lean()
            .exec()

        if (duplicate) {
            return res.status(409).json({ message: 'Duplicate username' })
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10) // salt rounds

        // Create and store new account
        const account = await Accounts.create({
            username,
            password: hashedPassword,
        })

        if (!account) {
            return res
                .status(400)
                .json({ message: 'Invalid account data received' })
        }

        // Created
        return res
            .status(201)
            .json({ message: `New account ${username} created` })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Server error!' })
    }
}

// @desc Update a account
// @route PATCH /account
// @access Private
const updateAccount = async (req, res) => {
    try {
        const { id } = req.account
        const { username, password, newPassword } = req.body

        if (!password) {
            return res.status(400).json({ message: 'Password is required' })
        }

        if (!username && !newPassword) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        // Does the account exist to update?
        const foundAccount = await Accounts.findById(id).exec()

        if (!foundAccount) {
            return res.status(400).json({ message: 'Account not found' })
        }

        // Confirm password
        const match = await bcrypt.compare(password, foundAccount.password)

        if (!match) return res.status(401).json({ message: 'Unauthorized' })

        // Confirm username
        if (username) {
            if (!USERNAME_REGEX.test(username)) {
                return res.status(409).json({ message: 'Invalid username' })
            }

            // Check for duplicate
            const duplicate = await Accounts.findOne({ username })
                .collation({ locale: 'en', strength: 2 })
                .lean()
                .exec()

            // Allow updates to the original account
            if (duplicate && duplicate?._id.toString() !== id) {
                return res.status(409).json({ message: 'Duplicate username' })
            }

            foundAccount.username = username
        }

        // Confirm new password
        if (newPassword) {
            // Hash password
            if (!PASSWORD_REGEX.test(newPassword)) {
                return res.status(409).json({ message: 'Invalid password' })
            }

            foundAccount.password = await bcrypt.hash(newPassword, 10) // salt rounds
        }

        const result = await foundAccount.save()

        return res.json({ message: `${result.username} updated` })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Server error!' })
    }
}

// @desc Delete a account
// @route DELETE /account
// @access Private
const deleteAccount = async (req, res) => {
    try {
        const { id } = req.account
        const { password } = req.body

        if (!password) {
            return res.status(400).json({ message: 'Password is required' })
        }

        // Does the account still have assigned tasks?
        const task = await Tasks.findOne({ account: id }).lean().exec()

        if (task) {
            return res
                .status(400)
                .json({ message: 'Account has assigned tasks' })
        }

        // Does the account exist to delete?
        const foundAccount = await Accounts.findById(id).exec()

        if (!foundAccount) {
            return res.status(400).json({ message: 'Account not found' })
        }

        // Confirm password
        const match = await bcrypt.compare(password, foundAccount.password)

        if (!match) return res.status(401).json({ message: 'Unauthorized' })

        const result = await foundAccount.deleteOne()

        return res.json({
            message: `Account ${result.username} with ID ${result._id} deleted`,
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Server error!' })
    }
}

// @desc Get all accounts
// @route GET /account/all
// @access Private
const getAllAccounts = async (req, res) => {
    try {
        const { id: currentAccountId } = req.account

        // Get all accounts from MongoDB
        const foundAccounts = await Accounts.find()
            .select(['-password', '-token', '-updatedAt'])
            .lean()

        // If no accounts
        if (!foundAccounts?.length) {
            return res.status(400).json({ message: 'No accounts found' })
        }

        // Exclude current account
        const data = foundAccounts.filter(
            (account) => account._id.toString() !== currentAccountId
        )

        return res.json(data)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Server error!' })
    }
}

// @desc Get accounts by page
// @route GET /account/page
// @access Private
const getAllAccountByPage = async (req, res) => {
    try {
        const { id: currentAccountId } = req.account
        const page = +req.query.page || 1
        const perPage = +req.query.perPage || 5

        // Get accounts from MongoDB
        Accounts.find()
            .select(['-password', '-token', '-updatedAt'])
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec((error, accounts) => {
                if (error) {
                    console.error(error)
                    return res.status(500).json({ message: 'Server error!' })
                }

                Accounts.countDocuments().exec((error, count) => {
                    if (error) {
                        console.error(error)
                        return res
                            .status(500)
                            .json({ message: 'Server error!' })
                    }

                    return res.json({
                        page,
                        perPage,
                        data: accounts,
                        total: count,
                        totalPage: Math.ceil(count / perPage),
                    })
                })
            })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Server error!' })
    }
}

// // @desc Update other account status
// // @route PATCH /account/status
// // @access Private
const updateAccountStatus = async (req, res) => {
    try {
        const { id: currentAccountId, roles: currentAccountRoles } = req.account
        const { id, active } = req.body

        // Current account cannot update status
        if (id === currentAccountId) {
            return res.status(403).json({ message: 'Forbidden' })
        }

        // Confirm other account ID
        if (!id)
            return res
                .status(400)
                .json({ message: 'Other account ID required' })

        if (!mongoose.isValidObjectId(id)) {
            return res.status(409).json({ message: 'Invalid other account ID' })
        }

        if (typeof active !== 'boolean') {
            return res.status(400).json({ message: 'Active field is required' })
        }

        // Does the other account exist to update?
        const foundOtherAccount = await Accounts.findById(id).exec()

        if (!foundOtherAccount) {
            return res.status(400).json({ message: 'Other account not found' })
        }

        // Test Forbidden currentAccount
        if (!currentAccountRoles.includes(ROLES.Admin)) {
            if (
                foundOtherAccount.roles.includes(ROLES.Admin) ||
                foundOtherAccount.roles.includes(ROLES.Mod)
            ) {
                return res.status(403).json({ message: 'Forbidden' })
            }
        }

        foundOtherAccount.active = active

        const result = await foundOtherAccount.save()

        return res.json({
            message: `Other account ${result.username} status updated`,
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Server error!' })
    }
}

// // @desc Update other account roles
// // @route PATCH /account/role
// // @access Private
const updateAccountRole = async (req, res) => {
    try {
        const { id: currentAccountId } = req.account
        const { id, roles, password } = req.body

        // Current account cannot update roles
        if (id === currentAccountId) {
            return res.status(403).json({ message: 'Forbidden' })
        }

        if (!id)
            return res
                .status(400)
                .json({ message: 'Other account ID required' })

        if (!mongoose.isValidObjectId(id)) {
            return res.status(409).json({ message: 'Invalid other account ID' })
        }

        if (!Array.isArray(roles) || !roles.length) {
            return res.status(400).json({ message: 'Roles field is required' })
        }

        // Confirm roles
        const roleArr = [...new Set(roles)]

        const hasRole = roleArr.every((role) =>
            Object.values(ROLES).includes(role)
        )

        if (!hasRole) {
            return res.status(409).json({ message: 'Invalid roles' })
        }

        if (!password) {
            return res.status(400).json({ message: 'Password is required' })
        }

        // Confirm current account password
        const currentAccount = await Accounts.findById(currentAccountId).exec()

        const match = await bcrypt.compare(password, currentAccount.password)

        if (!match) return res.status(401).json({ message: 'Unauthorized' })

        // Does the other account exist to update?
        const foundOtherAccount = await Accounts.findById(id).exec()

        if (!foundOtherAccount) {
            return res.status(400).json({ message: 'Other Account not found' })
        }

        foundOtherAccount.roles = roleArr

        const result = await foundOtherAccount.save()

        return res.json({
            message: `Other account ${result.username} roles updated`,
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Server error!' })
    }
}

// @desc Delete other account and tasks
// @route DELETE /account/delete
// @access Private
const deleteOtherAccount = async (req, res) => {
    try {
        const { id } = req.body

        if (!id)
            return res
                .status(400)
                .json({ message: 'Other account ID required' })

        if (!mongoose.isValidObjectId(id)) {
            return res.status(409).json({ message: 'Invalid other account ID' })
        }

        // Does the other account exist to delete?
        const foundOtherAccount = await Accounts.findById(id).exec()

        if (!foundOtherAccount) {
            return res.status(400).json({ message: 'Other account not found' })
        }

        // Find and delete all task of other account
        const resultOther = await Tasks.deleteMany({ account: id })
            .lean()
            .exec()

        const result = await foundOtherAccount.deleteOne()

        if (!result) {
            return res
                .status(400)
                .json({ message: 'Delete other account failed' })
        }

        return res.json({
            message: `Other account ${result.username} with ID ${result._id} deleted and ${resultOther.deletedCount} tasks deleted`,
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Server error!' })
    }
}

module.exports = {
    getAccount,
    createNewAccount,
    updateAccount,
    deleteAccount,
    // Mod
    getAllAccounts,
    getAllAccountByPage,
    updateAccountStatus,
    // Admin
    updateAccountRole,
    deleteOtherAccount,
}
