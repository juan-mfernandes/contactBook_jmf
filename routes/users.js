const express = require('express')
const userRouter = express.Router()
const { getHttpStatusCode } = require('../project/utils/errorUtils')
const { createUser, login } = require('../project/db/users')

userRouter.post("/register", async(req, res) => {
    const data = req.body
    try {
        const newUser = await createUser(data)
        res.status(201).json(newUser)
    }catch(err){
        const statusCode = getHttpStatusCode(err)
        return res.status(statusCode).json({error: err.message})
    }
})

userRouter.post("/login", async(req, res) => {
    const {email, password} = req.body
    try {
        const user = await login(email, password)
        const loginMessage = `Welcome, ${user.userName}`
        res.status(200).json({loginMessage, token: user.token})
    }catch(err){
        console.log(err)
        const statusCode = await getHttpStatusCode(err)
        return res.status(statusCode).json({error: err.message})
    }
})

module.exports = { userRouter }