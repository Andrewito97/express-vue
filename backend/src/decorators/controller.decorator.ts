import { MetadataKey } from '../constants/metadata-keys'

export function Controller(baseUrl: string): ClassDecorator {
  return function (target) {
    Reflect.defineMetadata(MetadataKey.baseUrl, baseUrl, target)
  }
}
