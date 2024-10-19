const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const privateKey = 'sample_task_manager'

const createJWTToken = (data) => {
    return jwt.sign({ ...data }, privateKey, {/* expiresIn: 60 * 60   *//* algorithm: 'RS256' */ });
}

const extractJWTToken =(token)=>{
    return jwt.verify(token, privateKey, {/*  algorithms: ['RS256'] */ })
}

// async function
const saltRounds = 12
const hashPassword = (password) =>{
    return bcrypt.hash(password, saltRounds)
}
const checkPassword = (password,hash) =>{
    return bcrypt.compare(password, hash)
}

module.exports = { createJWTToken, extractJWTToken, hashPassword, checkPassword }
