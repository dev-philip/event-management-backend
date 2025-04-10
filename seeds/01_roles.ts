import {Knex} from 'knex';

const tableName: string = "Roles";
export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex(`${tableName}`).del();

    // Inserts seed entries
    await knex(`${tableName}`).insert([
        { role_name: 'super admin' },
        { role_name: 'admin' },
        { role_name: 'student' },
    ]);
}

// npx knex seed:run --specific=01_roles.ts

// npx knex migrate:down 20240317012804_create_category_table.ts
