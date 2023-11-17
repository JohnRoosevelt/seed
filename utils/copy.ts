const { copy: _copy, text: _text } = $(useClipboard({ legacy: true }))

export async function copy(value: string) {
  usePermission('clipboard-read')
  usePermission('clipboard-write')
  await _copy(value)

  if (_text === value)
    tip(`${value.length > 12 ? `${value.slice(0, 5)}...${value.slice(-3)}` : value} 已复制`)
}
