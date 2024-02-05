export function useDB() {
  const { $PouchDB } = useNuxtApp()
  return {
    async getDB(name) {
      return {
        db: new $PouchDB(String(name)),
        async query(prop, sort) {
          try {
            const query = {
              selector: {},
              sort: [],
            }
            if (prop && sort) {
              await this.db.createIndex({
                index: {
                  fields: [prop],
                },
              })
              query.selector[prop] = {
                $gt: null,
              }
              const sortParam = {}
              sortParam[prop] = sort
              query.sort.push(sortParam)
            }
            else {
              Logger.error('query must have filed and sort')
              return []
            }
            const docs = (await this.db.find(query)).docs
            Logger.log(docs)
            return docs
          }
          catch (error) {
            Logger.error(error)
            return null
          }
        },

        async get(id) {
          try {
            Logger.log({ id })
            const doc = await this.db.get(id.toString())
            Logger.log(doc)
            return doc
          }
          catch (error) {
            Logger.error(error)
            return null
          }
        },

        async save(item) {
          try {
            return item._id ? await update(item) : await add(item)
          }
          catch (error) {
            Logger.error(error)
            return null
          }
        },

        async bulkDocs(items) {
          try {
            const rz = await this.db.bulkDocs(items)
            Logger.log(rz)
            return rz
          }
          catch (error) {
            Logger.error(error)
          }
        },

        async add(item) {
          try {
            const doc = await this.db.post(item)
            Logger.log(item, doc)
            return doc
          }
          catch (error) {
            Logger.error(error)
            return null
          }
        },

        async destroy() {
          try {
            await this.db.destroy()
          }
          catch (error) {
            Logger.error(error)
          }
        },

        async update(item) {
          try {
            const doc = await this.db.get(item._id)
            Object.assign(doc, item)
            return await db.put(doc)
          }
          catch (error) {
            Logger.error(error)
            return null
          }
        },

        async remove(id) {
          try {
            const doc = await this.db.get(String(id))
            return await db.remove(doc)
          }
          catch (error) {
            Logger.error(error)
            return null
          }
        },
      }
    },
  }
}
