const jwt = require('jsonwebtoken')

const loginAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization
        if(!token)return res.status(404).json({error: "Token not found"})
        const payload = jwt.verify(token, process.env.SECRET)
        req.user = payload.id
        next()
    }catch(err){
        res.status(401).json({error:"Invalid Token"})
    }
}

module.exports = {
    loginAuth
}