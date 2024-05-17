class CustomErrors extends Error {
    constructor(message) {
        super(message)
        this.name = this.contructor.name
    }
}

class AuthorizationError extends CustomErrors {
    constructor(message) {
        super(message)
        this.name = AuthorizationError
        this.statusCode = 401
    }
}

class NotFoundError extends CustomErrors {
    constructor(message) {
        super(message)
        this.name = NotFoundError
        this.statusCode = 404 
    }
}

class ValidationError extends CustomErrors{
    constructor(message) {
        super(message)
        this.name = ValidationError
        this.statusCode = 400
    }
}


module.exports = {
    NotFoundError,
    ValidationError,
    AuthorizationError
}