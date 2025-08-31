export const posService = {
  createItem: async (payload: POS_Item) => {
    return await apiRequest('/pos/items', {
      method: 'POST',
      body: payload
    })
  },

  createSale: async (payload: POS_Sale) => {
    return await apiRequest('/pos/sales', {
      method: 'POST',
      body: payload
    })
  },

  getSalesHistory: async (payload?: POS_SaleHistoryPagination) => {
    return await apiRequest('/pos/sales/history', {
      method: 'GET',
      body: payload
    })
  }
}
