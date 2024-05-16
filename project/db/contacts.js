const { prisma } = require('./prisma')
const { emailValidator, phoneValidator } = require('../validations/validator')

const findContacts = async () => {
    const contacts = await prisma.contact.findMany()
    return contacts
}

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

const createContact = async (data) => { 
    if(validations(data) !== false) {
        const newContact = prisma.contact.create({
            data: {
                name : data.name,
                email: data.email,
                phone: data.phone
            }
        });
        return newContact
    } else {
        return false
    }
}

const updateContact = async (id, data) => {
    if(validations(data)) {
        const updatedUser = await prisma.contact.update({
            where: {
                id
            },
            data
        })
        return updatedUser
    } else {
        return false
    }
}

module.exports = {
    findContacts,
    createContact,
    updateContact
};