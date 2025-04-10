import { Request, Response } from 'express';
import logger from '../utils/logger';
import DatabaseConnectionManager from '../config/databaseConnectionManager';
import Joi from 'joi';
import { generateTokens } from "../utils/VerifyToken";
import moment from 'moment';

import * as fs from 'fs';
import * as fsPromises from 'fs/promises';
import Profile from '../models/Profile';

class ProfileController {

async getProfileById(req: Request, res: Response): Promise<void> {
  const profileId = req.params.id;
  const profileResponse = await Profile.getProfileById(DatabaseConnectionManager.getInstance().getPool(), profileId);

  if (profileResponse !== null) {
      const user = profileResponse;
    res.status(200).json({user});
  } else {
    res.status(500).json({ error: 'Failed to fetch Profile alone (controller)' });
  }
  
}

async getAllUserBySchool(req: Request, res: Response): Promise<void> {
  const uniId = req.params.id;
  const profileResponse = await Profile.getAllUserBySchool(DatabaseConnectionManager.getInstance().getPool(), uniId);

  if (profileResponse !== null) {
      const user = profileResponse;
    res.status(200).json({user});
  } else {
    res.status(500).json({ error: 'Failed to fetch User by School alone (controller)' });
  }
  
}



  
async updateProfile(req: Request, res: Response): Promise<void> {

    const { 
      user_id, profileAbout, ...extraFields
    } = req.body;

    //Check if there are any extra fields
    if (Object.keys(extraFields).length > 0) {
      res.status(400).json({ error: 'Invalid data passed to the request body' });
      return;
    }

    
    let photoPath;

    if (req.files && Object.keys(req.files).length > 0) { //if there is a file
       photoPath = (req.files as { [fieldname: string]: Express.Multer.File[] })['file'][0].path.replace(/\\/g, '/').replace(/^public\//, '');
      req.body.photoPath = photoPath;
    }else{
      req.body.photoPath = null;
    }

     

    const updateProfile = await Profile.updateProfile(DatabaseConnectionManager.getInstance().getPool(), req.body);

    if (updateProfile.status === true) {
        res.status(200).json({ status: updateProfile.status, message: updateProfile.message, data: updateProfile.data });
    } 
    else {
      if (req.files && Object.keys(req.files).length > 0) {
         // Use fs.unlink to delete each file
          fs.unlink(`public/${photoPath}`, (err1:any) => {
            if (err1) {
            console.error('Error deleting photo:', err1);
            // Handle the error for file1 as needed
            } 
          });
      }
     
      logger.info(`${{ status: updateProfile.status, message: updateProfile.message }}`);
      res.status(200).json({ status: updateProfile.status, message: updateProfile.message });
    }
    
}


async getRole(req: Request, res: Response): Promise<void> {
  const roleResponse = await Profile.getRole(DatabaseConnectionManager.getInstance().getPool());

  if (roleResponse !== null) {
      const roles = roleResponse;
    res.status(200).json({roles});
  } else {
    res.status(500).json({ error: 'Failed to fetch Profile alone (controller)' });
  }
  
}

}

export default new ProfileController();