import * as z from 'zod'

export type jwtToken = string
import type { JwtPayload } from 'jwt-decode'

export interface JwtAccessTokenDecoded extends JwtPayload {
  userId: number,
  userName: string,
  email: string
  role: string
  tokenType: string,
  permissions: string[]
  exp: number,
  iat:number
}

export interface User  {
  userId: number,
  userName: string,
  email: string
  role: string
  permissions: string[]
}

export const createPasswordSchema = () => {
  const { t } = useI18n()
  
  return z.object({
    password: z.string()
      .refine(val => !val || val.length >= REGISTRATION.SCHEMA_CHAR_LENGTHS.password, {
        message: t('REGISTER.inputs.password.errors.minLength', { min: LOGIN.SCHEMA_CHAR_LENGTHS.password })
      })
      .refine(val => !val || /\d/.test(val), {
        message: t('REGISTER.inputs.password.errors.requireNumber')
      })
      .refine(val => !val || /[a-z]/.test(val), {
        message: t('REGISTER.inputs.password.errors.requireLowercase')
      })
      .refine(val => !val || /[A-Z]/.test(val), {
        message: t('REGISTER.inputs.password.errors.requireUppercase')
      })
      .nullable(),

    password2: z.string()
      .nullable()
  })
  
}

export const createRegisterationSchema = () => {
  const { t } = useI18n()
  const passwordSchema = createPasswordSchema()

  return passwordSchema.extend({
    first_name: z.string()
      .refine(val => !val || /^[a-zA-Z]+$/.test(val), {
        message: t('REGISTER.inputs.firstName.errors.oneWord')
      })
      .refine(val => !val || /^[a-zA-Z]/.test(val), {
        message: t('REGISTER.inputs.firstName.errors.mustStartWithLetter')
      })
      .refine(val => !val || /^[a-zA-Z][a-zA-Z\-'.\s]*[a-zA-Z]$|^[a-zA-Z]$/.test(val), {
        message: t('REGISTER.inputs.firstName.errors.invalidCharacters')
      })
      .refine(val => !val || !/^\d+$/.test(val), {
        message: t('REGISTER.inputs.firstName.errors.notJustNumbers')
      })
      .refine(val => !val || val.length >= REGISTRATION.SCHEMA_CHAR_LENGTHS.firstName, {
        message: t('REGISTER.inputs.firstName.errors.minLength', { min: REGISTRATION.SCHEMA_CHAR_LENGTHS.firstName })
      })
      .nullable(),

    last_name: z.string()
      .refine(val => !val || /^[a-zA-Z]+$/.test(val), {
        message: t('REGISTER.inputs.lastName.errors.oneWord')
      })
      .refine(val => !val || /^[a-zA-Z]/.test(val), {
        message: t('REGISTER.inputs.lastName.errors.mustStartWithLetter')
      })
      .refine(val => !val || /^[a-zA-Z][a-zA-Z\-'.\s]*[a-zA-Z]$|^[a-zA-Z]$/.test(val), {
        message: t('REGISTER.inputs.lastName.errors.invalidCharacters')
      })
      .refine(val => !val || !/^\d+$/.test(val), {
        message: t('REGISTER.inputs.lastName.errors.notJustNumbers')
      })
      .refine(val => !val || val.length >= REGISTRATION.SCHEMA_CHAR_LENGTHS.lastName, {
        message: t('REGISTER.inputs.lastName.errors.minLength', { min: REGISTRATION.SCHEMA_CHAR_LENGTHS.lastName })
      })
      .nullable(),

    username: z.string()
      .min(REGISTRATION.SCHEMA_CHAR_LENGTHS.username)
      .nullable(),

    email: z.string()
      .refine(val => !val || z.string().email().safeParse(val).success, {
        message:  t('REGISTER.inputs.email.errors.invalidEmail')
      })
      .nullable(),

  })
  .refine(data => !data.password2 || data.password === data.password2, {
    message: t('REGISTER.inputs.password2.errors.noMatch'),
    path: ['password2']
  })
}

export const createLoginSchema = () => {
  const { t } = useI18n()
  
  return z.object({
    id: z.string()
      .refine(val => !val || val.length >= 4 || z.string().email().safeParse(val).success, {
        message: t('LOGIN.inputs.id.errors.minLength', { min: LOGIN.SCHEMA_CHAR_LENGTHS.id })
      })
      .nullable(),

    password: z.string()
      .refine(val => !val || val.length >= 8, {
        message: t('LOGIN.inputs.password.errors.minLength', { min: LOGIN.SCHEMA_CHAR_LENGTHS.password })
      })
      .nullable()
  })
}

export const createForgotPasswordShema = () => {
  const { t } = useI18n()

  return z.object({
    email: z.string()
    .refine(val => !val  || z.string().email().safeParse(val).success, {
      message: t('FORGOT_PASSWORD.inputs.password.errors.invalidEmail')
    })
    .nullable()

  })
}

export const createResetPasswordSchema = () => {
  const { t } = useI18n()

  return createPasswordSchema()
    .extend({
      pin: z.array(z.number())
    })
    .refine(data => !data.password2 || data.password === data.password2, {
      message: t('REGISTER.inputs.password2.errors.noMatch'),
      path: ['password2']
    })
}


