export const posService = {
  createItem: async (payload: POS_Item): Promise<AxiosResponse> => {
    return await axiosClient.post('/pos/items', payload)
  },

  createSale: async (payload: POS_Sale): Promise<AxiosResponse> => {
    return await axiosClient.post('/pos/sales', payload)
  },

  getSalesHistory: async (payload?: POS_SaleHistoryPagination): Promise<AxiosResponse> => {
    return await axiosClient.get('/pos/sales/history', payload)
  },
}
