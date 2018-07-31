import express from 'express';
import authControl from './controllers/AuthController'

const router = express.Router();

/**
 * Example of how to use express.router
 * same as normal, but allows for splitting up into seperate files
 * for better readability and ease of management
 */

router.post('/login', authControl.login)

router.post('/register', authControl.register)

router.delete('/logout', authControl.logout)

router.get('/checkSession', authControl.checkSession)

export default router;