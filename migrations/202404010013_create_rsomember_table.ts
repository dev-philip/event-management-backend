import type { Knex } from "knex";

const tableName: string = "Rsomembers";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(`${tableName}`, function (table) {
    table.increments("rsomember_id").primary();
    
    table.integer('user_id').unsigned();
    table.foreign('user_id').references('Users.user_id');

    table.integer('uni_id').unsigned();
    table.foreign('uni_id').references('University.uni_id');

    table.integer('rso_id').unsigned();
    table.foreign('rso_id').references('RSO.rso_id');

    table.timestamps(true, true);  // Adds `created_at` and `updated_at` columns
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(`${tableName}`);
}



// CREATE TABLE Rsomembers (
//     rsomember_id SERIAL PRIMARY KEY,
//     user_id INT UNSIGNED,
//     FOREIGN KEY (user_id) REFERENCES Users(user_id),
//     uni_id INT UNSIGNED,
//     FOREIGN KEY (uni_id) REFERENCES University(uni_id),
//     rso_id INT UNSIGNED,
//     FOREIGN KEY (rso_id) REFERENCES RSO(rso_id),
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
// );