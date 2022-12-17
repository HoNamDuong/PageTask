const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Accounts = require('../models/Accounts')
const { createNewAccount } = require('./accountController')

// @desc Login
// @route POST /auth/login
// @access Public
const login = async (req, res) => {
    try {
        {
            const { username, password, persist } = req.body

            // Confirm fields
            if (!username || !password) {
                return res
                    .status(400)
                    .json({ message: 'All fields are required' })
            }

            if (typeof username !== 'string' || typeof password !== 'string') {
                return res
                    .status(409)
                    .json({ message: 'Invalid username or password' })
            }

            const foundAccount = await Accounts.findOne({ username }).exec()

            if (!foundAccount || !foundAccount.active) {
                return res.status(401).json({ message: 'Unauthorized' })
            }

            // Confirm password
            const match = await bcrypt.compare(password, foundAccount.password)

            if (!match) return res.status(401).json({ message: 'Unauthorized' })

            // Create accessToken and refreshToken
            const accessToken = jwt.sign(
                {
                    id: foundAccount._id,
                    username: foundAccount.username,
                    roles: foundAccount.roles,
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '5m' }
            )

            const refreshToken = jwt.sign(
                { id: foundAccount._id },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '7d' }
            )

            // Saving refreshToken with current account
            foundAccount.token = refreshToken
            await foundAccount.save()

            // Create secure cookie with refresh token
            if (persist && typeof persist === 'boolean') {
                res.cookie('jwt', refreshToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'strict',
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                })
            } else {
                res.cookie('jwt', refreshToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'strict',
                })
            }

            // Send accessToken containing id, username and roles
            return res.json({ accessToken })
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Server error!' })
    }
}

// @desc Register
// @route POST /auth/register
// @access Public
const register = async (req, res) => {
    try {
        createNewAccount(req, res)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Server error!' })
    }
}

// @desc Refresh
// @route GET /auth/refresh
// @access Public
const refresh = (req, res) => {
    const cookies = req.cookies

    if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' })

    const refreshToken = cookies.jwt

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
            try {
                if (err) return res.status(403).json({ message: 'Forbidden' })

                const foundAccount = await Accounts.findById(decoded.id).exec()

                // Clear refreshToken token if Invalid refreshToken
                if (
                    !foundAccount ||
                    !foundAccount.active ||
                    foundAccount.token !== refreshToken
                ) {
                    res.clearCookie('jwt', {
                        httpOnly: true,
                        secure: true,
                        sameSite: 'strict',
                    })

                    return res.status(401).json({ message: 'Unauthorized' })
                }

                const accessToken = jwt.sign(
                    {
                        id: foundAccount._id,
                        username: foundAccount.username,
                        roles: foundAccount.roles,
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '5m' }
                )

                return res.json({ accessToken })
            } catch (error) {
                console.error(error)
                return res.status(500).json({ message: 'Server error!' })
            }
        }
    )
}

// @desc Logout
// @route POST /auth/logout
// @access Public
const logout = async (req, res) => {
    const cookies = req.cookies

    if (!cookies?.jwt) return res.sendStatus(204) //No content

    const refreshToken = cookies.jwt

    res.clearCookie('jwt', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
    })

    // Is refreshToken in db?
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
            try {
                if (err) return res.status(403).json({ message: 'Forbidden' })

                const foundAccount = await Accounts.findById(decoded.id).exec()

                if (!foundAccount || foundAccount.token !== refreshToken) {
                    return res.status(401).json({ message: 'Unauthorized' })
                }

                foundAccount.token = ''

                // Clear token and save
                await foundAccount.save()

                return res.json({ message: 'Cookie cleared' })
            } catch (error) {
                console.error(error)
                return res.status(500).json({ message: 'Server error!' })
            }
        }
    )
}

module.exports = {
    login,
    register,
    refresh,
    logout,
}
