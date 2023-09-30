import { provide } from 'vue'
import type { AccepterMap } from './types'

export type RegisterAccepter = (name: string) => AccepterMap[string]

export const useModalAccepterContext = () => {
  const accepterMap: AccepterMap = {}

  const registerAccepter: RegisterAccepter = (name: string) => {
    accepterMap[name] = {}

    return accepterMap[name]
  }

  const unregisterAccepter = (name: string) => {
    checkAccepterExistedOrThrow(name)
    delete accepterMap[name]
  }

  const checkAccepterExistedOrThrow = (name: string) => {
    if (!accepterMap[name]) {
      throw new Error(`Accepter ${name} is not registered.`)
    }
  }

  provide('accepterMap', accepterMap)
  provide('registerAccepter', registerAccepter)
  provide('unregisterAccepter', unregisterAccepter)
}
