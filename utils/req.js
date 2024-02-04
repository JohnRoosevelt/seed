import { useStorage } from '@vueuse/core'

export async function Req(url, data) {
  const user = $(useStorage('user', { id: '', name: '', token: '' }))
  try {
    const rz = await $fetch(`${CONST.apiHost}${url}`, {
      headers: {
        Authorization: user.token,
      },
      ...data,
    })
    return rz
  }
  catch (error) {
    Logger.error(error)
    return null
  }
}

export async function WSReq(msg) {
  if (WS.ws.readyState !== 1) {
    WS.ws = WS.connect(msg)
    return
  }

  WS.ws.send(JSON.stringify(msg))
}
