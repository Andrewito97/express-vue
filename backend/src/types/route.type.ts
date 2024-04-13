import { HttpMethods } from '../constants/http-methods'

export type Route = {
  method: HttpMethods
  path: string
  handlerName: string | symbol
}
