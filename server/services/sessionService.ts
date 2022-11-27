import { ISession } from '~~/types/dto/ISession';
import { H3Event } from 'h3';
import { v4 as uuidV4 } from 'uuid';
import { createSession, getSessionByAuthToken } from '@/server/repositories/sessionRepository';
import { sanitizeUserForFrontend } from '@/server/services/userService';
import { IUser } from '@/types/dto/IUser';


export async function makeSession(user: IUser, event: H3Event): Promise<ISession> {
  const authToken = uuidV4().replaceAll('-', '');
  const session = await createSession({ authToken, user: user }) as ISession;
     
  if (session) {
    setCookie(event, 'auth_token', authToken, { path: '/', httpOnly: true });

    return getSessionByAuthToken(authToken);
  }

  throw Error('Error Creating Session');
}

export async function getUserBySessionToken(authToken: string): Promise<IUser> {
  const session = await getSessionByAuthToken(authToken);

  return sanitizeUserForFrontend(session.user);
}
