function errorHandler (err, req, res, next) {
    console.log('MASUK ERROR HANDLER')

    let statusCode = err.status || 500;
    let messageStatus = err.message || "Internal Server Error"

    res.status(statusCode).json(messageStatus);
}

module.exports = errorHandler;