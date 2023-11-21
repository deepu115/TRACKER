import { body, validationResult } from 'express-validator';

export const userSignupValidationRules = () => {
    return [
        // username must be at least 5 chars long
        body('username').isLength({ min: 5 }).withMessage('Username must be at least 5 characters'),
        // email must be valid
        body('email').isEmail().withMessage('Email must be valid'),
        // password must be at least 6 chars long
        body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
    ];
};

export const userLoginValidationRules = () => {
    return [
        // email must be valid
        body('email').isEmail().withMessage('Email must be valid'),
        // password must not be empty
        body('password').not().isEmpty().withMessage('Password must not be empty'),
    ];
};

export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

    return res.status(422).json({
        errors: extractedErrors,
    });
};
