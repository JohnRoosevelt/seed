const heartbeat = {
  message: JSON.stringify({ type: 'HEARTBEAT' }),
  interval: 7000,
}

let ws: undefined | WebSocket

function connect(id: string) {
  if (!id) {
    console.error('id is null')
    return
  }

  const VERSION = '1.4.7'
  const TOKEN = Math.random().toString(36).slice(2)
  const ROOM_ID = 'seed'
  const KEY = 'seed'
  // const url = `wss://0.peerjs.com/${ROOM_ID}?key=${KEY}&id=${id}&token=${TOKEN}&version=${VERSION}`
  const url = `wss://seed.john-76f.workers.dev/${ROOM_ID}?key=${KEY}&id=${id}&token=${TOKEN}&version=${VERSION}`

  ws = new WebSocket(url)

  ws.onopen = () => {
    Logger.log('ws is open ......', ws?.readyState)

    // Timer.ws = {
    //   interval: heartbeat.interval,
    //   fun() {
    //     if (ws && ws.readyState === 1) {
    //       ws.send(heartbeat.message)
    //       return
    //     }
    //     delete Timer.ws
    //   },
    // }
    // ROOM.ev.trigger({ type: 'signalerState', data: ws?.readyState })
    // ROOM.ev.trigger({ type: 'signalerOpen' })
  }

  ws.onclose = () => {
    Logger.log('ws closed')
    delete Timer.ws
    // ROOM.ev.trigger({ type: 'signalerState', data: ws?.readyState })
  }

  ws.onerror = (error) => {
    console.error('ws error:', error)
    // ROOM.ev.trigger({ type: 'signalerState', data: ws?.readyState })
  }

  ws.onmessage = (msg) => {
    // const data = JSON.parse(msg.data)
    Logger.log(msg)
    // if (data.type === 'OFFER')
    //   ROOM.ev.trigger({ type: data.type, data: { src: data.src, dst: data.dst, payload: data.payload } })
  }
}

function close() {
  // trace(ws, ws?.readyState)
  ws?.close()
}

function send(msg: any) {
  if (!ws || ws.readyState !== 1) {
    Logger.log('can not send msg, the signaler is not ready now!', ws?.readyState, Timer)
    return
  }

  ws.send(JSON.stringify(msg))
}

export const WS = { connect, send, close }
