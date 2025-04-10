import { Request, Response } from 'express';
import logger from '../utils/logger';
import DatabaseConnectionManager from '../config/databaseConnectionManager';
import RSO from '../models/Rso';
import bcrypt from "bcrypt";
import Joi from 'joi';
import { generateTokens } from "../utils/VerifyToken";
import moment from 'moment';
import * as fs from 'fs';
import * as fsPromises from 'fs/promises';

class RsoController {


  async getRsoBySchool(req: Request, res: Response): Promise<void> {
    const uni_id = req.params.id;
    const rsoGroupBySchool = await RSO.getRsoBySchool(DatabaseConnectionManager.getInstance().getPool(), uni_id);

    if (rsoGroupBySchool !== null) {
      res.status(200).json({ rsoGroupBySchool });
    } else {
      res.status(500).json({ error: 'Failed to fetch RSO by School (controller)' });
    }
    
}

async getRsoMembersById(req: Request, res: Response): Promise<void> {
  const user_id = req.params.id;
  const rsoGroupMemberById = await RSO.getRsoMembersById(DatabaseConnectionManager.getInstance().getPool(), user_id);

  if (rsoGroupMemberById !== null) {
    res.status(200).json({ rsoGroupMemberById });
  } else {
    res.status(500).json({ error: 'Failed to fetch RSO MEmber By ID (controller)' });
  }
  
}

async getRsoMembers(req: Request, res: Response): Promise<void> {
  const rsoGroupMembers = await RSO.getRsoMembers(DatabaseConnectionManager.getInstance().getPool());

  if (rsoGroupMembers !== null) {
    res.status(200).json({ rsoGroupMembers });
  } else {
    res.status(500).json({ error: 'Failed to fetch ALL RSO Member (controller)' });
  }
  
}

async getRsoById(req: Request, res: Response): Promise<void> {
    const admin_id = req.params.id;
    const rsoGroupByAdmin = await RSO.getRsoById(DatabaseConnectionManager.getInstance().getPool(), admin_id);

    if (rsoGroupByAdmin !== null) {
      res.status(200).json({ rsoGroupByAdmin });
    } else {
      res.status(500).json({ error: 'Failed to fetch Category (controller)' });
    }
    
}

async createRso(req: Request, res: Response): Promise<void> {
  const { 
    admin_id, uni_id, rsoName, rsoAbout, ContactEmail, ContactPhone, Members, ...extraFields
  } = req.body;

  //Check if there are any extra fields
  if (Object.keys(extraFields).length > 0) {
    res.status(400).json({ error: 'Invalid data passed to the request body' });
    return;
  }

  const photoPath = (req.files as { [fieldname: string]: Express.Multer.File[] })['file'][0].path.replace(/\\/g, '/').replace(/^public\//, '');
  const coverPhotoPath = (req.files as { [fieldname: string]: Express.Multer.File[] })['file2'][0].path.replace(/\\/g, '/').replace(/^public\//, '');

  req.body.photoPath = photoPath;
  req.body.coverPhotoPath = coverPhotoPath;

  // Validation schema for the request body
  const rsoSchema = Joi.object({
      rsoName: Joi.string().required().messages({
        'any.required': 'Event name is required boy.',
      }),
      rsoAbout: Joi.string().required().messages({
          'any.required': 'Event address is required.',
      }),
      ContactPhone: Joi.string().required().messages({
          'any.required': 'Event about is required.',
      }),
      ContactEmail: Joi.string().email().required().messages({
        'string.email': 'Please enter a valid event email address.',
        'any.required': 'Email is required.',
      }),
    });


  // Create a new object containing only the selected fields
  const selectedFields = { rsoName, rsoAbout, ContactPhone, ContactEmail };


  //   const { error, value } = eventSchema.validate(req.body);
  const { error, value } = rsoSchema.validate(selectedFields);

    

    // Check for validation errors
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

  const createRsoResponse = await RSO.createRso(DatabaseConnectionManager.getInstance().getPool(), req.body);

  if (createRsoResponse.status === true) {
      res.status(200).json({ status: createRsoResponse.status, message: createRsoResponse.message, data: createRsoResponse.data });
  } 
  else {
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
  logger.info(`${{ status: createRsoResponse.status, message: createRsoResponse.message }}`);
  res.status(200).json({ status: createRsoResponse.status, message: createRsoResponse.message });
  }
  
}



async joinRsoGroup(req: Request, res: Response): Promise<void> {

  
  const joinRsoResponse = await RSO.joinRsoGroup(DatabaseConnectionManager.getInstance().getPool(), req.body);

  if (joinRsoResponse.status === true) {
      res.status(200).json({ status: joinRsoResponse.status, message: joinRsoResponse.message, data: joinRsoResponse.data });
  } 
  else {

  logger.info(`${{ status: joinRsoResponse.status, message: joinRsoResponse.message }}`);
  res.status(200).json({ status: joinRsoResponse.status, message: joinRsoResponse.message });
  }
  
}



async leaveRsoGroup(req: Request, res: Response): Promise<void> {

const leaveRsoResponse = await RSO.leaveRsoGroup(DatabaseConnectionManager.getInstance().getPool(), req.body);

if (leaveRsoResponse.status === true) {
    res.status(200).json({ status: leaveRsoResponse.status, message: leaveRsoResponse.message, data: leaveRsoResponse.data });
} 
else {
 
logger.info(`${{ status: leaveRsoResponse.status, message: leaveRsoResponse.message }}`);
res.status(200).json({ status: leaveRsoResponse.status, message: leaveRsoResponse.message });
}

}

 
}

export default new RsoController();