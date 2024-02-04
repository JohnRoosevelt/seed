import { acceptHMRUpdate, defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useAccountStore = defineStore('account', () => {
  /**
   * Current named of the user.
   */
  const info = $(useStorage('user', { id: '', name: '', token: '' }))
  const RELATIONS = new Store('relations')
  let relations = $ref([])
  let msgs = $ref([])

  async function getRelations() {
    // relations = await RELATIONS.getAll()
    relations = await RELATIONS.query('createdAt', 'desc')
  }

  async function getRelationById(id) {
    return await RELATIONS.get(id)
  }

  async function bulkRelation(rz) {
    await RELATIONS.bulkDocs(rz)
    getRelations()
  }

  async function addRelation(msg) {
    if (!msg.createdAt)
      msg.createdAt = Date.now()
    await RELATIONS.add(msg)
    getRelations()
  }

  async function removeRelation(id) {
    await RELATIONS.remove(id)
    getRelations()
  }

  async function updateRelation(msg) {
    await RELATIONS.update(msg)
    getRelations()
  }

  async function getMsgs(id) {
    const collection = new Store(String(id))
    // msgs = await collection.getAll()
    msgs = await collection.query('createdAt', 'asc')
    nextTick(() => {
      const [lastMsg] = msgs.slice(-1)
      Logger.log(lastMsg._id)
      const element = document.getElementById(lastMsg._id)
      element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
    })
  }

  async function addMsg(msg) {
    const { type, toId, fromId, content } = msg
    const id = fromId === info.id ? toId : fromId
    if (!id)
      return
    msg.createdAt = msg.createdAt ? msg.createdAt : Date.now()
    msg.sendAt = msg.sendAt ? msg.sendAt : -1
    msg.readAt = msg.readAt ? msg.readAt : -1
    const collection = new Store(String(id))
    const doc = await collection.add(msg)
    await getMsgs(id)
    const relation = await getRelationById(id)
    relation.text = type === 'text' ? content : '多媒体'
    relation.createdAt = Date.now()
    await updateRelation(relation)
    return doc
  }

  async function clearMsgs(id) {
    if (!id)
      return
    const collection = new Store(String(id))
    await collection.destroy()
    msgs = []
  }

  async function updateMsg(id, msg) {
    if (!id || !msg)
      return
    const collection = new Store(String(id))
    await collection.update(msg)
    getMsgs(id)
  }

  // Logger.log(info)

  return $$({
    info,
    relations,
    bulkRelation,
    getRelations,
    addRelation,
    removeRelation,
    updateRelation,
    getRelationById,
    msgs,
    getMsgs,
    addMsg,
    clearMsgs,
    updateMsg,
  })
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
