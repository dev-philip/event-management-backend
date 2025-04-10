// models/User.ts
import { Connection, ResultSetHeader } from "mysql2/promise";
import logger from "../utils/logger";

class Event {

  static async getEventCommentById(
    connection: Connection, event_id: string
  ): Promise<number | null> {
      try {
        const result: any = await connection.execute( 
          ` SELECT 
                c.comment_id,
                c.user_id,
                c.event_id,
                c.comment_text,
                c.rating,
                c.created_at,
                c.updated_at,
                u.firstName,
                u.lastName
            FROM 
                Comment c
            JOIN 
                Users u ON c.user_id = u.user_id
            WHERE 
              event_id = ? ORDER BY updated_at DESC`, [event_id]
          
          );
    
        if (result && result.length > 0) {
          return result[0];
        } else {
          logger.error('Error fetching Comment');
          return null;
        }
      } catch (error) {
        logger.error('Error fetching Comment:', error);
        return null;
      }
  }


    static async getAllEventCategory(
      connection: Connection
    ): Promise<number | null> {
        try {
          const result: any = await connection.execute( 
            `SELECT category_id, name FROM Category`
            );
      
          if (result && result.length > 0) {
            return result[0];
          } else {
            logger.error('Error fetching Category');
            return null;
          }
        } catch (error) {
          logger.error('Error fetching Category:', error);
          return null;
        }
    }

   

    


    static async getAllVisibility(
      connection: Connection
    ): Promise<number | null> {
        try {
          const result: any = await connection.execute( 
            `SELECT visibility_id, name FROM  Visibility`
            );
      
          if (result && result.length > 0) {
            return result[0];
          } else {
            logger.error('Error fetching  Visibility');
            return null;
          }
        } catch (error) {
          logger.error('Error fetching  Visibility:', error);
          return null;
        }
    }
    

    static async getAllEventTime(
      connection: Connection
    ): Promise<number | null> {
        try {
          const result: any = await connection.execute( 
            `SELECT schedule_id, event_time FROM Event_Schedule`
            );
      
          if (result && result.length > 0) {
            return result[0];
          } else {
            logger.error('Error fetching Event_Schedule');
            return null;
          }
        } catch (error) {
          logger.error('Error fetching Event_Schedule:', error);
          return null;
        }
    }
    

    static async getEventById(
        connection: Connection, id: string
      ): Promise<number | null> {
          try {
              const result: any = await connection.execute( 
                ` SELECT 
                        e.event_id,
                        e.name AS event_name,
                        e.about,
                        e.description,
                        e.event_date,
                        e.start_time,
                        e.end_time,
                        e.contact_name,
                        e.contact_phone,
                        e.contact_email,
                        e.location_name,
                        e.latitude,
                        e.longitude,
                        e.visibility_id,
                        e.admin_id,
                        e.created_at,
                        e.updated_at,
                        e.street_address,
                        e.city,
                        e.state,
                        e.zip_code,
                        e.additional_info,
                        c.name AS category_name
                    FROM 
                        Event e
                    JOIN 
                        Category c ON e.category_id = c.category_id
                    WHERE 
                        e.event_id = ?;
                `, [id]);
              
        
            if (result && result.length > 0) {
              return result[0];
            } else {
              logger.error('Error fetching Events');
              return null;
            }
          } catch (error) {
            logger.error('Error fetching Event:', error);
            return null;
          }
      }

    

    static async getAllEvent(
        connection: Connection
      ): Promise<number | null> {
          try {
            const result: any = await connection.execute( 
              `  
                  SELECT 
                      e.event_id,
                      e.name AS event_name,
                      e.about,
                      e.description,
                      e.event_date,
                      e.start_time,
                      e.end_time,
                      e.contact_name,
                      e.contact_phone,
                      e.contact_email,
                      e.location_name,
                      e.latitude,
                      e.longitude,
                      e.visibility_id,
                      v.name AS visibility,  
                      e.admin_id,
                      u.uni_id,
                      e.created_at,
                      e.updated_at,
                      e.street_address,
                      e.city,
                      e.rso_id,
                      e.state,
                      e.zip_code,
                      e.additional_info,
                      c.name AS category_name
                  FROM 
                      Event e
                  JOIN 
                      Category c ON e.category_id = c.category_id
                  JOIN
                      Users u ON e.admin_id = u.user_id 
                  JOIN
                      Visibility v ON e.visibility_id = v.visibility_id
                  ORDER BY e.event_date DESC;  
              `
              );
        
            if (result && result.length > 0) {
              return result[0];
            } else {
              logger.error('Error fetching Events');
              return null;
            }
          } catch (error) {
            logger.error('Error fetching Event:', error);
            return null;
          }
      }

    


