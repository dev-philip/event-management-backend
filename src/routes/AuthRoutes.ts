import { Request, Response, Router } from 'express';
import AuthController from '../controllers/AuthController';
import { verifyToken } from "../utils/VerifyToken";


const router = Router();

router.post('/register', AuthController.createUser);
router.post('/login', AuthController.logInUser);
router.get('/users/all', verifyToken, AuthController.getallUsers);

export default router;