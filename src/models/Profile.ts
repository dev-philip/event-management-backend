// models/User.ts
import { Connection, ResultSetHeader } from "mysql2/promise";
import logger from "../utils/logger";

class Profile {


  
  static async getRole(
    connection: Connection
  ): Promise<number | null> {
      try {
        const result: any = await connection.execute( 
          ` SELECT role_id, role_name FROM Roles`);
    
        if (result && result.length > 0) {
          return result[0];
        } else {
          logger.error('Error fetching user by id');
          return null;
        }
      } catch (error) {
        logger.error('Error fetching user by id:', error);
        return null;
      }
  }

    static async getProfileById(
        connection: Connection, id: string
      ): Promise<number | null> {
          try {
            const result: any = await connection.execute( 
              ` SELECT 
              p.user_id, 
              p.firstName AS user_firstName, 
              p.lastName AS user_lastName, 
              p.email AS user_email, 
              p.about, 
              p.uni_id,
              p.profile_photo, 
              COALESCE(u.name, 'No university') AS name,
              r.role_name AS user_level 
              FROM 
                  Users p 
              JOIN 
                  Roles r ON p.role_id = r.role_id 
              LEFT JOIN 
                  University u ON p.uni_id = u.uni_id
              WHERE 
                  p.user_id = ?;
              `, [id]);
        
            if (result && result.length > 0) {
              return result[0];
            } else {
              logger.error('Error fetching user by id');
              return null;
            }
          } catch (error) {
            logger.error('Error fetching user by id:', error);
            return null;
          }
      }

      static async getAllUserBySchool(
        connection: Connection, uni_Id: string
      ): Promise<number | null> {
          try {
            const result: any = await connection.execute( 
              ` SELECT 
                      p.user_id,
                      p.firstName AS user_firstName,
                      p.lastName AS user_lastName,
                      p.email AS user_email,
                      p.about,
                      p.profile_photo,
                      u.name AS university
                  FROM 
                      Users p
                  JOIN 
                      University u ON p.uni_id = u.uni_id
                  WHERE 
                      p.uni_id = ?;
              `, [uni_Id]);
        
            if (result && result.length > 0) {
              return result[0];
            } else {
              logger.error('Error fetching User by university');
              return null;
            }
          } catch (error) {
            logger.error('Error fetching User by university:', error);
            return null;
          }
      }

    static async updateProfile(
        connection: Connection, profileData: any
      ): Promise<{status: boolean, message: any, data?: any}> {
          try {
             // Check if the university already exists
             
              const sql = `UPDATE Users SET about = ? , profile_photo = ? WHERE user_id = ?`;


              const values = [
                profileData.profileAbout,
                profileData.photoPath,
                profileData.user_id,
              ];

             const result:any =  await connection.execute(sql, values);
        
             if (result && result.length > 0) {
                // return result[0].insertId;
                return {
                  status: true,
                  message: "Profile updated successfully",
                  data: result[0].insertId
                };
              } else {
                logger.error('Error updating Profile: No result or empty result array');
                return {
                  status: false,
                  message: "Error updating Profile: No result or empty result array"
                };
              }
          } catch (error: any) {
            logger.error('Error updating Profile:', error);
            return {
                status: false,
                message: error.message
              };
          }
      }
}

export default Profile;
