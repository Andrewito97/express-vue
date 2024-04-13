import { HttpMethods } from '../constants/http-methods'
import { MetadataKey } from '../constants/metadata-keys'
import { Route } from '../types/route.type'

function httpMethodDecoratorFactory(method: HttpMethods) {
  return function (path: string = ''): MethodDecorator {
    return function (target, propertyKey) {
      const controllerClass = target.constructor
      const routers: Route[] = Reflect.getMetadata(MetadataKey.routes, controllerClass) || []

      routers.push({ method, path, handlerName: propertyKey })
      Reflect.defineMetadata(MetadataKey.routes, routers, controllerClass)
    }
  }
}

export const Get = httpMethodDecoratorFactory(HttpMethods.GET)
export const Post = httpMethodDecoratorFactory(HttpMethods.POST)
