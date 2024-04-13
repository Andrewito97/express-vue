import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (table) => {
    table.uuid('id').unique().primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('first_name', 20).notNullable();
    table.string('last_name', 20).notNullable();
    table.string('email', 50).unique().notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}
