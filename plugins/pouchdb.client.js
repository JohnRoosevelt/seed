import PouchDB from 'pouchdb'
import PouchFind from 'pouchdb-find'

PouchDB.plugin(PouchFind)

export default defineNuxtPlugin({
  name: 'PouchDB',
  enforce: 'post',
  env: {
    islands: false,
  },
  setup() {
    return {
      provide: {
        PouchDB,
      },
    }
  },
})
