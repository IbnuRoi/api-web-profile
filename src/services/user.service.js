const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { findUserQuery, createUserQuery } = require("../repositories/user");

// Add new User
const registerUserService = async (req) => {
    const data = req.body
    

    const exist = await findUserQuery(data.username)
    if(exist) {
        throw new Error('Username already registered!')
    }

    const hashPassword = await bcrypt.hash(data.password, 10)

    const user = await createUserQuery({
        username: data.username,
        password: hashPassword
    })

    const { password, ...result } = user
    return result
}

// Login Service
const loginUserService = async (req) => {
    const data = req.body

    // Check Username
    const user = await findUserQuery(data.username)
    if(!user) {
        throw new Error('Invalid username or password!')
    }

    // Check Password
    const isMatch = await bcrypt.compare(data.password, user.password)
    if(!isMatch) {
        throw new Error('Invalid username or password!')
    }

    // Generate JWT Token
    const token = jwt.sign(
        {username: user.username, role: user.role},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRES}
    )

    const result = {
        token: token
    }

    return result
}

module.exports = {
    registerUserService,
    loginUserService
}