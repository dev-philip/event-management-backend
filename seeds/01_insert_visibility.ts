import {Knex} from 'knex';

const tableName: string = "Visibility";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex(`${tableName}`).del();
    

    // Inserts seed entries
    await knex(`${tableName}`).insert([
        { name: 'Public' },
        { name: 'Private' },
        { name: 'RSO' },
    ]);
}


// npx knex seed:run --specific=01_insert_visibility.ts

// npx knex migrate:down 20240317012804_create_category_table.ts
