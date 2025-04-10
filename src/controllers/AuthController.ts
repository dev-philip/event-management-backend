import { Request, Response } from 'express';
import logger from '../utils/logger';
import DatabaseConnectionManager from '../config/databaseConnectionManager';
import User from '../models/User';
import bcrypt from "bcrypt";
import Joi from 'joi';
import { generateTokens } from "../utils/VerifyToken";
import moment from 'moment';

class AuthController {

  

  async createUser(req: Request, res: Response): Promise<void> {
    const { firstName, lastName, email, password, userRole, userUniversity, ...extraFields } = req.body;

    // Check if there are any extra fields
    if (Object.keys(extraFields).length > 0) {
      res.status(400).json({ error: 'Invalid data passed to the request body' });
      return;
    }

    // Validation schema for the request body
    const registerSchema = Joi.object({
      firstName: Joi.string().required().messages({
        'any.required': 'Firstname is required boy.',
      }),
      lastName: Joi.string().required().messages({
        'any.required': 'Lastname is required.',
      }),
      email: Joi.string().email().required().messages({
        'string.email': 'Please enter a valid email address.',
        'any.required': 'Email is required.',
      }),
      password: Joi.string().required().messages({
        'any.required': 'Password is required.',
      }),
      userRole: Joi.number().required().messages({
        'any.required': 'Role is required.',
      }),
      userUniversity: Joi.required().messages({
        'any.required': 'University is required.',
      }),
    });

    const reqToValidate = {firstName, lastName, email, password, userRole, userUniversity }
    const { error, value } = registerSchema.validate(reqToValidate);

    // Check for validation errors
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    const UserResponse = await User.create(DatabaseConnectionManager.getInstance().getPool(), firstName.toLowerCase(), lastName.toLowerCase(), email.toLowerCase(),  password, userRole, userUniversity  );

    if (UserResponse.status === true) {
      res.status(200).json({ status: UserResponse.status, message: UserResponse.message, data: UserResponse.data });
    } 
    else {
      res.status(200).json({ status: UserResponse.status, message: UserResponse.message });
    }
  }

  async logInUser(req: Request, res: Response): Promise<void> {
    const { email, password, ...extraFields } = req.body;

    // Check if there are any extra fields
    if (Object.keys(extraFields).length > 0) {
      res.status(400).json({ error: 'Invalid data passed to the request body' });
      return;
    }

    // Validation schema for the request body
    const loginSchema = Joi.object({
      email: Joi.string().email().required().messages({
        'string.email': 'Please enter a valid email address.',
        'any.required': 'Email is required.',
      }),
      password: Joi.string().required().messages({
        'any.required': 'Password is required.',
      }),
    });

    const { error, value } = loginSchema.validate(req.body);

    // Check for validation errors
    if (error) {
      res.status(200).json({status: false, message: error.details[0].message });
      return;
    }

    const getUserByEmail: {user_id:number, firstName:string, lastName:string, email: string, password:string, uni_id: string, user_level:string, created_at:string, updated_at:string}[] | null
     = await User.getUserByEmail(DatabaseConnectionManager.getInstance().getPool(), email);

    if (getUserByEmail === null) { //invalid email
      res.status(200).json({status: false, message: "Invalid email or password" });
      return;
    }

    //check for password now
    try {
      // Use bcrypt to compare the provided password with the stored hashed password
      const passwordCheck = await bcrypt.compare(password, getUserByEmail[0].password);
  
      if (passwordCheck) { // Passwords match
          // If authentication is successful, generate a JWT
          const user = {
            firstName: getUserByEmail[0].firstName, 
            lastName: getUserByEmail[0].lastName, 
            email: email,
            uni_Id: getUserByEmail[0].uni_id,
            user_id: getUserByEmail[0].user_id,
            user_level: getUserByEmail[0].user_level,
            created_at: getUserByEmail[0].created_at,
            updated_at: getUserByEmail[0].updated_at
         }
          const token = generateTokens(user);

          res.json({ 
            status: true,
            message: "Login Successful",
            time: moment().format('YYYY-MM-DD h:mm:ss a'),
            // user: getUserByEmail[0],
            token 
          });
      } else {
        // Passwords do not match
        res.status(200).json({ status: false, message: 'Invalid email or password' });
      }
    } catch (error) {
      // Handle bcrypt error
      logger.error('Error comparing passwords:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

async getallUsers(req: Request, res: Response): Promise<void> {
    const Users = await User.getAllUsers(DatabaseConnectionManager.getInstance().getPool());

    if (Users !== null) {
      res.status(200).json({ Users });
    } else {
      res.status(500).json({ error: 'Failed to fetch admin users' });
    }
    
}

 
}

export default new AuthController();