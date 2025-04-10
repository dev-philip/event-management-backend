import type { Knex } from "knex";


const tableName: string = "RSO";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(`${tableName}`, function (table) {
    table.increments("rso_id").primary();
    table.string("name", 100).unique();
    table.integer("admin_id").unsigned();
    table.integer("university_id").unsigned();

    table.string("about", 255);
    table.string("contactEmail", 255);
    table.string("contactPhone", 20);
    table.string("photopath", 255);
    table.string("coverphotopath", 255);
    
    // Foreign key constraints
    table.foreign("admin_id").references("user_id").inTable("Users");
    table.foreign("university_id").references("uni_id").inTable("University");
    table.timestamps(true, true);  // Adds `created_at` and `updated_at` columns
  });


  await knex.raw(`
      CREATE TRIGGER Check_Who_Is_Creating_A_RSO
      BEFORE INSERT ON ${tableName}
      FOR EACH ROW
      BEGIN
          DECLARE admin_role VARCHAR(100);
          
          -- Retrieve the role name of the admin
          SELECT role_name INTO admin_role 
          FROM Roles 
          WHERE role_id = (SELECT role_id FROM Users WHERE user_id = NEW.admin_id);
          
          -- Check if the admin has the required role (super admin or admin)
          IF admin_role != 'super admin' AND admin_role != 'admin' THEN
              SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Only users with the role of super admin or admin can create RSOS';
          END IF;
      END;
  `);
}

export async function down(knex: Knex): Promise<void> {
    try {
      await knex.raw('SET foreign_key_checks = 0;');
      await knex.schema.dropTableIfExists(`${tableName}`);
      await knex.raw('SET foreign_key_checks = 1;');
      await knex.raw('DROP TRIGGER IF EXISTS Check_Who_Is_Creating_A_RSO');
    } catch (error) {
      console.error('Error dropping table:', error);
      throw error; // Rethrow to halt migration
    }
  }


// ALTER TABLE RSO
// ADD CONSTRAINT unique_RSO_name UNIQUE (name);


/*

DELIMITER //

CREATE TRIGGER Check_Who_Is_Creating_A_RSO
BEFORE INSERT ON RSO
FOR EACH ROW
BEGIN
    DECLARE admin_role VARCHAR(100);
    
    -- Retrieve the role name of the admin
    SELECT role_name INTO admin_role 
    FROM Roles 
    WHERE role_id = (SELECT role_id FROM Users WHERE user_id = NEW.admin_id);
    
    -- Check if the admin has the required role (super admin or admin)
    IF admin_role != 'super admin' AND admin_role != 'admin' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Only users with the role of super admin or admin can create RSOS';
    END IF;
END;
//

DELIMITER ;


*/

//DATA TO INSERT

// INSERT INTO RSO 
//     (name, admin_id, university_id, about, contactEmail, contactPhone, photopath, coverphotopath)
// VALUES 
//     ('Computer Science Club', 20, 11, 'The Computer Science Club is dedicated to promoting interest and involvement in computer science.', 'csclub@example.com', '8475893098', 'csclub_photo.jpg', 'csclub_coverphoto.jpg');

