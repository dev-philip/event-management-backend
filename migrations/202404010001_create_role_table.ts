import type { Knex } from "knex";

const tableName: string = "Roles";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(`${tableName}`, function (table) {
    table.increments("role_id").primary();
    table.string("role_name", 100).unique();
    table.json("permission");
    table.string("visibility", 100);

    table.timestamps(true, true);  // Adds `created_at` and `updated_at` columns
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(`${tableName}`);
}


// ALTER TABLE Roles
// ADD CONSTRAINT unique_role_name UNIQUE (role_name);