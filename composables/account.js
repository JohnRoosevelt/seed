import { acceptHMRUpdate, defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useAccountStore = defineStore('account', () => {
  /**
   * Current named of the user.
   */
  const info = $(useStorage('user', { id: '', name: '', token: '' }))
  // Logger.log(info)

  return $$({
    info,
  })
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
