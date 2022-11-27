import  { prisma }  from "@/server/database/client";
import {IUser} from '@/types/dto';

export async function getUserByEmail(email: string): Promise<IUser>{
   return prisma.user.findUnique({
    where: {
      email: email,
    },
    select: {
        id: true,
        username: true,
        password: true
      },
     }) as unknown as IUser
}

export async function getUserByUserName(username: string): Promise<IUser> { 
  return prisma.user.findUnique({
    where: {
      username: username,
    },
    select: {
      id: true,
      username: true,
    },
  }) as unknown as IUser
}

export async function createUser(data: IUser): Promise<IUser>{
  return prisma.user.create({
    data: {
      username: data.username,
      name: data.name,
      email: data.email,
      loginType: data.loginType,
      password: data.password,
    },
  }) as unknown as IUser;
}