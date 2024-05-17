const jwt = require('jsonwebtoken')

const loginAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization
        if(!token)return res.status(404).json({error: "Token not found"})
        jwt.verify(token, process.env.SECRET)
        next()
    }catch(err){
        console.log(err)
        res.status(401).json({message:"Invalid Token"})
    }
}

module.exports = {
    loginAuth
}