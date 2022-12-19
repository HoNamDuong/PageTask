const express = require('express')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')

const config = (app) => {
    app.use(
        cors({
            origin: process.env.FRONTEND_URL,
            credentials: true,
            optionsSuccessStatus: 200,
        })
    )

    app.use(express.json({ extended: true }))

    app.use(express.urlencoded({ extended: true }))

    app.use(cookieParser())

    app.use('/', express.static(path.join(__dirname, '..', 'public')))
}

module.exports = config
