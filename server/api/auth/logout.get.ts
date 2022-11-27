import { removeSessionByAuthToken, getSessionByAuthToken } from '@/server/repositories/sessionRepository';
import logoutController from '~~/server/controllers/auth/logout';

export default defineEventHandler(async (event): Promise<boolean> => logoutController(event))
  
