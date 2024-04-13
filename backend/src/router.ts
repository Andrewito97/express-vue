import { Router as expressRouter } from 'express'
import { UserController } from './modules/users/user.controller'
import { container } from 'tsyringe'
import { Route } from './types/route.type'
import { MetadataKey } from './constants/metadata-keys'

export class Router {
  private routerInstance: expressRouter
  private controllers: Object[]

  constructor() {
    this.routerInstance = expressRouter()
    this.controllers = [UserController]
  }

  init() {
    this.routerInstance.get('/', (req, res) => res.send('Hello World!'))
    this.registerControllers()
    this.routerInstance.get('*', (req, res) => res.send('Not Found'))

    return this.routerInstance
  }

  registerControllers() {
    this.controllers.forEach((controller) => {
      const baseUrl: string = Reflect.getMetadata(MetadataKey.baseUrl, controller)
      const routes: Route[] = Reflect.getMetadata(MetadataKey.routes, controller)
      const instance: any = container.resolve(controller as any)

      routes.forEach(({ method, path, handlerName }) => {
        const url = baseUrl + path
        const handler = instance[handlerName].bind(instance)
        this.routerInstance[method](url, handler)

        console.log(`[${method.toUpperCase()}] ${url}`)
      })
    })
  }
}
