import { Request, Response, Router } from 'express';
import ProfileController from '../controllers/ProfileController';
import { verifyToken } from "../utils/VerifyToken";
import multer from 'multer';

// Set up Multer storage
const storage = multer.diskStorage({
    destination: function (req: Request, file: Express.Multer.File, cb: Function) {
      cb(null, 'public/uploads/profileimage'); // Destination directory for uploaded files
    },
    filename: function (req: Request, file: Express.Multer.File, cb: Function) {
        cb(null, Date.now() + '-profilepicture-' + file.originalname); // Filename for uploaded files
     
    }
});
  
// Create Multer instance
const upload = multer({ storage: storage });
// const upload = multer();
const router = Router();

// upload.single('file'),
router.patch('/profile/create/:id', upload.fields([
  { name: 'file' },
]), ProfileController.updateProfile);
router.get('/profile/:id', ProfileController.getProfileById);
router.get('/user/getallbyschool/:id', ProfileController.getAllUserBySchool);
router.get('/user/role', ProfileController.getRole);

export default router;