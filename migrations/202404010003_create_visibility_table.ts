import type { Knex } from "knex";

const tableName: string = "Visibility";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(`${tableName}`, function (table) {
    table.increments("visibility_id").primary();
    table.string("name", 100);
    table.timestamps(true, true);  // Adds `created_at` and `updated_at` columns
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(`${tableName}`);
}

