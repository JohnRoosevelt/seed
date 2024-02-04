import { acceptHMRUpdate, defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useAccountStore = defineStore('account', () => {
  /**
   * Current named of the user.
   */
  const info = $(useStorage('user', { id: '', name: '', token: '' }))
  let relations = $ref([])
  let msgs = $ref([])

  function getCollection(name) {
    return new Store(String(name))
  }

  async function getRelations() {
    // relations = await RELATIONS.getAll()
    const RELATIONS = getCollection('relations')
    relations = await RELATIONS.query('createdAt', 'desc')
  }

  async function getRelationById(id) {
    const RELATIONS = getCollection('relations')
    return await RELATIONS.get(id)
  }

  async function bulkRelation(rz) {
    const RELATIONS = getCollection('relations')
    await RELATIONS.bulkDocs(rz)
    getRelations()
  }

  async function addRelation(msg) {
    if (!msg.createdAt)
      msg.createdAt = Date.now()
    const RELATIONS = getCollection('relations')
    await RELATIONS.add(msg)
    getRelations()
  }

  async function removeRelation(id) {
    const RELATIONS = getCollection('relations')
    await RELATIONS.remove(id)
    getRelations()
  }

  async function updateRelation(msg) {
    const RELATIONS = getCollection('relations')
    await RELATIONS.update(msg)
    getRelations()
  }

  async function getMsgs(id) {
    const collection = getCollection(String(id))
    // msgs = await collection.getAll()
    msgs = await collection.query('createdAt', 'asc')
    nextTick(() => {
      const [lastMsg] = msgs.slice(-1)
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
    const collection = getCollection(id)
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
    const collection = getCollection(id)
    await collection.destroy()
    msgs = []
  }

  async function updateMsg(id, msg) {
    if (!id || !msg)
      return
    const collection = getCollection(id)
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
