import { defineStore } from 'pinia'
import { ISession } from "~~/types/dto/ISession";
import { IUser } from "@/types/dto/IUser";


export const useAuthStore = defineStore('authStore', {
    state: (): { user: IUser, session: ISession} => ({ 
      user: {} as IUser, 
      session: {} as ISession,
    }),
    getters: {
      getAuthUser: (state) => state.user ,
      getSession: (state) => state.session ,
    },
    actions: {
      increment() {
        
      },
    },
  })