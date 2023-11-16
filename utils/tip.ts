export function tip(value: string, time = 1500, opt = { top: '5%' }) {
  const wrap = document.createElement('div')
  wrap.style.position = 'fixed'
  wrap.style.width = '100vw'
  wrap.style.top = opt.top
  wrap.style.display = 'flex'
  wrap.style.justifyContent = 'center'
  wrap.style.zIndex = '10'
  const ta = document.createElement('span')
  ta.innerHTML = value ?? ''
  ta.style.padding = '4px 8px'
  ta.style.borderRadius = '10px'
  ta.style.background = 'rgba(128,128,128, 0.9)'
  ta.style.color = 'white'
  ta.style.fontSize = '12px'
  wrap.appendChild(ta)

  document.body.appendChild(wrap)
  setTimeout(() => {
    wrap.remove()
  }, time)
}
