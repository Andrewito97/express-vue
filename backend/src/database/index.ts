import Knex from 'knex'
import { injectable } from 'tsyringe'
import config from './config'

@injectable()
export class Database {
  readonly connection: Knex.Knex

  constructor() {
    this.connection = Knex(config)
    console.log('Database connected')
  }
}
