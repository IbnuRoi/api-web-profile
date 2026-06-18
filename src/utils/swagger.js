const swaggerJsdoc = require('swagger-jsdoc')

const docsPath = path.resolve('./docs')
console.log('Docs path:', docsPath)
console.log('Files found:', fs.existsSync(docsPath) ? fs.readdirSync(docsPath) : 'FOLDER NOT FOUND')

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Portfolio Web API',
            version: '1.0.0',
            description: 'REST API for personal portfolio website'
        },
        servers: [
            {
                url: 'http://localhost:5000',
                description: 'Development Server'
            },
            {
                url: 'https://api-web-profile.onrender.com',
                description: 'Production Server'
            }
        ],
        components: {
            schemas: {
                Project: {
                    type: 'object',
                    properties: {
                        id: { type: 'string', example: '550e8400-e29b-41d4-a716-446655440000'},
                        name: { type: 'string', example: 'E-commerce Website'},
                        projectType: { type: 'string', example: 'Web Application'},
                        date: { type: 'string', example: 'January 21, 2026'},
                        imageUrl: { type: 'string', example: 'https://res.cloudinary.com/...'},
                        sourceCode: { type: 'string', example: 'https://github.com/...'},
                        livePreview: { type: 'string', example: 'https://project.vercel.app'},
                        description: {
                            type: 'object',
                            properties: {
                                short:  { type: 'string', example: 'Short description here'},
                                long: { type: 'string', example: 'Full description here'}
                            }
                        },
                        techChallenge: {
                            type: 'object',
                            properties: {
                                challenge: { type: 'string', example: 'Challenge here'},
                                solution: { type: 'string', example: 'Solution here'},
                            }
                        },
                        techStacks: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: { type: 'integer', example: 1},
                                    category: { type: 'string', example: 'frontend'},
                                    name: { type: 'string', example: 'Next.js'},
                                }
                            }
                        },
                        keyFeatures: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: { type: 'integer', example: 1},
                                    feature: { type: 'string', example: 'User-Friendly Navigation'},
                                }
                            }
                        },
                        createdAt: { type: 'string', example: '2026-06-08T15:02:56.694Z'}
                    }
                },
                Metadata: {
                    type: 'object',
                    properties: {
                        page: { type: 'integer', example: 1},
                        limit: { type: 'integer', example: 6},
                        totalPages: { type: 'integer', example: 4},
                        nextPage: { type: 'integer', example: 2, nullable: true},
                        prevPage: { type: 'integer', example: null, nullable: true},
                    }
                },
                Error: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Project not found'}
                    }
                }
            }     
        }
    },
    apis: ['./docs/*.yaml']
}

module.exports = swaggerJsdoc(options)