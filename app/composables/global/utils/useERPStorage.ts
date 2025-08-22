export enum ERP_STORAGE_KEYS {
  JWT_ACCESS_TOKEN = 'erp-tk',
  SESSION = 'erp-ssk',
  APP_CONFIG = 'erp-cg',
  LOCALE = 'erp-locale',
}

export function updateStorage(key: string, payload: string): void {
  let storage = useLocalStorage<string | null>(key, null);
  storage.value = payload;
}

export function clearStorage() {

}