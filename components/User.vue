<template>
  <div ref="userActions" class="hidden md:flex items-center dark:text-white justify-end flex-1 lg:w-0">
    <span class="mr-2">
      Welcome <strong>{{ user.username }}</strong>

    </span>
    <img  @click="hideActions = !hideActions" :src="avatar(user.avatarUrl)" class="rounded-full w-10 h-10 mr-2"
      alt="avatar" />

    <ul
      :class="[{ hidden: hideActions }]"
      class="dropdown-menu min-w-max absolute bottom bg-white text-base z-100 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 top- m-0 bg-clip-padding border-none"
      aria-labelledby="dropdownMenuButton1"
    >
      <li v-if="isLoggedIn" @click="logout()">
        <a
          class="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
          href="#"
          >logout </a
        >
      </li>
      <li v-if="!isLoggedIn">
        <NuxtLink
          class="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
          href="/register"
          >Register</NuxtLink
        >
      </li>
      <li v-if="!isLoggedIn" @click="login">
        <NuxtLink
          class="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
          href="/login"
          >Login</NuxtLink
        >
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { IUser } from '@/types/dto';
import { userLogout, userLogin } from '@/composables/useAuth';
import { useState } from '#app';
import { onClickOutside } from '@vueuse/core';
import { PropType } from 'vue';

const avatar = (given: string | undefined) => given ?? '/img/logo_short.png';

const user = useState<IUser>('user').value;

const hideActions = ref(true); 
const userActions = ref(null);

defineProps({
    user: { type: Object as PropType<IUser>, required: true },
    isLoggedIn: { type: Boolean, required: true}
})

const logout = () => { return userLogout(); }

function login () { 
  // @ts-ignore
  return userLogin(user.email, user.password)
}

onClickOutside(userActions, () => (hideActions.value = true));
</script>
