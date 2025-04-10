import { Request, Response, Router } from 'express';
import EventController from '../controllers/EventController';
import { verifyToken } from "../utils/VerifyToken";


const router = Router();

router.get('/event/category', EventController.getAllEventCategory);

router.get('/event/visibility', EventController.getAllVisibility);
router.get('/event/event-time', EventController.getAllEventTime);

router.post('/event/create', EventController.createEvent);

router.post('/event/comment/create', EventController.createComment);
router.patch('/event/comment/update/:id', EventController.updateComment);
router.get('/event/comments/:id', EventController.getCommentsForAEvent);
router.delete('/event/comment/delete/:id', EventController.deleteComment);

router.get('/events', EventController.getAllEvent);
router.get('/event/:id', EventController.getEventById);
// router.get('/users/all', verifyToken, AuthController.getallUsers);

export default router;