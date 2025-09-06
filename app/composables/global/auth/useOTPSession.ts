export const OTP_SESSION_TIMEOUT = 10 * 60 * 1000 // 10 minutes

export interface OTPSessionData {
  email: string | null;
  sessionExpiry: number;
}

const useOTPSession = () => {
  const createOtpSession = (email: string | null) => {
    
    const sessionData: OTPSessionData = {
      email,
      sessionExpiry: Date.now() + OTP_SESSION_TIMEOUT,
    }
    
    localStorage.setItem(
      ERP_STORAGE_KEYS.OTP_SESSION, 
      JSON.stringify(sessionData)
    )
  }
  
  const getOtpSession = () => {
    const stored = localStorage.getItem(ERP_STORAGE_KEYS.OTP_SESSION)

    if (!stored) return null
    
    const session: OTPSessionData = JSON.parse(stored)
    
    // Check if session expired
    if (Date.now() > session?.sessionExpiry) {
      clearOtpSession()
      return null
    }
    
    return session
  }
  
  const isCodeExpired = () => {
    const session = getOtpSession()
    return session ? Date.now() > session.sessionExpiry : true
  }
  
  const clearOtpSession = () => {
    localStorage.removeItem(ERP_STORAGE_KEYS.OTP_SESSION)
  }
  
  return {
    createOtpSession,
    getOtpSession,
    isCodeExpired,
    clearOtpSession
  }
}

export default useOTPSession