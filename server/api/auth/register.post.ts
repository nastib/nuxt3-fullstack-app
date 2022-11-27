import registerController from '@/server/controllers/auth/register';

export default defineEventHandler(async (event) => registerController(event));