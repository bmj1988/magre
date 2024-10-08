const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const routes = require('./routes')
const { ValidationError } = require('sequelize');

const { environment } = require('./config');
const isProduction = environment === 'production';

const app = express();
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.static('assets'))

if (!isProduction) {
    app.use(cors())
}

/// 'allows images with URLs to render in deployment', consider scrapping.
/// Helmet, in general, however seems to be very useful. Look into it for security measures
app.use(
    helmet.crossOriginResourcePolicy({
        policy: "cross-origin"
    })
);

/// This is the foundation of the auth for the entire project
/// a worthy research topic.

app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && "Lax",
            httpOnly: true
        }
    })
);

app.use(routes)

app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = { message: "The requested resource couldn't be found." };
    err.status = 404;
    next(err);
});

app.use((err, _req, _res, next) => {
    if (err instanceof ValidationError) {
        let errors = {};
        for (let error of err.errors) {
            errors[error.path] = error.message;
        }
        err.title = 'Validation error';
        err.errors = errors;
    }
    next(err);
});

app.use((err, _req, res, _next) => {
    if (err.code === "EBADCSRFTOKEN") {
        const token = _req.csrfToken()
        err.status = 403
        err.title = 'badcsrf'
        err.message = "invalid csrf token"
        err.xsrfToken = token
    }
    res.status(err.status || 500);
    console.error(err);
    res.json({
        title: err.title || 'Server Error',
        message: err.message,
        errors: err.errors,
        stack: isProduction ? null : err.stack,
        xsrfToken: err.xsrfToken || null
    });
});

module.exports = app;
