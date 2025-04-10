import type { Knex } from "knex";


const tableName: string = "University";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(`${tableName}`, function (table) {
    table.increments("uni_id").primary();
    table.string('name', 255).unique();
    table.text('about');
    table.string('email', 255).unique();
    table.string('phone_number', 20);
    table.string('address', 255);
    table.string('city', 100);
    table.string('state', 100);
    table.string('zipCode', 10);
    table.text('additionalInfo');
    table.decimal('lat', 10, 8);
    table.decimal('lng', 11, 8);
    table.string('geocode', 255);
    table.string('photo', 255);
    table.string('cover_photo', 255);
    
    table.timestamps(true, true);  // Adds `created_at` and `updated_at` columns
  });

}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(`${tableName}`);
}

// ALTER TABLE University
// ADD CONSTRAINT unique_university_name UNIQUE (name);



//data to insert

// INSERT INTO University (name, about, email, phone_number, lat, lng, admin_id, address, city, state, zipCode, additionalInfo, photo, cover_photo, geocode)
// VALUES ("University of Central Florida", "The University of Central Florida is a public research university with its main campus in unincorporated Orange County, Florida. It is part of the State University System of Florida", 
// "ucf@gmail.com", "4078232000", "28.596857", "-81.203269", 11, "4000 Central Florida Blvd", "Orlando", "Florida", "32816", "", 
// "uploads/university/1713079605173- Photo -5.jpg", "uploads/university/1713079605173- Photo -5.jpg", "ola");

