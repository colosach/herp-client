export const healthCheckService = {
  health: async () => {
    return await apiRequest('/auth/login', {
      method: 'GET'
    })
  }
}