import { Request, Response } from 'express';
import logger from '../utils/logger';
import DatabaseConnectionManager from '../config/databaseConnectionManager';
import Joi from 'joi';
import { generateTokens } from "../utils/VerifyToken";
import moment from 'moment';

import * as fs from 'fs';
import * as fsPromises from 'fs/promises';
import University from '../models/University';

class UniversityController {

  async getallUniversity(req: Request, res: Response): Promise<void> {
    const getAllUniResponse = await University.getAllUni(DatabaseConnectionManager.getInstance().getPool());

    if (getAllUniResponse !== null) {
      res.status(200).json({ getAllUniResponse });
    } else {
      res.status(500).json({ error: 'Failed to fetch University (controller)' });
    }
    
}

async createUniversity(req: Request, res: Response): Promise<void> {
    const { 
      universityName, universityAbout, universityEmail, universityNumber, universityAddress, universityCity, universityState,
      universityZipCode, additionalInfo, lat, Lng, geocode, admin_id, ...extraFields
    } = req.body;

    //Check if there are any extra fields
    if (Object.keys(extraFields).length > 0) {
      res.status(400).json({ error: 'Invalid data passed to the request body' });
      return;
    }

    if (!req.files) {
      res.status(400).send({ error: 'No files uploaded.' });
      return;
    }

  const photoPath = (req.files as { [fieldname: string]: Express.Multer.File[] })['file2'][0].path.replace(/\\/g, '/').replace(/^public\//, '');
  const coverPhotoPath = (req.files as { [fieldname: string]: Express.Multer.File[] })['file'][0].path.replace(/\\/g, '/').replace(/^public\//, '');

  req.body.photoPath = photoPath;
  req.body.coverPhotoPath = coverPhotoPath;


    // Validation schema for the request body
    const eventSchema = Joi.object({
      universityName: Joi.string().required().messages({
          'any.required': 'University name is required boy.',
        }),
        universityAddress: Joi.string().required().messages({
            'any.required': 'University address is required.',
        }),
        universityAbout: Joi.string().required().messages({
            'any.required': 'University about is required.',
        }),
        universityEmail: Joi.string().email().required().messages({
          'string.email': 'Please enter a valid event email address.',
          'any.required': 'Email is required.',
        }),
      });


    // Create a new object containing only the selected fields
    const selectedFields = { universityName, universityAddress, universityAbout, universityEmail };

  
    //   const { error, value } = eventSchema.validate(req.body);
    const { error, value } = eventSchema.validate(selectedFields);

      // Check for validation errors
      if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
      }
  
    const createEventResponse = await University.createUniversity(DatabaseConnectionManager.getInstance().getPool(), req.body);

    if (createEventResponse.status === true) {
        res.status(200).json({ status: createEventResponse.status, message: createEventResponse.message, data: createEventResponse.data });
    } 
    else {
      // Use fs.unlink to delete each file
      fs.unlink(`public/${photoPath}`, (err1:any) => {
        if (err1) {
        console.error('Error deleting photo:', err1);
        // Handle the error for file1 as needed
        } else {
        console.log('Photo deleted successfully');
    
            // Proceed to delete file2
            fs.unlink( `public/${coverPhotoPath}`, (err2:any) => {
                if (err2) {
                console.error('Error deleting cover photo:', err2);
                // Handle the error for file2 as needed
                } else {
                console.log('Cover Photo deleted successfully');
                }
            });
        }
      });
      logger.info(`${{ status: createEventResponse.status, message: createEventResponse.message }}`);
      res.status(200).json({ status: createEventResponse.status, message: createEventResponse.message });
    }
    
}

 
}

export default new UniversityController();