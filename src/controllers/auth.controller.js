const { registerUserService, loginUserService } = require("../services/user.service");
const response = require("../utils/response");


const registerUser = async (req, res) => {
    try {
        const data = await registerUserService(req)
        response(200, data, 'New user created successfully', res)
    } catch (err) {
        response(500, null, err.message, res)
    }
}

const loginUser = async (req, res) => {
    try {
        const data = await loginUserService(req)
        response(200, data, 'Login Successfully!', res)
    } catch (err) {
        if (err.message === 'Invalid email or password') {
            return response(401, null, err.message, res)
        }
        response(401, null, err.message, res)
    }
}

module.exports = {
    registerUser,
    loginUser
}