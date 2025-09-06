export enum ERP_STORAGE_KEYS {
  JWT_ACCESS_TOKEN = 'erp-tk',
  JWT_REFRESH_TOKEN = 'erp-rtk',
  SESSION = 'erp-ssk',
  APP_CONFIG = 'erp-cg',
  LOCALE = 'erp-locale',
  OTP_SESSION = 'erp-os'
}

export interface StorageUpdatePayload {
  key: string,
  target: any,
  encrypt?: boolean
}

const { encryptData } = useCrypto()

export function updateStorage(payload: StorageUpdatePayload): void {
  let target = payload.target

  if (payload.encrypt) {
    target = encryptData(target)
  }

  let storage = useLocalStorage<string | null>(payload.key, target);
  storage.value = target;
}

export function clearStorage(key: ERP_STORAGE_KEYS): void {
  let storage = useLocalStorage<string | null>(key, null);
  storage.value = null
}
