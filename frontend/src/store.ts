import { reactive, type Ref } from 'vue'

const API_URL = 'http://localhost:3000'

type User = {
  id: string
  first_name: string
  last_name: string
  email: string
}

type NewUser = Omit<User, 'id'>

type Store = {
  users: User[]
  total: number
  isUserAdded: boolean
  isLoading: boolean
  error: string | null
  getUsers(page: Ref<number>, pageSize: number): Promise<void>
  createUser(user: NewUser): Promise<void>
}

export const store = reactive<Store>({
  users: [],
  total: 0,
  isUserAdded: false,
  error: null,
  isLoading: false,

  async getUsers(page: Ref<number>, pageSize: number) {
    this.isLoading = true
    const rawRes = await fetch(`${API_URL}/users?page=${page.value}&pageSize=${pageSize}`, {
      method: 'GET'
    })
    const res = await rawRes.json()
    this.isLoading = false
    this.users = res.data
    this.total = res.total
  },

  async createUser(user: NewUser) {
    const res = await fetch(`${API_URL}/users`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (res.status === 201) {
      this.isUserAdded = true
    } else {
      this.error = await res.text()
    }
  }
})
