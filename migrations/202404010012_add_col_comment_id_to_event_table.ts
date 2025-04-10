import { Knex } from "knex";

const tableName: string = "Event";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable(tableName, (table) => {
        table.integer('comment_id').unsigned();
        table.foreign('comment_id').references('Comment.comment_id');
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable(tableName, (table) => {
        table.dropForeign('comment_id');
        table.dropColumn('comment_id');
    });
}
