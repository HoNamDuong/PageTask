require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const config = require('./config')
const connectDB = require('./config/connectDB')
const { errLogger, reqLogger, logEvents } = require('./middleware/logger')

const app = express()
const PORT = process.env.PORT || 5000

// Connect database
connectDB()

// Request log
app.use(reqLogger)

// Config
config(app)

// Route
app.use('/', require('./routes'))
app.use('/auth', require('./routes/authRoute'))
app.use('/task', require('./routes/taskRoute'))
app.use('/account', require('./routes/accountRoute'))

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})

// Error log
app.use(errLogger)

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', (err) => {
    console.error(err)
    logEvents(`${err.name}: ${err.message}`, 'mongoErrLog.log')
})

mongoose.set('debug', (collectionName, method, query, doc) => {
    console.log(`${collectionName}.${method}`, JSON.stringify(query), doc)
})
