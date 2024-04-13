import { Request, Response } from 'express'
import { injectable } from 'tsyringe'
import { UserService } from './user.service'
import { Controller } from '../../decorators/controller.decorator'
import { Get, Post } from '../../decorators/route.decorator'

@injectable()
@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getUsers(req: Request, res: Response) {
    const page = Number(req.query['page'])
    const pageSize = Number(req.query['pageSize'])
    const offset = pageSize * (page - 1)

    const users = await this.userService.getUsers({ limit: pageSize, offset })
    res.send(users)
  }

  @Post()
  async createUser(req: Request, res: Response) {
    const userData = req.body
    if (!userData.first_name || !userData.last_name || !userData.email) {
      return res.status(400).send('Invalid request body')
    }

    if (await this.userService.getUserByEmail(userData.email)) {
      return res.status(422).send('Email already exists')
    }

    await this.userService.createUser(userData)
    res.send(201)
  }
}
