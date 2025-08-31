import CryptoJS from 'crypto-js'

export function useCrypto() {

  function encryptData(data: any | null) {
    if(!data) return null

    const ciphertext = CryptoJS.AES
      .encrypt(JSON.stringify(data), import.meta.env.VITE_ERP_CRYPTO_KEY)
      .toString()

    if(!ciphertext) return null
    return ciphertext
  }
  
  function decryptData(ciphertext: string | null) {
    if (!ciphertext) return null

    const bytes = CryptoJS.AES.
      decrypt(ciphertext, import.meta.env.VITE_ERP_CRYPTO_KEY)

    const decryptedData = bytes.toString(CryptoJS.enc.Utf8)
    
    if (!decryptedData) return null
    return JSON.parse(decryptedData)
  }
  
  
  return {
    encryptData,
    decryptData
  }
}