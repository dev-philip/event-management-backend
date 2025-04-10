import {Knex} from 'knex';

const tableName: string = "Category";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex(`${tableName}`).del();
    

    // Inserts seed entries
    await knex(`${tableName}`).insert([
        { name: 'Social' },
        { name: 'Fundraising' },
        { name: 'Tech Talks' },
        { name: 'Academic' },
        { name: 'Arts Exhibit'},
        { name: 'Career/Jobs' },
        { name: 'Concert/Performance' },
        { name: 'Entertainment' },
        { name: 'Health' },
        { name: 'Holiday' },
        { name: 'Meeting' },
        { name: 'Open Forum' },
        { name: 'Recreation & Exercise' },
        { name: 'Service/Volunteer' },
        { name: 'Speaker/Lecture/Seminar' },
        { name: 'Sports' },
        { name: 'Tour/Open House/Information Session' },
        { name: 'Uncategorized/Other' },
        { name: 'Workshop/Conference' },
    ]);
}


// npx knex seed:run --specific=01_insert_categories.ts

// npx knex migrate:down 20240317012804_create_category_table.ts
