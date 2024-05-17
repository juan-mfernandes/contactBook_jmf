const { prisma } = require('./prisma')
const { emailValidator } = require('../validations/validator')
var jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

const { ValidationError, AuthorizationError, NotFoundError } = require('../errors/customErrors');

const findUserByEmail = async(email) => {
    const validEmail = emailValidator(email)
    try {
        if(validEmail === true) {
            const user = await prisma.user.findFirst({
                where: {
                    email
                }
            })
            return user
        } else {
            throw new ValidationError("Invalid email format")
        }
    } catch(err) {
        console.log(err)
        throw err
    }
}

const createUser = async(data) => {
    const email = data.email
    try {
        const existentEmail = await findUserByEmail(email)
        if(existentEmail) throw new AuthorizationError("Email alredy exists")
        const password = data.password
        const saltRounds = 10
        const hash = bcrypt.hashSync(password, saltRounds)
        const newUser = await prisma.user.create({
            data : {
                name: data.name,
                email,
                password: hash
            }
        })
        delete newUser.password
        return newUser
    }catch(err) {
        console.log(err)
        throw err
    }
}

const comparePassword = (password, encryptedPassword) => {
    const samePassword = bcrypt.compareSync(password, encryptedPassword)
    return samePassword
}

const login = async(data) => {
    try {
        const email = data.email
        const user = await findUserByEmail(email)
        const userName = user.name
        if(!user) throw new NotFoundError("User not found")
        const password = data.password
        const encryptedPassword = user.password
        const samePassword = comparePassword(password, encryptedPassword)
        if(!samePassword) throw new AuthorizationError("Invalid credentials")
        const token = jwt.sign({id: user.id, email: user.email}, process.env.SECRET)
        return {userName, token}
    }catch(err){
        console.log(err)
        throw err
    }
}

module.exports = {
    createUser,
    login
}