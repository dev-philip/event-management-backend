import { Request, Response, Router } from 'express';
import RsoController from '../controllers/RsoController';
import multer from 'multer'; 
import { verifyToken } from "../utils/VerifyToken";

// Set up Multer storage
const storage = multer.diskStorage({
    destination: function (req: Request, file: Express.Multer.File, cb: Function) {
      cb(null, 'public/uploads/rso'); // Destination directory for uploaded files
    },
    filename: function (req: Request, file: Express.Multer.File, cb: Function) {
      cb(null, Date.now() + '-' + file.originalname); // Filename for uploaded files
    }
});
  
// Create Multer instance
const upload = multer({ storage: storage });

const router = Router();


router.post('/rso/create',
 upload.fields([
  { name: 'file' },
  { name: 'file2' },
]), RsoController.createRso);



router.get('/rso/getbyadmin/:id', RsoController.getRsoById);


// router.get('/rso/getbyadmin/:id', RsoController.getRsoById);
router.get('/rso/getbyschool/:id', RsoController.getRsoBySchool);
router.get('/rso/getmembers/:id', RsoController.getRsoMembersById);
router.get('/rso/getallmembers/all', RsoController.getRsoMembers);


router.post('/rso/join/group', RsoController.joinRsoGroup);
router.post('/rso/leave/group', RsoController.leaveRsoGroup);


// router.get('/users/all', verifyToken, AuthController.getallUsers);

export default router;