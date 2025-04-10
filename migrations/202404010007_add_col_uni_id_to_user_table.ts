import { Knex } from "knex";

const tableName: string = "Users";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable(tableName, (table) => {
        table.integer('uni_id').unsigned();
        table.foreign('uni_id').references('University.uni_id');
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable(tableName, (table) => {
        table.dropForeign('uni_id');
        table.dropColumn('uni_id');
    });
}
