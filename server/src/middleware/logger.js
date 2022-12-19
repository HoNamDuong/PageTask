const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')
const moment = require('moment')
const { v4: uuid } = require('uuid')

const logEvents = async (message, logFileName) => {
    const timeNow = moment().format('YYYY-MM-DD hh:mm:ss')
    const logItem = `${timeNow}\t${uuid()}\t${message}\n`

    try {
        if (!fs.existsSync(path.join(__dirname, '..', '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', '..', 'logs'))
        }
        await fsPromises.appendFile(
            path.join(__dirname, '..', '..', 'logs', logFileName),
            logItem
        )
    } catch (error) {
        console.error(error)
    }
}

const reqLogger = (req, res, next) => {
    console.log(`${req.method}\t${req.url}\t${req.headers.origin}`)

    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log')

    return next()
}

const errLogger = (err, req, res, next) => {
    console.error(err)

    logEvents(
        `${req.method}\t${req.url}\t${req.headers.origin}\t${err.name}: ${err.message}`,
        'errLog.log'
    )

    const status = res.statusCode ? res.statusCode : 500

    return res.status(status).json({ message: 'Server error!' })
}

module.exports = {
    logEvents,
    reqLogger,
    errLogger,
}
