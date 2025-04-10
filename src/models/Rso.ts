// models/User.ts
import { Connection, ResultSetHeader } from "mysql2/promise";
import logger from "../utils/logger";

class Rso {

  
  static async getRsoBySchool(
    connection: Connection, uni_id: string
  ): Promise<number | null> {
      try {
        const result: any = await connection.execute( 
          `SELECT * FROM RSO WHERE university_id = ? ORDER BY updated_at DESC`
          , [uni_id]);
    
        if (result && result.length > 0) {
          return result[0];
        } else {
          logger.error('Error fetching RSO by School');
          return null;
        }
      } catch (error) {
        logger.error('Error fetching RSO by School:', error);
        return null;
      }
  }

  static async getRsoMembersById(
    connection: Connection, user_id: string
  ): Promise<number | null> {
      try {
        const result: any = await connection.execute( 
          `SELECT * FROM Rsomembers WHERE user_id = ?`
          , [user_id]);
    
        if (result && result.length > 0) {
          return result[0];
        } else {
          logger.error('Failed to fetch RSO MEmber By ID');
          return null;
        }
      } catch (error) {
        logger.error('Failed to fetch RSO MEmber By ID:', error);
        return null;
      }
  }

  static async getRsoMembers(
    connection: Connection
  ): Promise<number | null> {
      try {
        const result: any = await connection.execute( 
          `SELECT * FROM Rsomembers`);
    
        if (result && result.length > 0) {
          return result[0];
        } else {
          logger.error('Error fetching ALL RSO Member');
          return null;
        }
      } catch (error) {
        logger.error('Error fetching ALL RSO Member:', error);
        return null;
      }
  }
  static async getRsoById(
    connection: Connection, admin_id: string
  ): Promise<number | null> {
      try {
        // const result: any = await connection.execute( 
        //   `SELECT rso_id, name FROM RSO WHERE admin_id = ?`
        //   , [admin_id]);


        const result: any = await connection.execute( 
          `  
                  SELECT 
                      e.user_id,
                      e.rso_id,
                      c.name
                  FROM 
                      Rsomembers e
                  JOIN 
                      RSO c ON e.rso_id = c.rso_id
                  WHERE 
                      e.user_id = ?;
              `
          , [admin_id]);

    
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


  static async createRso(
        connection: Connection, rsoData: any
      ): Promise<{status: boolean, message: any, data?: any}> {
          try {
            const existingRSOResult: any = await connection.execute(
              `SELECT name FROM RSO WHERE name = ?`,
              [rsoData.rsoName]
          );
  
          if (existingRSOResult && existingRSOResult[0].length > 0) {
              // User with the provided email already exists, handle accordingly
              logger.error('This RSO group already exist');
              return {
                status: false,
                message: "This RSO group already exist"
              };
          }

            const RsoMemberIdArray = rsoData.Members.split(',');

              const sql = `INSERT INTO RSO 
              (name, admin_id, university_id, about, contactEmail, contactPhone, photopath, coverphotopath)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;


              const values = [
                rsoData.rsoName,
                rsoData.admin_id,
                rsoData.uni_id,
                rsoData.rsoAbout,
                rsoData.ContactEmail,
                rsoData.ContactPhone,
                rsoData.photoPath,
                rsoData.coverPhotoPath,
              ];

             const result:any =  await connection.execute(sql, values);

             let insertCount = 0; // Counter to track the number of insertions
        
             if (result && result.length > 0) {
                // return result[0].insertId;
                await connection.execute(`INSERT INTO Rsomembers (user_id, uni_id, rso_id  ) VALUES (?, ?, ?)`, [rsoData.admin_id, rsoData.uni_id, result[0].insertId]);
                for (const userId of RsoMemberIdArray) {
                  await connection.execute(`INSERT INTO Rsomembers (user_id, uni_id, rso_id  ) VALUES (?, ?, ?)`, [userId, rsoData.uni_id, result[0].insertId]);
                  insertCount++;

                  // Check if all insertions are done
                  if (insertCount === RsoMemberIdArray.length) {
                    logger.info('All insertions done: For loop shit no error');
                  }
                }

                return {
                  status: true,
                  message: "RSO created successfully",
                  data: result[0].insertId
                };
               
              } else {
                logger.error('Error creating RSO: No result or empty result array');
                return {
                  status: false,
                  message: "Error creating RSO: No result or empty result array"
                };
              }
          } catch (error:any) {
            logger.error('Error creating RSO:', error);
            return {
                status: false,
                message: error.message
              };
          }
      }



  
      static async joinRsoGroup(
        connection: Connection, rsoData: any
      ): Promise<{status: boolean, message: any, data?: any}> {
        // console.log(rsoData);
        // console.log(typeof rsoData.Members);
          try {
            // return {
            //   status: false,
            //   message: "Error creating Event: No result or empty result array"
            // };

              const sql = `INSERT INTO Rsomembers (user_id, uni_id, rso_id) VALUES (?, ?, ?)`;


              const values = [
                rsoData.user_id,
                rsoData.university_id,
                rsoData.rso_id
              ];

             const result:any =  await connection.execute(sql, values);
             if (result && result.length > 0) {
                // return result[0].insertId;
                return {
                  status: true,
                  message: "You have successfully joined this group",
                  data: result[0].insertId
                };
               
              } else {
                logger.error('Error joing RSO: No result or empty result array');
                return {
                  status: false,
                  message: "Error joing RSO: No result or empty result array"
                };
              }
          } catch (error:any) {
            logger.error('Error Error joing RSO:', error);
            return {
                status: false,
                message: error.message
              };
          }
      }


      static async leaveRsoGroup(
        connection: Connection, rsoData: any
      ): Promise<{status: boolean, message: any, data?: any}> {
        // console.log(rsoData);
        // console.log(typeof rsoData.Members);
          try {
            // return {
            //   status: false,
            //   message: "Error creating Event: No result or empty result array"
            // };

              const sql = `DELETE FROM Rsomembers WHERE user_id = ? AND rso_id = ?`;


              const values = [
                rsoData.user_id,
                rsoData.rso_id
              ];

             const result:any =  await connection.execute(sql, values);
             if (result && result.length > 0) {
                // return result[0].insertId;
                return {
                  status: true,
                  message: "You have successfully left this group",
                  data: result[0].insertId
                };
               
              } else {
                logger.error('Error leaving RSO: No result or empty result array');
                return {
                  status: false,
                  message: "Error leaving RSO: No result or empty result array"
                };
              }
          } catch (error: any) {
            logger.error('Error leaving RSO:', error);
            return {
                status: false,
                message: error.message
              };
          }
      }

}

export default Rso;
