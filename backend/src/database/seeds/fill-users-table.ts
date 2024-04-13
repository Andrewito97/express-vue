import { Knex } from 'knex';
import { getRandomNumber } from '../../utils/get-random-number.util';
import { CreateUser } from '../../modules/users/user.type';

function generateUsers(quantity: number) {
  const firstNames = ['Andrew', 'Barbara', 'Bob', 'Cindy', 'Emily', 'John', 'Rose', 'Will'];
  const lastNames = ['Williams', 'Robertson', 'Johnson', 'Brown', 'Smith', 'Taylor', 'Flores'];
  const users: CreateUser[] = [];

  for (let i = 0; i < quantity; i++) {
    const first_name = firstNames[getRandomNumber(0, firstNames.length)];
    const last_name = lastNames[getRandomNumber(0, lastNames.length)];
    const email = `${first_name.toLowerCase()}-${last_name.toLowerCase()}-${i}@email.com`;
    users.push({ first_name, last_name, email });
  }

  return users;
}

export async function seed(knex: Knex): Promise<void> {
  await knex('users').del();
  await knex('users').insert(generateUsers(45));
}
