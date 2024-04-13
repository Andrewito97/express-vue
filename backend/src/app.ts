import 'reflect-metadata'
import express from 'express'
import cors from 'cors'
import { Router } from './router'

class App {
  app: express.Express
  port: number
  router: Router

  constructor() {
    this.app = express()
    this.port = 3000
    this.router = new Router()
  }

  start() {
    this.app.use(cors())
    this.app.use(express.json())
    this.app.use(this.router.init())

    this.app.listen(this.port, () => {
      console.log(`Example app listening on port ${this.port}`)
    })
  }
}

new App().start()
