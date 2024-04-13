<script setup lang="ts">
import { ref, onErrorCaptured } from 'vue'

let errorMessage = ref('')

onErrorCaptured((err) => {
  errorMessage.value = err.message
})
</script>

<template>
  <div v-if="errorMessage">
    <h2>Error happened</h2>
    <p>{{ errorMessage }}</p>
  </div>
  <slot v-else></slot>
</template>
