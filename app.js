require('dotenv').config()
const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')

// Import Routes
const authRoute = require('./src/routes/auth.routes')
const projectsRoute = require('./src/routes/projects.routes')
const publicRoute = require('./src/routes/public.routes')

// Middleware
const authMiddleware = require('./src/middlewares/auth.middleware')

const app = express()

app.use(cors())

app.use(bodyParser.json())

// Projects Route
app.use('/api/private', authMiddleware, projectsRoute)

// Public Routes
app.use('/api/public', publicRoute)

// Auth Route
app.use('/api/auth', authRoute)

app.listen(5000, () => {
    console.log('Listening on port 5000')
})