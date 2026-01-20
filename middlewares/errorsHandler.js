export default function errorsHandler(err, req, res, next) {
    res.status(500)
    res.json({
        error: err.message,
    });
}
