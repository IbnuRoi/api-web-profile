const prisma = require("../utils/prisma");


// GET
// GET: Find User by userId
const findUserQuery = async (username) => {
    const result = await prisma.users.findUnique({
        where: { username }
    })

    return result
}

// POST
// POST: Get User by projectId
const createUserQuery = async (data) => {
    const result = await prisma.users.create({
        data: {
            username: data.username,
            password: data.password,
            role: data.role ?? 'admin'
        }
    })

    return result
}

module.exports = {
    createUserQuery,
    findUserQuery
}