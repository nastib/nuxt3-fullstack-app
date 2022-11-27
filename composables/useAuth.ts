import { useRouter, useState } from '#app';
import { IUser, ISession } from '@/types/dto';
import { FormValidation, InputValidation } from '@/types/FormValidation';

//@ts-ignore ts2366
export async function userRegister(username: string, name: string, email: string, password: string): Promise<FormValidation> {
  try {
    const { data, error } = await useFetch<IUser>('/api/auth/register', {
      method: 'POST',
      body: { username, name, email, password },
    });

    if (error.value) {
      type ErrorData = {
        data: ErrorData;
      };

      const errorData = error.value as unknown as ErrorData;
      const errors = errorData.data.data as unknown as string;
      const res = JSON.parse(errors);
      const errorMap = new Map<string, { check: InputValidation }>(Object.entries(res));

      return { hasErrors: true, errors: errorMap };
    }
    if (data) {
      //useState('user').value = data;
      await useRouter().push('/login');
    }
  } catch (err) {
    // @ts-ignore TS18046
    console.log('error: ' + err.toString());
  }
}

export const useUser = async (): Promise<IUser> => {
  const authCookie = useCookie('auth_token');
  const user = useState<IUser>('user');

  if (authCookie && !user.value) {
    const { data } = await useFetch(`api/auth/userByAuthToken`, {
      // @ts-ignore ts2322
      headers: useRequestHeaders(['cookie']), initialCache: false 
    });

    user.value = data.value as IUser;
  }
  return user.value;
};

export async function userLogout(): Promise<void> {
  console.log('logout');
  
  await useFetch('/api/auth/logout', { initialCache: false  });
  useState('user').value = null;
  await useRouter().push('/');
}

//@ts-ignore ts2366
export async function userLogin(email: string, password: string): Promise<FormValidation> {
  const { data, error } = await useFetch<ISession>('/api/auth/login', { method: 'POST', body: { email: email, password: password }, initialCache: false });

  if (error.value) {
    type ErrorData = {
      data: ErrorData;
    };

    const errorData = error.value as unknown as ErrorData;
    const errors = errorData.data.data as unknown as string;
    const res = JSON.parse(errors);
    const errorMap = new Map<string, { check: InputValidation }>(Object.entries(res));

    return { hasErrors: true, errors: errorMap };
  }

  if (data.value?.user) {
    useState('user').value = data.value.user;
    await useRouter().push('/dashboard');
  }
  // @ts-ignore TS18046
  //console.log('error: ' + err.toString());
}
