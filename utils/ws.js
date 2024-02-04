import { useStorage } from '@vueuse/core'

const heartbeat = {
  message: JSON.stringify({ type: 'HEARTBEAT' }),
  interval: 12000,
}

function connect(msg) {
  const user = $(useStorage('user', { id: '', name: '', token: '' }))
  const url = `${CONST.wsHost}/websocket/${user.token}`

  const ws = new WebSocket(url)

  ws.onopen = () => {
    Logger.log('ws is open ......', ws.readyState)

    Timer.ws = {
      interval: heartbeat.interval,
      fun() {
        if (ws && ws.readyState === 1) {
          ws.send(heartbeat.message)
          return
        }
        delete Timer.ws
      },
    }
    if (msg)
      ws.send(JSON.stringify(msg))
  }

  ws.onclose = () => {
    Logger.log('ws closed')
    delete Timer.ws
  }

  ws.onerror = (error) => {
    console.error('ws error:', error)
  }

  ws.onmessage = async (msg) => {
    // const data = JSON.parse(msg.data)
    const data = JSON.parse(msg.data)
    const { type, payload } = data
    const { addRelation, updateRelation, updateMsg, addMsg } = $(useAccountStore())
    const now = Date.now()

    Logger.log({ type })
    if (type === 'FRIENDREQ') {
      await addRelation({ type: 1, _id: payload.fromId, name: payload.fromName, status: 1, isReq: false, createdAt: data.time })
      return
    }

    if (type === 'FRIENDRES') {
      Logger.log(data)
      await updateRelation({
        _id: payload.fromId,
        status: payload.isAggree ? 2 : 3,
        text: payload.isAggree ? '对方同意了你的好友请求' : '对方拒绝了你的好友请求',
        createdAt: data.time || now,
      })
      return
    }

    // MSG
    if (type === 'MSG') {
      ws.send(JSON.stringify({ type: 'MSGREAD', payload: { ...payload, fromId: payload.toId, toId: payload.fromId, readAt: now } }))
      await addMsg({ ...payload, readAt: now, sendAt: now })
      return
    }

    // MSGACK
    if (type === 'MSGACK') {
      nextTick(async () => {
        await updateMsg(payload.payload.toId, {
          _id: payload.payload._id,
          sendAt: now,
        })
      })
    }

    // MSGREAD
    if (type === 'MSGREAD') {
      setTimeout(() => {
        nextTick(async () => {
          await updateMsg(payload.fromId, {
            _id: payload._id,
            readAt: payload.readAt,
          })
        })
      }, 50)
    }

    // if (data.type === 'OFFER')
    //   ROOM.ev.trigger({ type: data.type, data: { src: data.src, dst: data.dst, payload: data.payload } })
  }
  return ws
}

export const WS = { ws: { readyState: -1, send: null }, connect }
