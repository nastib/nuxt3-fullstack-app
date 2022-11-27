import { IUser } from "@/types/dto//IUser";

export interface ISession {
    id?: string;
    authToken: string;
    user: IUser
}