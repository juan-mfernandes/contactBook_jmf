const { prisma } = require('./prisma')
const { emailValidator, phoneValidator } = require('../validations/validator')
const { ValidationError, NotFoundError } = require('../errors/customErrors')

const validations = (data) => {
    const emailIsValid = emailValidator(data.email)
    const phoneIsValid = phoneValidator(data.phone)
    if(emailIsValid === true && phoneIsValid === true && typeof(data.name) === 'string') {
        const email = data.email
        const phone = data.phone
        const name = data.name
        data = {
            name,
            email,
            phone
        }
        return data
    } else {
        return false
    }
}

const findContacts = async (userId) => {
    const contacts = await prisma.contact.findMany({
        where: {
            userId
        },
        include: {
            user: {
                select: {
                    email: true
                }
            }
        }
    })
    return contacts
}

const findContactById = async (id, userId) => {
    const contact = await prisma.contact.findFirst({
        where: {
            id,
            userId
        }
    })
    
    if(!contact) throw new NotFoundError("Id not found")

    return contact
}

const createContact = async (data, userId) => {
    const validData = validations(data)
    if(validData !== false) {
        const newContact = await prisma.contact.create({
            data: {
                ...validData,
                user: {
                    connect: { id: userId }
                }
            }
        })
        return newContact
    } else {
        throw new ValidationError("Invalid Data Format")
    }
}

const updateContact = async (id, data, userId) => {
    if(validations(data)) {
        const updatedContact = await prisma.contact.update({
            where: {
                id,
                userId
            },
            data
        })
        return updatedContact
    } else {
        throw new ValidationError("Invalid data format")
    }
}

const deleteContact = async (id, userId) => {
    if(!id) throw new NotFoundError("Id not found")
    const deletedContact = await prisma.contact.delete({
        where: {
            id,
            userId
        }
    })
    
    return deletedContact
}

module.exports = {
    findContacts,
    createContact,
    updateContact,
    deleteContact,
    findContactById
}