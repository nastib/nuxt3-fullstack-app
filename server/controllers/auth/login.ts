import { IUser, ISession } from '@/types/dto';
import bcrypt from 'bcrypt';
import { getUserByEmail } from '@/server/repositories/userRepository';
import { H3Event, sendError } from 'h3';
import { makeSession } from '@/server/services/sessionService';
import { FormValidation } from '@/types/FormValidation';
import { validateLogin } from '@/server/services/userService';

export default async function async(event: H3Event) {
  const body = await useBody(event);
  const email: string = body.email;
  const password: string = body.password;

  const validation = (await validateLogin(body)) as FormValidation;

  if (validation.errors && validation.hasErrors === true) {
    const errors = JSON.stringify(Object.fromEntries(validation.errors));
    return sendError(event, createError({ statusCode: 422, data: errors }));
  }

  const user = (await getUserByEmail(email)) as IUser;
  if (user === null) {
    sendError(event, createError({ statusCode: 401, statusMessage: 'Unauthenticated' }));
  }
  if (user.password) {
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      sendError(event, createError({ statusCode: 401, statusMessage: 'Unauthenticated not password' }));
    }
    
    const session = (await makeSession(user, event)) as unknown as ISession;
    return session;
  }
  sendError(event, createError({ statusCode: 401, statusMessage: 'Unauthenticated! Error Creating Session' }));
}
