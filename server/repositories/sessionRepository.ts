import { prisma } from '@/server/database/client';
import { ISession, IUser } from '@/types/dto';

export async function createSession(data: ISession): Promise<ISession> {
  if (data.user.id) {
    return prisma.session.create({
      data: {
        userId: data.user.id,
        authToken: data.authToken,
      },
    }) as unknown as ISession;

  }

  throw Error('Error Creating Session');
}

export async function getSessionByAuthToken(authToken: string): Promise<ISession> {
  const session = await prisma.session.findUnique({
    where: {
      authToken: authToken
    }
  }) as unknown as ISession
  const user: IUser = await getUserByAuthToken(authToken);

  return { id: session.id, authToken: session.authToken, user: user } as unknown as ISession ;
}

async function getUserByAuthToken(authToken: string): Promise<IUser> {
  return prisma.session
    .findUnique({
      where: {
        authToken: authToken,
      }
    })
    .user({
      select : {
        id: true,
        name: true,
        username: true,
        email: true,
        avatarUrl: true
      }
    }) as unknown as IUser;
}

export async function removeSessionByAuthToken(authToken: string): Promise<ISession> {
  return prisma.session
    .delete({
      where: {
        authToken: authToken,
      },
    }) as unknown as ISession
}