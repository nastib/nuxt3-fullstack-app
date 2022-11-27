import loginController from '@/server/controllers/auth/login';

export default defineEventHandler(async (event) => loginController(event));