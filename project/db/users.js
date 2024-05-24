const { prisma } = require('./prisma')
const { emailValidator, passwordValidator } = require('../validations/validator')
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { ValidationError, AuthorizationError, NotFoundError } = require('../errors/customErrors');

const findUserByEmail = async(email) => {
    const validEmail = emailValidator(email)
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
}

const createUser = async(data) => {
    const email = data.email
    const existentEmail = await findUserByEmail(email)
    if(existentEmail) throw new AuthorizationError("Email alredy exists")
    const password = data.password
    if(!passwordValidator(password)) throw new ValidationError("Passwords must contain at least one special character")
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
}

const comparePassword = (password, encryptedPassword) => {
    const samePassword = bcrypt.compareSync(password, encryptedPassword)
    return samePassword
}

const login = async(email, password) => {
    const user = await findUserByEmail(email)
    if(!user) throw new NotFoundError("User not found")
    const userName = user.name

    const passwordN = password 
    const encryptedPassword = user.password
    const samePassword = comparePassword(passwordN, encryptedPassword)

    if(!samePassword) throw new ValidationError("Invalid credentials")
    const token = jwt.sign({id: user.id, email: user.email}, process.env.SECRET)

    return { userName, token }
}

module.exports = {
    createUser,
    login
}