export interface LoginCredentials {
  email?: string
  username?: string
  password: string
}

export type jwtToken = string

export type JwtAccessTokenDecoded = {
  userId: number
  email: string
  role: string
  permissions: string[]
  exp: number
}

export interface User extends Omit<JwtAccessTokenDecoded, 'exp'> {
  name?: string
}