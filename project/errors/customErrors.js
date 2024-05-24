class CustomErrors extends Error {
    constructor(message) {
        super(message)
        this.name = this.constructor.name
    }
}

class AuthorizationError extends CustomErrors {
    constructor(message) {
        super(message)
        this.statusCode = 401
    }
}

class NotFoundError extends CustomErrors {
    constructor(message) {
        super(message)
        this.statusCode = 404 
    }
}

class ValidationError extends CustomErrors{
    constructor(message) {
        super(message)
        this.statusCode = 400
    }
}


module.exports = {
    NotFoundError,
    ValidationError,
    AuthorizationError
}