const validator = require('validator')

const emailValidator = (input) => {
    const isValid = validator.isEmail(input)
    return isValid
};

const phoneValidator = (phone) => {
    const isValid = validator.isMobilePhone(phone, "any")
    return isValid
};

module.exports = {
    emailValidator,
    phoneValidator
}