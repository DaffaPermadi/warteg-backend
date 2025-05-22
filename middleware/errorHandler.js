function errorHandler(err, req, res, next) {
    console.log('MASUK ERROR HANDLER');

    const statusCode = err.status || 500;
    const messageStatus = err.message || "Internal Server Error";

    res.status(statusCode).json({ message: messageStatus });
}

module.exports = errorHandler;