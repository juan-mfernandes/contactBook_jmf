const express = require('express')
const server = express()
const { contactRouter } = require('./routes/contacts')

const port = 8080

server.listen(port, () => {
    console.log("Server running")
});

server.use('/health', (req,res) => {
    res.send("Running bro!")
});

server.use(express.json())
server.use("/v1", contactRouter)