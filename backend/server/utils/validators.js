// /backend/utils/validation.js
import { body } from 'express-validator';
import { userNameMinimum, passwordMinimum } from './devModeConfig.js';

export const registrationValidation = [
	body('firstName').trim().escape().notEmpty().withMessage('First name is required').isAlpha().isLength({ max: 50 }).withMessage('First name must contain only letters'),

	body('lastName').trim().escape().notEmpty().withMessage('Last name is required').isAlpha().isLength({ max: 50 }).withMessage('Last name must contain only letters'),

	body('userName')
		.trim()
		.escape()
		.notEmpty()
		.withMessage('Username is required')
		.isAlphanumeric()
		.withMessage('Username must be alphanumeric')
		.isLength({ min: userNameMinimum, max: 50 })
		.withMessage('Username must be 4-50 characters long'),

	body('password').notEmpty().withMessage('Password is required').isLength({ min: passwordMinimum, max: 255 }).withMessage('Password must be at least 6 characters long'),

	body('phone')
		.notEmpty()
		.withMessage('Phone number is required')
		.matches(/^\d{10}$/)
		.isLength({ max: 20 })
		.withMessage('Phone must be a 10-digit number'),

	body('birthMonth').notEmpty().withMessage('Birth month is required').isInt({ min: 1, max: 12 }).withMessage('Birth month must be 1–12').toInt(),

	body('birthDay').notEmpty().withMessage('Birth day is required').isInt({ min: 1, max: 31 }).withMessage('Birth day must be 1–31').toInt(),

	body('birthYear').notEmpty().withMessage('Birth year is required').isInt({ min: 1900, max: new Date().getFullYear() }).withMessage('Birth year must be realistic').toInt(),

	body('address').trim().escape().notEmpty().withMessage('Address required').isLength({ max: 100 }).withMessage('Address must be at most 100 characters'),

	body('address2').optional().escape().trim().isLength({ max: 100 }).withMessage('Address 2 must be at most 100 characters'),

	body('city')
		.trim()
		.escape()
		.notEmpty()
		.withMessage('City is required')
		.isLength({ max: 50 })
		.withMessage('City must be at most 50 characters')
		.isAlpha('en-US', { ignore: ' ' })
		.withMessage('City must contain only letters'),

	body('state').trim().notEmpty().withMessage('State is required').isLength({ min: 2, max: 2 }).withMessage('Use 2-letter state code'),

	body('zip')
		.notEmpty()
		.escape()
		.withMessage('ZIP code is required')
		.isPostalCode('US')
		.withMessage('Must be a valid ZIP code')
		.isLength({ max: 10 })
		.withMessage('ZIP code must be at most 10 characters'),
];
