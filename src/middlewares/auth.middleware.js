const jwt = require('jsonwebtoken');
const response = require('../utils/response');
const { findUserQuery } = require('../repositories/user');

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization

    if(!authHeader) {
        return response(401, null, 'Authorization Error!', res)
    }

    const token = authHeader?.split(' ')[1]
    const jwtSecret = process.env.JWT_SECRET

    if(!token) {
        return response(401, null, 'No token provided!', res)
    }

    try {
        const decoded = jwt.verify(token, jwtSecret)

        // Cek Role
        if(decoded.role !== 'admin') {
            return response(403, null, 'Access Forbidden', res)
        }

        const currentUser = await findUserQuery(decoded.username)

        req.user = {
            ...currentUser,
            decoded
        }
        next()
    } catch (err) {
        return response(401, null, 'Invalid or expired token!', res)
    }
}

module.exports = authMiddleware