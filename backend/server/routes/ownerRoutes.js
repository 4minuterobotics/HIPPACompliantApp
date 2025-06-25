import express from 'express';
import { ensureOwner } from '../middlewares/auth.js';
import { getAllUsers, updateUserRoles, getOwnerProfile } from '../controllers/ownerController.js';
import { getStudentProfile } from '../controllers/studentController.js';
const router = express.Router();
router.get('/:ownerId', ensureOwner, getOwnerProfile);
router.get('/:ownerId/users', ensureOwner, getAllUsers);
router.get('/:ownerId/users/:id', ensureOwner, getStudentProfile);
router.post('/:ownerId/users/:id/roles', ensureOwner, updateUserRoles);

// Dev mode - no auth required
router.post('/dev/owner/users/:id/roles', updateUserRoles);

export default router;
////////////////////////////////////////////////////////////////
// import express from 'express';
// import { ensureOwner } from '../middlewares/auth.js';
// import { getAllUsers, updateUserRoles, getOwnerProfile } from '../controllers/ownerController.js';
// import { getStudentProfile } from '../controllers/studentController.js';
// const router = express.Router();
// router.get('/:id', ensureOwner, getOwnerProfile);
// router.get('/users', ensureOwner, getAllUsers);
// router.get('/users/:id', ensureOwner, getStudentProfile);
// router.post('/users/:id/roles', ensureOwner, updateUserRoles);

// // Dev mode - no auth required
// router.post('/dev/owner/users/:id/roles', updateUserRoles);

// export default router;
