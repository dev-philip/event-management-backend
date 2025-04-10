import { Request, Response, Router } from 'express';
import UniversityController from '../controllers/UniversityController';
import { verifyToken } from "../utils/VerifyToken";
import multer from 'multer';

// Set up Multer storage
const storage = multer.diskStorage({
    destination: function (req: Request, file: Express.Multer.File, cb: Function) {
      cb(null, 'public/uploads/university'); // Destination directory for uploaded files
    },
    filename: function (req: Request, file: Express.Multer.File, cb: Function) {
      if(file && file.fieldname === 'file2'){
        cb(null, Date.now() + '-Photo-' + file.originalname); // Filename for uploaded files
      }else{
        cb(null, Date.now() + '-CoverPhoto-' + file.originalname); // Filename for uploaded files
      }
     
    }
});
  
// Create Multer instance
const upload = multer({ storage: storage });
// const upload = multer();
const router = Router();

// upload.single('file'),
router.post('/university/create', upload.fields([
  { name: 'file' },
  { name: 'file2' },
]), UniversityController.createUniversity);
// router.post('/admin/product/upload', verifyToken, upload.fields([{ name: 'file1' }, { name: 'file2' }, { name: 'file3' }]), ProductController.saveProduct);
// router.get('/event/:id', EventController.getEventById);
router.get('/university/all',  UniversityController.getallUniversity);

export default router;