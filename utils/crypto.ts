import AES from 'crypto-js/aes.js'
import Pkcs7 from 'crypto-js/pad-pkcs7.js'
import ECB from 'crypto-js/mode-ecb.js'
import Utf8 from 'crypto-js/enc-utf8.js'
import Base64 from 'crypto-js/enc-base64.js'

const _aesKey = '33337777' // 8 16 32

function encrypt(rawStr: string, aesKey = _aesKey) {
  rawStr = AES.encrypt(rawStr, Utf8.parse(aesKey), {
    mode: ECB,
    padding: Pkcs7,
  }).toString()
  const wordArray = Utf8.parse(rawStr)
  const base64 = Base64.stringify(wordArray)
  return base64
}
function decrypt(base64: string, aesKey = _aesKey) {
  const parsedWordArray = Base64.parse(base64)
  base64 = parsedWordArray.toString(Utf8)
  const parsedStr = AES.decrypt(base64, Utf8.parse(aesKey), {
    mode: ECB,
    padding: Pkcs7,
  }).toString(Utf8)
  return parsedStr
}

export const CRYPTOJS = {
  encrypt,
  decrypt,
}
