import { ISubscription } from '@/types/dto';

export interface IUser {
  id?: number
  username: string
  name?: string
  loginType?: string
  password?: string
  email?: string
  avatarUrl?: string
  subscription?: ISubscription | null
  stripeCustomerId?: string | null
}


