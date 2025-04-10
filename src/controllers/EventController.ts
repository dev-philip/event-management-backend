import { Request, Response } from 'express';
import logger from '../utils/logger';
import DatabaseConnectionManager from '../config/databaseConnectionManager';
import Event from '../models/Event';
import bcrypt from "bcrypt";
import Joi from 'joi';
import { generateTokens } from "../utils/VerifyToken";
import moment from 'moment';

class EventController {

 

async getCommentsForAEvent(req: Request, res: Response): Promise<void> {
  const event_id = req.params.id;
  const eventComments = await Event.getEventCommentById(DatabaseConnectionManager.getInstance().getPool(), event_id);

  if (eventComments !== null) {
    res.status(200).json({ eventComments });
  } else {
    res.status(500).json({ error: 'Failed to fetch EventComment (controller)' });
  }
  
}


async updateComment(req: Request, res: Response): Promise<void> {
  const { 
     comment_id, user_id, event_id, comment_text, rating, ...extraFields
  } = req.body;

  // Check if there are any extra fields
  if (Object.keys(extraFields).length > 0) {
    res.status(400).json({ error: 'Invalid data passed to the request body' });
    return;
  }

  // Validation schema for the request body
  const commentSchema = Joi.object({
     user_id: Joi.number().required().messages({
        'any.required': 'user_id is required boy.',
      }),
      event_id: Joi.number().required().messages({
          'any.required': 'event_id is required.',
      }),
      comment_text: Joi.string().required().messages({
          'any.required': 'comment_text is required.',
      }),
      rating: Joi.number().required().messages({
        'any.required': 'rating is required.',
      })
    });


  // Create a new object containing only the selected fields
  const selectedFields = { user_id, event_id, comment_text, rating };


  //   const { error, value } = eventSchema.validate(req.body);
  const { error, value } = commentSchema.validate(selectedFields);

    

    // Check for validation errors
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

  const commentResponse = await Event.updateComment(DatabaseConnectionManager.getInstance().getPool(), req.body);

  if (commentResponse.status === true) {
      res.status(200).json({ status: commentResponse.status, message: commentResponse.message, data: commentResponse.data });
  } 
  else {
  res.status(200).json({ status: commentResponse.status, message: commentResponse.message });
  }
  
}

async createComment(req: Request, res: Response): Promise<void> {
  const { 
     user_id, event_id, comment_text, rating, ...extraFields
  } = req.body;

  //Check if there are any extra fields
  if (Object.keys(extraFields).length > 0) {
    res.status(400).json({ error: 'Invalid data passed to the request body' });
    return;
  }

  // Validation schema for the request body
  const commentSchema = Joi.object({
     user_id: Joi.number().required().messages({
        'any.required': 'user_id is required boy.',
      }),
      event_id: Joi.number().required().messages({
          'any.required': 'event_id is required.',
      }),
      comment_text: Joi.string().required().messages({
          'any.required': 'comment_text is required.',
      }),
      rating: Joi.number().required().messages({
        'any.required': 'rating is required.',
      })
    });


  // Create a new object containing only the selected fields
  const selectedFields = { user_id, event_id, comment_text, rating };


  //   const { error, value } = eventSchema.validate(req.body);
  const { error, value } = commentSchema.validate(selectedFields);

    

    // Check for validation errors
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    const checkIfUserHavePostedComment: {user_id:number|string}[] | null
     = await Event.checkIfUserHavePostedComment(DatabaseConnectionManager.getInstance().getPool(), req.body);

    if (checkIfUserHavePostedComment !=null) { //The user have posted comment before
      res.status(200).json({status: false, message: "You cannot post more than one comment on an event." });
      return;
    }

  const commentResponse = await Event.createComment(DatabaseConnectionManager.getInstance().getPool(), req.body);

  if (commentResponse.status === true) {
      res.status(200).json({ status: commentResponse.status, message: commentResponse.message, data: commentResponse.data });
  } 
  else {
  res.status(200).json({ status: commentResponse.status, message: commentResponse.message });
  }
  
}


async getAllEventCategory(req: Request, res: Response): Promise<void> {
    const eventCategory = await Event.getAllEventCategory(DatabaseConnectionManager.getInstance().getPool());

    if (eventCategory !== null) {
      res.status(200).json({ eventCategory });
    } else {
      res.status(500).json({ error: 'Failed to fetch Category (controller)' });
    }
    
}


async getAllVisibility(req: Request, res: Response): Promise<void> {
  const visibilityResponse = await Event.getAllVisibility(DatabaseConnectionManager.getInstance().getPool());

  if (visibilityResponse !== null) {
    res.status(200).json({ visibilityResponse });
  } else {
    res.status(500).json({ error: 'Failed to fetch Visibility (controller)' });
  }
  
}

async getAllEventTime(req: Request, res: Response): Promise<void> {
  const eventTimeResponse = await Event.getAllEventTime(DatabaseConnectionManager.getInstance().getPool());

  if (eventTimeResponse !== null) {
    res.status(200).json({ eventTimeResponse });
  } else {
    res.status(500).json({ error: 'Failed to fetch eventTime (controller)' });
  }
  
}



async getAllEvent(req: Request, res: Response): Promise<void> {
    const eventResponse = await Event.getAllEvent(DatabaseConnectionManager.getInstance().getPool());

    if (eventResponse !== null) {
        const events = eventResponse;
      res.status(200).json({ events });
    } else {
      res.status(500).json({ error: 'Failed to fetch Events (controller)' });
    }
    
}


async getEventById(req: Request, res: Response): Promise<void> {
    const eventId = req.params.id;
    const eventResponse = await Event.getEventById(DatabaseConnectionManager.getInstance().getPool(), eventId);

    if (eventResponse !== null) {
        const event = eventResponse;
      res.status(200).json({ event });
    } else {
      res.status(500).json({ error: 'Failed to fetch Event alone (controller)' });
    }
    
}




async createEvent(req: Request, res: Response): Promise<void> {
    const { 
        eventName, eventAbout, eventDescription, eventLocationName, eventAddress, eventCity, eventState, eventZipCode,
        eventCategory, eventVisibility, eventDateWithPicker, eventStartTime, eventEndTime, eventEmail, eventContactName,
        eventContactPhone, additionalInfo, lat, Lng, geocode, admin_id,rso_id, ...extraFields
    } = req.body;

    //Check if there are any extra fields
    if (Object.keys(extraFields).length > 0) {
      console.log(extraFields);
      res.status(400).json({ error: 'Invalid data passed to the request body : ' +  extraFields});
      return;
    }

    // Validation schema for the request body
    const eventSchema = Joi.object({
        eventName: Joi.string().required().messages({
          'any.required': 'Event name is required boy.',
        }),
        eventAddress: Joi.string().required().messages({
            'any.required': 'Event address is required.',
        }),
        eventAbout: Joi.string().required().messages({
            'any.required': 'Event about is required.',
        }),
        eventDescription: Joi.string().required().messages({
          'any.required': 'Event description is required.',
        }),
        eventEmail: Joi.string().email().required().messages({
          'string.email': 'Please enter a valid event email address.',
          'any.required': 'Email is required.',
        }),
      });


    // Create a new object containing only the selected fields
    const selectedFields = { eventName, eventAddress, eventAbout, eventDescription, eventEmail };

  
    //   const { error, value } = eventSchema.validate(req.body);
    const { error, value } = eventSchema.validate(selectedFields);

      
  
      // Check for validation errors
      if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
      }
  
    const createEventResponse = await Event.createEvent(DatabaseConnectionManager.getInstance().getPool(), req.body);

    if (createEventResponse.status === true) {
        res.status(200).json({ status: createEventResponse.status, message: createEventResponse.message, data: createEventResponse.data });
    } 
    else {
    res.status(200).json({ status: createEventResponse.status, message: createEventResponse.message });
    }
    
}



async deleteComment(req: Request, res: Response): Promise<void> {
  const comment_id = req.params.id;

  //Check if there are any extra fields
  if (comment_id == "") {
    res.status(400).json({ error: 'Invalid data passed to the url string' });
    return;
  }

  const deleteCommentResponse = await Event.deleteComment(DatabaseConnectionManager.getInstance().getPool(), comment_id);

  if (deleteCommentResponse.status === true) {
      res.status(200).json({ status: deleteCommentResponse.status, message: deleteCommentResponse.message, data: deleteCommentResponse.data });
  } 
  else {
  res.status(200).json({ status: deleteCommentResponse.status, message: deleteCommentResponse.message });
  }
  
}


 
}

export default new EventController();