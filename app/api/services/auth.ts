export const authService = {
  register: async (credentials: Object) => {
    return await apiWrapper(() => 
      apiRequest('/auth/register', { method: 'POST', body: credentials })
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

 logout: async () => {
    return await apiWrapper(() => 
      apiRequest('/auth/logout', { method: 'POST' })
    )
  },
}
