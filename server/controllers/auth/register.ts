import { H3Event, sendError } from 'h3';
import bcrypt from 'bcrypt';

import { createUser } from '@/server/repositories/userRepository';
import { makeSession } from '@/server/services/sessionService';
import { IUser, RegistrationRequest } from '@/types/dto';
import { validateUser } from '@/server/services/userService';
import { FormValidation } from '@/types/FormValidation';

export default async function register(event: H3Event) {
  const body = await useBody(event) as RegistrationRequest;
  
  const validation = (await validateUser(body)) as FormValidation;
  
  if (validation.errors && validation.hasErrors === true) {
    const errors = JSON.stringify(Object.fromEntries(validation.errors));
    return sendError(event, createError({ statusCode: 422, data: errors }));
  }

  if (body.password) {
    const encryptedPassword = await bcrypt.hash(body.password, 10);

    const userData = {
      username: body.username,
      name: body.name,
      email: body.email,
      loginType: 'email',
      password: encryptedPassword,
    } as unknown as IUser;

    const user = await createUser(userData);

    //const session = await makeSession(user, event);

    return user;
  }

  throw new Error('Error on register user');
}
