<script setup lang="ts">
import { store } from '../store'
import { reactive, watchEffect } from 'vue'

const user = reactive({
  first_name: '',
  last_name: '',
  email: ''
})

watchEffect(() => {
  if (store.isUserAdded) {
    user.first_name = ''
    user.last_name = ''
    user.email = ''
  }

  store.error = null
})
</script>

<template>
  <h3 v-if="store.isUserAdded">New user added!</h3>
  <h3 class="error" v-if="store.error">{{ store.error }}</h3>

  <form @submit.prevent="store.createUser(user)">
    <label for="first_name">First Name</label>
    <input id="first_name" v-model="user.first_name" />
    <label for="last_name">Last Name</label>
    <input id="last_name" v-model="user.last_name" />
    <label for="email">Email</label>
    <input id="email" v-model="user.email" />
    <button type="submit">Submit</button>
  </form>
</template>

<style scoped>
form {
  width: 25vw;
  display: flex;
  flex-direction: column;
}

label {
  color: var(--primary);
}

input {
  margin-bottom: 2vh;
  font-size: 1.1em;
  padding: 5px;
  border-radius: 0.5em;
}

button {
  width: fit-content;
  padding: 0.5em;
  font-size: 1.1em;
  border: none;
  border-radius: 0.5em;
  background-color: var(--primary);
  color: white;
}

h3.error {
  color: red;
}
</style>
