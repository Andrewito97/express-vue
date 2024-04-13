<script setup lang="ts">
import { watchEffect } from 'vue'
import { store } from '../store'
import { usePagination } from '../hooks/usePagination'
import PaginationPanel from './PaginationPanel.vue'

const pageSize = 10
let { currentPage, setPage, pages } = usePagination(0, pageSize)

watchEffect(() => {
  const pagination = usePagination(store.total, pageSize)
  currentPage.value = pagination.currentPage.value
  pages = pagination.pages
})

watchEffect(async () => {
  await store.getUsers(currentPage, pageSize)
})
</script>

<template>
  <h3 v-if="store.isLoading">Loading...</h3>
  <table v-else>
    <tbody>
      <tr>
        <th>Id</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Email</th>
      </tr>
      <tr v-for="user in store.users" :key="user.id">
        <td>{{ user.id }}</td>
        <td>{{ user.first_name }}</td>
        <td>{{ user.last_name }}</td>
        <td>{{ user.email }}</td>
      </tr>
    </tbody>
  </table>
  <PaginationPanel :pages="pages" :current-page="currentPage" :set-page="setPage" />
</template>

<style>
table {
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ccc;
  text-align: left;
}

th {
  background-color: var(--primary);
  color: white;
  text-wrap: nowrap;
  padding: 1em;
}

td {
  padding: 0.5em;
}

tr:nth-child(2n) td {
  background-color: var(--secondary);
}
</style>
