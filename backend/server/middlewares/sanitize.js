// // /middlewares/sanitize.js
// import mongoSanitize from 'express-mongo-sanitize';

// export const sanitize = mongoSanitize({
// 	replaceWith: '_',
// });
// /middlewares/sanitize.js

// /////////////////////////
// import mongoSanitize from 'express-mongo-sanitize';

// export const sanitize = mongoSanitize({
// 	replaceWith: '_',
// 	onSanitize: ({ req, key }) => {
// 		console.warn(`Sanitized: ${key} in ${req.path}`);
// 	},
// 	// Don't try to overwrite req.query if it's read-only
// 	sanitizeQuery: false,
// });

// /middlewares/sanitize.js
//////////////////////////////////////
// import mongoSanitize from 'express-mongo-sanitize';

// export const sanitize = mongoSanitize({
// 	replaceWith: '_',
// 	sanitizeQuery: false, // prevents crashing on read-only req.query
// 	onSanitize: ({ req, key }) => {
// 		console.warn(`Sanitized key: '${key}' on route: ${req.path}`);
// 	},
// });
/////////////////////////////////////////
// /middlewares/sanitize.js
const forbiddenKeys = ['__proto__', 'constructor', 'prototype'];

function deepSanitize(obj) {
	if (typeof obj !== 'object' || obj === null) return;

	for (const key in obj) {
		if (forbiddenKeys.includes(key) || key.startsWith('$')) {
			console.warn(`Sanitized key: '${key}'`);
			delete obj[key];
		} else {
			deepSanitize(obj[key]);
		}
	}
}

export const sanitize = (req, res, next) => {
	deepSanitize(req.body);
	deepSanitize(req.params);
	// Skipping req.query to avoid modifying immutable object
	next();
};
