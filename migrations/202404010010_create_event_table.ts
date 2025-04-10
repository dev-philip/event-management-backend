import { Knex } from "knex";

const tableName: string = "Event";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(`${tableName}`, function(table) {
    table.increments('event_id').primary();
    table.string('name', 100).unique();
    table.text('about');
    table.text('description');
    table.date('event_date');
    table.string('start_time', 50);
    table.string('end_time', 50);
    table.integer('category_id').unsigned();
    table.string('contact_name', 20);
    table.string('contact_phone', 20);
    table.string('contact_email', 100);
    table.string('location_name', 100);
    table.string('street_address', 100);
    table.string('additional_info', 100);
    table.string('city', 100);
    table.string('state', 100);
    table.string('zip_code', 50);
    table.decimal('latitude', 10, 8);
    table.decimal('longitude', 11, 8);
    table.json('location_geocoding');
    // table.enum('visibility', ['public', 'private', 'RSO']);
    table.integer('visibility_id').unsigned();
    table.foreign('visibility_id').references('Visibility.visibility_id');
    table.integer('admin_id').unsigned();
    table.foreign('admin_id').references('Users.user_id');
    table.integer('rso_id').unsigned();
    table.foreign('rso_id').references('RSO.rso_id');
    table.timestamps(true, true);  // Adds `created_at` and `updated_at` columns
    table.foreign('category_id').references('Category.category_id');
  });

  await knex.raw(`
        CREATE TRIGGER Check_Event_Creator_Role
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
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Only users with the role of super admin or admin can create events';
            END IF;
        END;
  `);


  await knex.raw(`
        CREATE TRIGGER Check_Event_Time
        BEFORE INSERT ON ${tableName}
        FOR EACH ROW
        BEGIN
            DECLARE start_time_time TIME;
            DECLARE end_time_time TIME;
            
            -- Convert string representations to time data types
            SET start_time_time = STR_TO_DATE(NEW.start_time, '%H:%i:%s');
            SET end_time_time = STR_TO_DATE(NEW.end_time, '%H:%i:%s');
            
            -- Check if end_time is after start_time
            IF end_time_time <= start_time_time THEN
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'End time must be after start time';
            END IF;
        END;
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(`${tableName}`);
  await knex.raw('DROP TRIGGER IF EXISTS Check_Event_Creator_Role');
  await knex.raw('DROP TRIGGER IF EXISTS Check_Event_Time');
}


// ALTER TABLE Event
// ADD COLUMN visibility_id INT UNSIGNED;

// ALTER TABLE Event
// ADD CONSTRAINT fk_visibility_id
// FOREIGN KEY (visibility_id)
// REFERENCES Visibility(visibility_id);



/*

DELIMITER //

CREATE TRIGGER Check_Event_Creator_Role
BEFORE INSERT ON Event
FOR EACH ROW
BEGIN
    DECLARE admin_role VARCHAR(100);
    
    -- Retrieve the role name of the admin
    SELECT role_name INTO admin_role 
    FROM Roles 
    WHERE role_id = (SELECT role_id FROM Users WHERE user_id = NEW.admin_id);
    
    -- Check if the admin has the required role (super admin or admin)
    IF admin_role != 'super admin' AND admin_role != 'admin' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Only users with the role of super admin or admin can create events';
    END IF;
END;
//

DELIMITER ;
*/

/*

DELIMITER //

CREATE TRIGGER Check_Event_Time
BEFORE INSERT ON Event
FOR EACH ROW
BEGIN
    DECLARE start_time_time TIME;
    DECLARE end_time_time TIME;
    
    -- Convert string representations to time data types
    SET start_time_time = STR_TO_DATE(NEW.start_time, '%H:%i:%s');
    SET end_time_time = STR_TO_DATE(NEW.end_time, '%H:%i:%s');
    
    -- Check if end_time is after start_time
    IF end_time_time <= start_time_time THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'End time must be after start time';
    END IF;
END;
//

DELIMITER ;

*/
// insert data here