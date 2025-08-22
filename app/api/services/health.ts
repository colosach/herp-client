export const healthCheckService = {
  health: async (): Promise<AxiosResponse> => {
    return await axiosClient.get('/health')
  }
}
