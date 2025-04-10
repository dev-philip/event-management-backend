import type { Knex } from "knex";

const tableName: string = "Category";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(`${tableName}`, function (table) {
    table.increments("category_id").primary();
    table.string("name", 100);
    table.timestamps(true, true);  // Adds `created_at` and `updated_at` columns
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(`${tableName}`);
}

