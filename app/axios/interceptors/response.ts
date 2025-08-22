axiosApiClient.interceptors.response.use(
  (response: AxiosResponse) => {

    // Handle successful responses
    console.log('Response received:', response.status, response.config.url)
    return response
  },
  (error: AxiosError) => {
    
    // Handle error responses
    if (error.response) {
      const { status, data } = error.response
      
      switch (status) {
        case 401:

          // Unauthorized - redirect to login or refresh token
          localStorage.removeItem('auth_token')
          window.location.href = '/login'
          break
        case 403:

          // Forbidden
          console.error('Access forbidden:', (data as any)?.message)
          break
        case 404:

          // Not found
          console.error('Resource not found:', error.config?.url)
          break
        case 500:

          // Server error
          console.error('Server error:', (data as any)?.message)
          break

        default:
          console.error('API Error:', status, (data as any)?.message)
      }
    } 
    else if (error.request) {

      // Network error
      console.error('Network error:', error.request)
    } 
    else {

      throw error
    }
    
    return Promise.reject(error)
  }
)