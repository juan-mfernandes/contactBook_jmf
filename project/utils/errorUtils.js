const errorStatusMap = {
    NotFoundError: 404,
    UnauthorizedError: 401,
    ValidationError: 400
}

const getHttpStatusCode = (err) => {
    errorStatusMap[err.name] || 500
}

module.exports = {
    getHttpStatusCode
}