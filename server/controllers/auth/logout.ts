import { H3Event } from 'h3';
import { removeSessionByAuthToken, getSessionByAuthToken } from '@/server/repositories/sessionRepository';

export default async function logoutController (event: H3Event) : Promise<boolean> {
  const authToken = useCookies(event).auth_token;
  if (authToken) {
    const session = await getSessionByAuthToken(authToken)
    
    if (session) {
     await removeSessionByAuthToken(authToken);
    }
    deleteCookie(event, 'auth_token');
  }

  return false;
};