import type { Knex } from "knex";

const tableName: string = "Users";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(`${tableName}`, function (table) {
    table.increments("user_id").primary();
    table.string("firstName", 100);
    table.string("lastName", 100);
    table.string("email", 100).unique();
    table.string("password", 100);
    table.text("about");
    table.string("profile_photo", 255);
    table.integer('role_id').unsigned();
    table.foreign('role_id').references('Roles.role_id');
    table.timestamps(true, true);  // Adds `created_at` and `updated_at` columns
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(`${tableName}`);
}



// SET GLOBAL log_bin_trust_function_creators = 1; to get sper prividlege

// check mysql version
// SELECT VERSION(); 



// ALTER TABLE Users
// ADD role_id INT UNSIGNED,
// ADD CONSTRAINT fk_role_id
//     FOREIGN KEY (role_id)
//     REFERENCES Roles(role_id);

// ALTER TABLE University
// ADD CONSTRAINT unique_name UNIQUE (name);