  static async createEvent(
      connection: Connection, eventData: any
    ): Promise<{status: boolean, message: any, data?: any}> {
        try {
          // const result: any = await connection.execute( 
          //   `SELECT name FROM Event`
          //   );

          if(eventData.rso_id == ""){
            eventData.rso_id = null
          }

            const sql = `INSERT INTO Event 
            (name, about, description, event_date, start_time, 
              category_id, contact_name, contact_phone, contact_email, location_name, 
              latitude, longitude, visibility_id, admin_id, end_time, street_address, city, state, zip_code, additional_info, rso_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;


            const values = [
              eventData.eventName,
              eventData.eventAbout,
              eventData.eventDescription,
              eventData.eventDateWithPicker,
              eventData.eventStartTime,
              eventData.eventCategory,
              eventData.eventContactName,
              eventData.eventContactPhone,
              eventData.eventEmail,
              eventData.eventLocationName,
              eventData.lat,
              eventData.Lng,
              eventData.eventVisibility,
              eventData.admin_id,
              eventData.eventEndTime,
              eventData.eventAddress,
              eventData.eventCity,
              eventData.eventState,
              eventData.eventZipCode,
              eventData.additionalInfo,
              eventData.rso_id,
            ];

            const result:any =  await connection.execute(sql, values);
      
            if (result && result.length > 0) {
              // return result[0].insertId;
              return {
                status: true,
                message: "Event created successfully",
                data: result[0].insertId
              };
            } else {
              logger.error('Error creating Event: No result or empty result array');
              return {
                status: false,
                message: "Error creating Event: No result or empty result array"
              };
            }
        } catch (error:any) {
          logger.error('Error creating event:', error);
          return {
              status: false,
              message: error.message
            };
        }
    }


    static async deleteComment(
      connection: Connection, comment_id: any
    ): Promise<{status: boolean, message: any, data?: any}> {
        try {
            const sql = `DELETE FROM Comment WHERE comment_id =  ?`;

            const values = [
              comment_id
            ];
  
            const result:any =  await connection.execute(sql, values);
      
            if (result && result.length > 0) {
              // return result[0].insertId;
              //  await connection.execute(`UPDATE Event SET comment_id = ?`, [commentData.event_id]);
              return {
                status: true,
                message: "Comment deleted successfully",
                data: result[0].insertId
              };
            } else {
              logger.error('Error deleting Comment: No result or empty result array');
              return {
                status: false,
                message: "Error deleting Comment: No result or empty result array"
              };
            }
        } catch (error: any) {
          logger.error('Error deleting Comment:', error);
          return {
              status: false,
              message: error.message
            };
        }
    }


    static async updateComment(
      connection: Connection, commentData: any
    ): Promise<{status: boolean, message: any, data?: any}> {
        try {
            const sql = `UPDATE Comment SET rating = ?, comment_text = ? WHERE comment_id = ?`;

            const values = [
              commentData.rating,
              commentData.comment_text,
              commentData.comment_id 
            ];
  
            const result:any =  await connection.execute(sql, values);
      
            if (result && result.length > 0) {
              // return result[0].insertId;
              //  await connection.execute(`UPDATE Event SET comment_id = ?`, [commentData.event_id]);
              return {
                status: true,
                message: "Comment updated successfully",
                data: result[0].insertId
              };
            } else {
              logger.error('Error updating Comment: No result or empty result array');
              return {
                status: false,
                message: "Error updating Comment: No result or empty result array"
              };
            }
        } catch (error: any) {
          logger.error('Error updating Comment:', error);
          return {
              status: false,
              message: error.message
            };
        }
    }

  static async checkIfUserHavePostedComment(
      connection: Connection, commentData: any
    ): Promise<{user_id:number|string}[] | null> {
        try {
            const sql = `SELECT user_id FROM Comment WHERE user_id = ? AND event_id = ?`;
  
  
            const values = [
              commentData.user_id,
              commentData.event_id,
            ];
  
            const result:any =  await connection.execute(sql, values);
      
            if (result && result[0].length > 0) { //query successfully ran
              return result[0];
            } else {
              logger.error("User have Posted comment on this event before. No result or empty result array");
              return null;
            }
        } catch (error) {
          logger.error("User have Posted comment on this event before", error);
          return null;
        }
    }
  

  static async createComment(
    connection: Connection, commentData: any
  ): Promise<{status: boolean, message: any, data?: any}> {
      try {
          const sql = `INSERT INTO Comment 
           (user_id, event_id, comment_text, rating)
          VALUES (?, ?, ?, ?)`;


          const values = [
            commentData.user_id,
            commentData.event_id,
            commentData.comment_text,
            commentData.rating,
          ];

          const result:any =  await connection.execute(sql, values);
    
          if (result && result.length > 0) {
            // return result[0].insertId;
            //  await connection.execute(`UPDATE Event SET comment_id = ?`, [commentData.event_id]);
            return {
              status: true,
              message: "Comment created successfully",
              data: result[0].insertId
            };
          } else {
            logger.error('Error creating Comment: No result or empty result array');
            return {
              status: false,
              message: "Error creating Comment: No result or empty result array"
            };
          }
      } catch (error:any) {
        logger.error('Error creating Comment:', error);
        return {
            status: false,
            message: error.message
          };
      }
  }

      
}

export default Event;
