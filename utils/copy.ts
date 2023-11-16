const { copy: _copy, text: _text } = $(useClipboard({ legacy: true }))

export async function copy(value: string) {
  usePermission('clipboard-read')
  usePermission('clipboard-write')
  await _copy(value)

  if (_text === value) {
    const len = value.length
    tip(`${len > 12 ? `${value.substring(0, 5)}...${value.substring(len - 3)}` : value} 已复制`)
  }
}
