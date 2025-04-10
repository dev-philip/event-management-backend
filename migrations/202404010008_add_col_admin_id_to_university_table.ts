import { Knex } from "knex";

const tableName: string = "University";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable(tableName, (table) => {
        table.integer('admin_id').unsigned();
        table.foreign('admin_id').references('Users.user_id');
    });

    await knex.raw(`
        CREATE TRIGGER Check_Who_Is_Creating_A_University
        BEFORE INSERT ON ${tableName}
        FOR EACH ROW
        BEGIN
            DECLARE admin_role VARCHAR(100);
            
            -- Retrieve the role name of the admin
            SELECT role_name INTO admin_role 
            FROM Roles 
            WHERE role_id = (SELECT role_id FROM Users WHERE user_id = NEW.admin_id);
            
            IF admin_role != 'super admin' THEN
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Only super admin can create universities';
            END IF;
        END;
    `);
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable(tableName, (table) => {
        table.dropForeign('admin_id');
        table.dropColumn('admin_id');
    });
    await knex.raw('DROP TRIGGER IF EXISTS Check_Who_Is_Creating_A_University');
}


// My Trigger

/*
DELIMITER //

CREATE TRIGGER Check_Who_Is_Creating_A_University
BEFORE INSERT ON University
FOR EACH ROW
BEGIN
    DECLARE admin_role VARCHAR(100);
    
    -- Retrieve the role name of the admin
    SELECT role_name INTO admin_role 
    FROM Roles 
    WHERE role_id = (SELECT role_id FROM Users WHERE user_id = NEW.admin_id);
    
    IF admin_role != 'super admin' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Only super admin can create universities';
    END IF;
END;
//

DELIMITER ;

*/

// SHOW TRIGGERS;
