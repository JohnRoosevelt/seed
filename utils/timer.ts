export interface TimerItem {
  fun: Function
  latestTime?: number
  interval: number
}

export const Timer: { [key: string]: TimerItem } = {}

setInterval(() => {
  for (const key in Timer) {
    const { interval, latestTime, fun } = Timer[key]
    const timeGap = latestTime ? Date.now() - latestTime : interval
    if (timeGap >= interval) {
      Timer[key].latestTime = Date.now()
      fun()
    }
  }
}, 1000)
