// https://vueuse.org/core/useNetwork/
const { isOnline } = useNetwork()


// Request interceptor
axiosIntance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    
    // Add auth token if available
    const jwtAccessToken = cookies.get(ERP_STORAGE_KEYS.JWT_ACCESS_TOKEN)

    if (jwtAccessToken && config.headers) {
      config.headers.Authorization = `Bearer ${jwtAccessToken}`
    }
    
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)


async function checkInternetConnection(): Promise<Boolean> {
  /**
   * prevent request from firing in the first place,
   * if there's no internet connection and backend server if hosted online
   */
  if (import.meta.env.VITE_ERP_SERVER_IS_REMOTE)  {
    return true
  }

  return true
}

async function checkIfSessionIsValid(): Promise<Boolean> {
  
  return true
}