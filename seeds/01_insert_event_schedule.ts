import {Knex} from 'knex';

const tableName: string = "Event_Schedule";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex(`${tableName}`).del();
    

    // Inserts seed entries
    await knex(`${tableName}`).insert([
        { event_time: '12:00AM' },
        { event_time: '12:30AM' },
        { event_time: '1:00AM'},
        { event_time: '1:30AM' },
        { event_time: '2:00AM'},
        { event_time: '2:30AM'},
        { event_time: '3:00AM'},
        { event_time: '3:30AM'},
        { event_time: '4:00AM' },
        { event_time: '4:30AM'},
        { event_time: '5:00AM' },
        { event_time: '5:30AM' },
        { event_time: '6:00AM' },
        { event_time: '6:30AM' },
        { event_time: '7:00AM' },
        { event_time: '7:30AM' },
        { event_time: '8:00AM' },
        { event_time: '8:30AM' },
        { event_time: '9:00AM' },
        { event_time: '9:30AM' },
        { event_time: '10:00AM' },
        { event_time: '10:30AM' },
        { event_time: '11:00AM' },
        { event_time: '11:30AM' },
        { event_time: '12:00PM' },
        { event_time: '12:30PM' },
        { event_time: '1:00PM'},
        { event_time: '1:30PM'},
        { event_time: '2:00PM'},
        { event_time: '2:30PM' },
        { event_time: '3:00PM' },
        { event_time: '3:30PM' },
        { event_time: '4:00PM' },
        { event_time: '4:30PM' },
        { event_time: '5:00PM'},
        { event_time: '5:30PM'},
        { event_time: '6:00PM' },
        { event_time: '6:30PM' },
        { event_time: '7:00PM' },
        { event_time: '7:30PM' },
        { event_time: '8:00PM'},
        { event_time: '8:30PM' },
        { event_time: '9:00PM' },
        { event_time: '9:30PM' },
        { event_time: '10:00PM' },
        { event_time: '10:30PM' },
        { event_time: '11:00PM' },
        { event_time: '11:30PM' }
    ]);
}


// npx knex seed:run --specific=01_insert_event_schedule.ts

// npx knex migrate:down 20240317012804_create_category_table.ts
