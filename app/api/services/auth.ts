export const authService = {
  login: async (payload: LoginCredentials): Promise<AxiosResponse> => {
    return await axiosApiClient.post('/auth/login', payload)
  },

  refeshToken: async (payload: jwtToken): Promise<AxiosResponse> => {
    return await axiosApiClient.post('/auth/refresh-token', { token: payload })
  },

  logout: async (payload: jwtToken): Promise<AxiosResponse> => {
    return await axiosApiClient.post('/auth/logout', { token: payload })
  },
}
