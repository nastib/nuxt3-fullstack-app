import { H3Event } from 'h3';
import { IUser } from '@/types/IUser';
import { getUserBySessionToken } from '@/server/services/sessionService';

export default async function userByAuthToken(event: H3Event): Promise<IUser> {
    
    const authToken = useCookies(event);
    const user = await getUserBySessionToken(authToken.auth_token)
    return user
}