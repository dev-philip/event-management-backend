// models/User.ts
import { Connection, ResultSetHeader } from "mysql2/promise";
import logger from "../utils/logger";
import bcrypt from "bcrypt";

class User {

  static async getUserByEmail(
    connection: Connection,
    email: string,
  ): Promise<{user_id:number, firstName:string, lastName:string, uni_id: string, email: string, password:string, user_level:string, created_at:string, updated_at:string}[] | null> {
      try {

        // const result: any = await connection.execute(
        //   `SELECT user_id, firstName, lastName, email, password, user_level, created_at, updated_at FROM Users WHERE email = ?`,
        //   [email]
        // );

        const result: any = await connection.execute( 
          ` SELECT 
                  p.user_id,
                  p.firstName,
                  p.lastName,
                  p.email,
                  p.password,
                  p.profile_photo,
                  p.uni_id,
                  p.created_at,
                  p.updated_at,
                  r.role_name AS user_level
              FROM 
                  Users p
              JOIN 
                  Roles r ON p.role_id = r.role_id
              WHERE 
                  p.email = ?;
          `, [email]);

        if (result && result[0].length > 0) { //query successfully ran
          return result[0];
        } else {
          logger.error("Error finding user : User not found. No result or empty result array");
          return null;
        }
      } catch (error) {
        logger.error("Error finding user :", error);
        return null;
      }
    }

  static async create(
    connection: Connection, 
    firstName: string, 
    lastName: string, 
    email: string, 
    password: string,
    userRole: number, 
    userUniversity: number | string
  ): Promise<{status: boolean, message: any, data?: any}> {
      try {

        // Check if the user with the provided email already exists
        const existingUserResult: any = await connection.execute(
            `SELECT user_id FROM Users WHERE email = ?`,
            [email]
        );

        if (existingUserResult && existingUserResult[0].length > 0) {
            // User with the provided email already exists, handle accordingly
            logger.error('User with this email already exists');
            return {
              status: false,
              message: "User with this email already exists"
            };
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // You can adjust the saltRounds as needed
        
        let university_id
        if(userUniversity == ""){
          university_id = null;
        }else{
          university_id = userUniversity;
        }

        const result: any = await connection.execute(
          `INSERT INTO Users (firstName, lastName, email, password, role_id, uni_id) VALUES (?, ?, ?, ?, ?, ?)`,
          [firstName, lastName, email, hashedPassword, userRole, university_id ]
        );

        if (result && result.length > 0) {
          // return result[0].insertId;
          return {
            status: true,
            message: "User created successfully",
            data: result[0].insertId
          };
        } else {
          logger.error('Error creating user: No result or empty result array');
          return {
            status: false,
            message: "Error creating user: No result or empty result array"
          };
        }
      } catch (error:any) {
        logger.error('Error creating user:', error);
        return {
          status: false,
          message: error.message
        };
      }
    }


    static async getAllUsers(
      connection: Connection
    ): Promise<number | null> {
        try {
          const result: any = await connection.execute( 
            `SELECT user_id, firstName, lastName, email, user_level, created_at, updated_at FROM Users`
            );
      
          if (result && result.length > 0) {
            return result[0];
          } else {
            logger.error('Error fetching users');
            return null;
          }
        } catch (error) {
          logger.error('Error fetching users:', error);
          return null;
        }
    }
}

export default User;
