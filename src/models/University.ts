// models/User.ts
import { Connection, ResultSetHeader } from "mysql2/promise";
import logger from "../utils/logger";

class University {

  
  static async getAllUni(
    connection: Connection
  ): Promise<number | null> {
      try {
        const result: any = await connection.execute( 
          `SELECT uni_id, name FROM University`);
    
        if (result && result.length > 0) {
          return result[0];
        } else {
          logger.error('Error fetching University');
          return null;
        }
      } catch (error) {
        logger.error('Error fetching University:', error);
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
    
    static async getEventById(
        connection: Connection, id: string
      ): Promise<number | null> {
          try {
            const result: any = await connection.execute( 
              `SELECT * FROM Event where event_id = ?`, [id]
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

    

    static async getAllEvent(
        connection: Connection
      ): Promise<number | null> {
          try {
            const result: any = await connection.execute( 
              `SELECT * FROM Event`
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

    


    static async createUniversity(
        connection: Connection, universityData: any
      ): Promise<{status: boolean, message: any, data?: any}> {

          try {
             // Check if the university already exists
             const checkIfUniversityExist: any = await connection.execute(
                  `SELECT name, email FROM University WHERE name = ? OR email = ?`,
                  [universityData.universityName, universityData.universityEmail]
              );
          
              if (checkIfUniversityExist && checkIfUniversityExist[0].length > 0) {
                  // University with the provided name already exists, handle accordingly
                  logger.error('This University already exists');
                  return {
                      status: false,
                      message: "This University already exists"
                  }; // Close the object and the return statement with a semicolon
              }

              const sql = `INSERT INTO University 
              (name, about, email, phone_number, lat, lng, admin_id, address, city, state, zipCode, additionalInfo, photo, cover_photo, geocode)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;


              const values = [
                universityData.universityName,
                universityData.universityAbout,
                universityData.universityEmail,
                universityData.universityNumber,
                universityData.lat,
                universityData.Lng,
                universityData.admin_id,
                universityData.universityAddress,
                universityData.universityCity,
                universityData.universityState,
                universityData.universityZipCode,
                universityData.additionalInfo,
                universityData.photoPath,
                universityData.coverPhotoPath,
                universityData.geocode,
              ];

             const result:any =  await connection.execute(sql, values);
        
             if (result && result.length > 0) {
                // return result[0].insertId;
                 const updateUserUni = await connection.execute(`UPDATE Users SET uni_id = ? WHERE user_id = ?`, [result[0].insertId,universityData.admin_id]);

                 if (updateUserUni && updateUserUni.length > 0) {
                    return {
                      status: true,
                      message: "University created successfully",
                      data: result[0].insertId
                    };
                } else {
                  logger.error('Error creating University: because of I was not able to update the user');
                  return {
                    status: false,
                    message: "Error creating University: because of I was not able to update the user"
                  };
                }
               
              } else {
                logger.error('Error creating University: No result or empty result array');
                return {
                  status: false,
                  message: "Error creating University: No result or empty result array"
                };
              }
          } catch (error:any) {
            logger.error('Error creating University:', error);
            return {
                status: false,
                message: error.message
              };
          }
      }
}

export default University;
