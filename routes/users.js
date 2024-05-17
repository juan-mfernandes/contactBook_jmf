const express = require('express')
const userRouter = express.Router()
const { getHttpStatusCode } = require('../project/utils/errorUtils')
const { createUser, login } = require('../project/db/users')

userRouter.post("/register", async(req, res) => {
    const data = req.body
    try {
        const newUser = await createUser(data)
        res.status(202).json(newUser)
    }catch(err){
        const statusCode = getHttpStatusCode(err)
        res.status(statusCode).json({error: err.message})
    }
})

userRouter.post("/login", async(req, res) => {
    try {
        const data = req.body
        const token = await login(data)
        const loginMessage = `Welcome, sr(a) ${token.userName}`
        res.status(200).json({loginMessage, token: token.token})
    }catch(err){
        const statusCode = getHttpStatusCode(err)
        res.status(statusCode).json({error: err.message})
    }
})

module.exports = { userRouter }