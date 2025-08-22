import CryptoJS from 'crypto-js'

export function useCrypto() {
  // https://nuxt.com/docs/4.x/guide/going-further/runtime-config
  const config = useRuntimeConfig()

  function encryptData(data: any | null) {
    if(!data) return null

    const ciphertext = CryptoJS.AES
      .encrypt(JSON.stringify(data), config.public.erpCryptoKey)
      .toString()

    if(!ciphertext) return null
    return ciphertext
  }
  
  function decryptData(ciphertext: string | null) {
    if (!ciphertext) return null

    const bytes = CryptoJS.AES.
      decrypt(ciphertext, config.public.erpCryptoKey)

    const decryptedData = bytes.toString(CryptoJS.enc.Utf8)
    
    if (!decryptedData) return null
    return JSON.parse(decryptedData)
  }
  
  
  return {
    encryptData,
    decryptData
  }
}