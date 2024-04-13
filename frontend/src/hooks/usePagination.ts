import { computed, ref, type ComputedRef, type Ref } from 'vue'

export type Pagination = {
  currentPage: Ref<number>
  pages: ComputedRef<number[]>
  setPage: (page: number) => void
}

export function usePagination(totalItems: number, pageSize: number): Pagination {
  const currentPage = ref(1)

  const pages = computed(() => {
    const totalPages = Math.ceil(totalItems / pageSize)
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  })

  function setPage(page: number) {
    currentPage.value = page
  }

  return {
    currentPage,
    pages,
    setPage
  }
}
