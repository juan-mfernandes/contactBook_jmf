const errorStatusMap = {
    NotFoundError: 404,
    AuthorizationError: 401,
    ValidationError: 400
}

const getHttpStatusCode = (err) => {
    const statusCode = errorStatusMap[err.name] || 500
    return statusCode
}

module.exports = {
    getHttpStatusCode
}