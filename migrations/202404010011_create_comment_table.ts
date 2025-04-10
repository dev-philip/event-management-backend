import { Knex } from "knex";

const tableName: string = "Comment";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(`${tableName}`, function(table) {
    table.increments('comment_id').primary();
    table.integer('user_id').unsigned();
    table.integer('event_id').unsigned();
    table.text('comment_text');
    table.integer('rating');
    table.foreign('user_id').references('Users.user_id');
    table.foreign('event_id').references('Event.event_id');
    table.timestamps(true, true);  // Adds `created_at` and `updated_at` columns

  });
}

// export async function down(knex: Knex): Promise<void> {
//   await knex.schema.dropTableIfExists(`${tableName}`);
// }


export async function down(knex: Knex): Promise<void> {
  try {
    await knex.raw('SET foreign_key_checks = 0;');
    await knex.schema.dropTableIfExists(`${tableName}`);
    await knex.raw('SET foreign_key_checks = 1;');
  } catch (error) {
    console.error('Error dropping table:', error);
    throw error; // Rethrow to halt migration
  }
}
