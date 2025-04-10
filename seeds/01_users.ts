// // seeds/01_users.js

//   knex seed:run

import type { Knex } from "knex";

const tableName: string = "User";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("User").del();

  // Inserts seed entries
  await knex("User").insert([
    { 
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: "password123",
      user_level: "super admin",
      created_at: new Date(),
      updated_at: new Date()
    },
    { 
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      password: "password456",
      user_level: "admin",
      created_at: new Date(),
      updated_at: new Date()
    },
    { 
      firstName: "Alice",
      lastName: "Johnson",
      email: "alice.johnson@example.com",
      password: "password789",
      user_level: "student",
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);
}


