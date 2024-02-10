const express = require('express')
const app = new express()


 // Security middleware require
const rateLimit = require('express-rate-limit')
const mongoSanitize = require('express-mongo-sanitize')
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const hpp = require('hpp')
const router = require('./src/routes/api')

// Express Implement
app.use(express.urlencoded({extended: false}))
app.use(express.urlencoded({limit: '50mb'}))
app.use(express.json({limit: '50mb'}))

// Database Connection
require('./src/config/database')

 // Security Middleware Implement
app.use(mongoSanitize())
app.use(helmet())
app.use(cors())
app.use(xss())
app.use(hpp())

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Use an external store for consistency across multiple server instances.
})

// Apply the rate limiting middleware to all requests.
// app.use(limiter)


// Managing Backend API Routing
app.use('/api/v1', router)

module.exports = app