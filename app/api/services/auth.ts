export const authService = {
  register: async (credentials: Object) => {
    return await apiWrapper(() => 
      apiRequest('/auth/register', { method: 'POST', body: credentials })
    )
  },

  verifyEmail: async (credentials: Object) => {
    return await apiWrapper(() => 
      apiRequest('/auth/verify-email', { method: 'POST', body: credentials })
    )
  },
  
  login: async (credentials: Object) => {
    return await apiWrapper(() => 
      apiRequest('/auth/login', { method: 'POST', body: credentials })
    )
  },

  refreshToken: async (credentials: Object) => {
    return await apiWrapper(() => 
      apiRequest('/auth/refresh-token', { method: 'POST' })
    )
  },

  forgotPassword: async (credentials: Object) => {
    return await apiWrapper(() => 
      apiRequest('/auth/forgot-password', { method: 'POST', body: credentials })
    )
  },

  resetPassword: async (credentials: Object) => {
    return await apiWrapper(() => 
      apiRequest('/auth/reset-password', { method: 'POST', body: credentials })
    )
  },

 logout: async () => {
    return await apiWrapper(() => 
      apiRequest('/auth/logout', { method: 'POST' })
    )
  },
}
