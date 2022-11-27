import { RegistrationRequest, IUser, LoginRequest } from '@/types/dto';
import { FormValidation } from "@/types/FormValidation";
import { validate } from '@/server/services/registerValidator'
import { validateLoginForm } from '@/server/services/loginValidator'

export async function validateUser(data: RegistrationRequest): Promise<FormValidation> {

  const errors = await validate(data)

  if (errors.size > 0) {

      return { hasErrors: true, errors }
  }

  return { hasErrors: false }
}

export async function validateLogin(data: LoginRequest): Promise<FormValidation> {

  const errors = await validateLoginForm(data)

  if (errors.size > 0) {

      return { hasErrors: true, errors }
  }

  return { hasErrors: false }
}

export function sanitizeUserForFrontend(user: IUser): IUser {

  if (!user) {
      return user
  }

  delete user.password;
  delete user.loginType;
  delete user.stripeCustomerId;

  return user
}

