import PouchDB from 'pouchdb'
import PouchFind from 'pouchdb-find'

PouchDB.plugin(PouchFind)

class DB1 {
  constructor(name) {
    this.db = new PouchDB(name)
  }

  // constructor(name, remote, onChange) {
  //   this.db = new PouchDB(name)

  //   // start sync in pull mode
  //   PouchDB.sync(name, `${remote}/${name}`, {
  //     live: true,
  //     retry: true,
  //   }).on('change', (info) => {
  //     onChange(info)
  //   })
  // }

  // get all items from storage including details
  async getAll() {
    try {
      const db = await this.db.allDocs({ include_docs: true })
      const rz = await db.rows.map(row => row.doc)
      return rz
    }
    catch (error) {
      Logger.error(error)
      return []
    }
  }

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
  }

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
  }

  async save(item) {
    try {
      return item._id ? await this.update(item) : await this.add(item)
    }
    catch (error) {
      Logger.error(error)
      return null
    }
  }

  async bulkDocs(items) {
    try {
      const rz = await this.db.bulkDocs(items)
      Logger.log(rz)
      return rz
    }
    catch (error) {
      Logger.error(error)
    }
  }

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
  }

  async destroy() {
    try {
      await this.db.destroy()
    }
    catch (error) {
      Logger.error(error)
    }
  }

  async update(item) {
    try {
      const doc = await this.db.get(item._id)
      Object.assign(doc, item)
      return await this.db.put(doc)
    }
    catch (error) {
      Logger.error(error)
      return null
    }
  }

  async remove(id) {
    try {
      const doc = await this.db.get(String(id))
      return await this.db.remove(doc)
    }
    catch (error) {
      Logger.error(error)
      return null
    }
  }

  find(indexAry, queryObj) {
    const db = this.db
    return db.createIndex({
      index: {
        fields: [...indexAry],
      },
    }).then(() => {
      return db.find({
        selector: {
          ...queryObj,
        },
      })
    })
  }
}

export const DB = DB1
