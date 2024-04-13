<script setup lang="ts">
import './assets/styles.css'
import { RouterLink, RouterView } from 'vue-router'
import ErrorBoundary from './components/ErrorBoundary.vue'
</script>

<template>
  <ErrorBoundary>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/create">Create</RouterLink>
    </nav>
    <RouterView />
  </ErrorBoundary>
</template>

<style>
body {
  width: 50%;
  margin: auto;
}

nav {
  display: flex;
  height: 8vh;
}

a {
  margin: 20px 10px 10px 0;
}
</style>
