require('dotenv').config()
const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('./src/utils/swagger')

// Import Routes
const authRoute = require('./src/routes/auth.routes')
const projectsRoute = require('./src/routes/projects.routes')
const publicRoute = require('./src/routes/public.routes')

// Middleware
const authMiddleware = require('./src/middlewares/auth.middleware')

const app = express()

app.use(cors())

app.use(bodyParser.json())

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    swaggerOptions: {
        supportedSubmitMethods: ['get']
    },
    customSiteTitle: 'Portfolio API Docs',
    customCss: '.swagger-ui .topbar { display: none }'
}))

// Projects Route
app.use('/api/private', authMiddleware, projectsRoute)

// Public Routes
app.use('/api/public', publicRoute)

// Auth Route
app.use('/api/auth', authRoute)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})