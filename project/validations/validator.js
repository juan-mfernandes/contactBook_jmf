const validator = require('validator')

const emailValidator = (input) => {
    return validator.isEmail(input)
}

const phoneValidator = (phone) => {
    return validator.isMobilePhone(phone, "any")
}

const passwordValidator = (password) => {
    let regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    return regex.test(password) ? true : false
}

module.exports = {
    emailValidator,
    phoneValidator,
    passwordValidator
}