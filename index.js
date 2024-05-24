const express = require('express')
const server = express()
const { contactRouter } = require('./routes/contacts')
const { userRouter } = require('./routes/users')

const port = 8080

server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

server.use('/health', (req,res) => {
    res.send("Running bro!")
})

server.use(express.json())
server.use("/v1", contactRouter)
server.use("/v1", userRouter)