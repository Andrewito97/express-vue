<script setup lang="ts">
const props = defineProps({
  pages: {
    type: Array as () => number[],
    required: true
  },
  currentPage: {
    type: Number,
    required: true
  },
  setPage: {
    required: true,
    type: Function
  }
})
</script>

<template>
  <ul>
    <li
      v-for="page in props.pages"
      @click="props.setPage(page)"
      :key="page"
      :class="{ active: page === currentPage }"
    >
      {{ page }}
    </li>
  </ul>
</template>

<style scoped>
ul {
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-inline-start: 0;
}

li {
  list-style-type: none;
  cursor: pointer;
  padding: 1em;
}

li.active {
  background-color: var(--primary);
  color: white;
}
</style>
