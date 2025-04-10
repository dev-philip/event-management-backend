import type { Knex } from "knex";

const tableName: string = "Event_Schedule";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(`${tableName}`, function (table) {
    table.increments("schedule_id").primary();
    table.string("event_time", 100);
    table.timestamps(true, true);  // Adds `created_at` and `updated_at` columns
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(`${tableName}`);
}

