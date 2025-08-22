import type { 
  RouteLocationNormalized, 
  NavigationGuardNext 
} from 'vue-router'

export interface MiddlewareContext {
  to: RouteLocationNormalized
  from: RouteLocationNormalized
  next: NavigationGuardNext
}

export type MiddlewareFunction = (context: MiddlewareContext) => Promise<boolean | object | void> | boolean | string | void

export interface MiddlewareConfig {
  name: string
  handler: MiddlewareFunction
}

