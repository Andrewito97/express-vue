import { injectable } from 'tsyringe'
import { Database } from '../../database'
import { CreateUser } from './user.type'
import { GetListQuery } from '../../types/get-list-query.type'

@injectable()
export class UserService {
  constructor(private db: Database) {}

  async getUsers(query: GetListQuery) {
    const usersTable = this.db.connection.table('users')
    const totalCount = await usersTable.clone().count()
    const data = await usersTable
      .clone()
      .select('id', 'first_name', 'last_name', 'email')
      .limit(query.limit)
      .offset(query.offset)
      .orderBy('first_name', 'asc')

    return { data, total: Number(totalCount[0].count) }
  }

  async createUser(user: CreateUser) {
    await this.db.connection.table('users').insert(user)
  }

  async getUserByEmail(email: string) {
    return this.db.connection.table('users').select('id').where('email', email).first()
  }
}
