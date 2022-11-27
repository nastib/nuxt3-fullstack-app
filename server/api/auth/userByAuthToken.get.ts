import { IUser } from '@/types/IUser';
import userByAuthToken from '@/server/controllers/auth/userByAuthToken';

export default defineEventHandler(async (event): Promise<IUser> => userByAuthToken(event))