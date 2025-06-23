// export function ensureAdmin(req, res, next) {
// 	if (req.isAuthenticated() && req.user?.is_admin) return next();
// 	return res.status(403).json({ error: 'Admins only' });
// }

// export function ensureStudent(req, res, next) {
// 	if (req.isAuthenticated() && !req.user?.is_admin && !req.user?.is_owner && !req.user?.is_provider && String(req.user.id) === String(req.params.id)) {
// 		return next();
// 	}
// 	return res.status(403).json({ error: 'Student access only' });
// }
//////////////////////////////////////////////////////////////////////////////////////
// /backend/middlewares/auth.js
export function ensureAdmin(req, res, next) {
	if (req.isAuthenticated() && req.user?.is_admin) {
		return next();
	}
	return res.status(403).json({ error: 'Access denied. Admins only.' });
}

export function ensureStudents(req, res, next) {
	if (!req.isAuthenticated()) {
		return res.status(401).json({ error: 'Not authenticated' });
	}

	const { is_student } = req.user;
	if (is_student) return next();
	return res.status(403).json({ error: 'Access denied. Students only.' });
}

export function ensureStudent(req, res, next) {
	console.log('ensureStudent middleware called');
	if (req.isAuthenticated()) {
		console.log('User is authenticated:', req.user);
		if (req.user.is_student && String(req.user.id) === String(req.params.id)) {
			return next();
		}
	}
	return res.status(403).json({ error: 'Access denied. Student access only.' });
}
