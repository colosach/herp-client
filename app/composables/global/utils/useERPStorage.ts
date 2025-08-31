export enum ERP_STORAGE_KEYS {
  JWT_ACCESS_TOKEN = 'erp-tk',
  JWT_REFRESH_TOKEN = 'erp-rtk',
  SESSION = 'erp-ssk',
  APP_CONFIG = 'erp-cg',
  LOCALE = 'erp-locale',
}

export function updateStorage(key: ERP_STORAGE_KEYS, payload: string): void {
  let storage = useLocalStorage<string | null>(key, null);
  storage.value = payload;
}

export function clearStorage(key: ERP_STORAGE_KEYS): void {
  let storage = useLocalStorage<string | null>(key, null);
  storage.value = null
}
