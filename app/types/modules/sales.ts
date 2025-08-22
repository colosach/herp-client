export interface POS_Item {
  category: String,
  created_at?: String,
  description?: String,
  id: Number,
  name: String,
  price: Number,
  sku?: String,
  stock_quantity: Number,
  updated_at?: String
}

export interface POS_Sale {
  customer_id: Number
  discount?: Number
  items: POS_Item[]
  tax_rate?: Number
}

export interface POS_SaleHistoryItem {
  item_id: POS_Item['id']
  price: POS_Item['price']
  quantity: number
}

export interface POS_SaleHistoryPagination {
  limit?: number
  page?: number
  pages?: number
  total?: number
}

export interface POS_SaleHistorySale {
  created_at: string
  customer_id: number
  discount_amount: number
  id: number
  items: POS_SaleHistoryItem[]
  tax_amount: number
  total_amount: number
}

export interface POS_SaleHistory {
  pagination: POS_SaleHistoryPagination
  sales: POS_SaleHistorySale[]
}
