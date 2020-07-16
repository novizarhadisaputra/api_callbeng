exports.notFound = (req, res, next) => {
    res.status(404).json({
        message: 'Page Not Found'
    });
};

exports.productionErrors = (err, req, res, next) => {
    res.status(err.status ? err.status : 500).json({
        message: err.message,
        status: err.status,
        stack: err.stack ? err.stack : ''
    });
};

exports.developmentErrors = (err, req, res, next) => {
    res.status(err.status ? err.status : 500).json({
        message: err.message,
        status: err.status,
        stack: err.stack ? err.stack : ''
    });
};

exports.mongooseErrors = (err, req, res, next) => {
    if (err) return next(err);
    const errorKeys = Object.keys(err.errors);
    let message = '';
    errorKeys.forEach(element => (message += err.errors[element] + errorKeys.length > 0 ? ", " : ""));
    res.status(err.status ? err.status : 500).json({
        message: err.message,
        status: err.status,
    });
};

exports.catchErrors = (e) => {
    return function (req, res, next) {
        e(req, res, next).catch((err) => {
            if (typeof err == 'string') {
                res.status(400).json({
                    message: err
                });
            } else {
                next(err);
            }
        });
    }
};