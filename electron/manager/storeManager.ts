import Store, { Schema } from "electron-store"

export class StoreManager<T extends Record<string, StoreType> = Record<string, StoreType>> {
  private readonly store: Store<T>

  constructor(name: string, schema?: Schema<T>) {
    this.store = new Store<T>({
      name,
      ...(schema && { schema }),
      encryptionKey: import.meta.env.VITE_STORE_ENCRYPTION_KEY,
    })
  }

  get<K extends keyof T>(key: K): T[K] {
    return this.store.get(key)
  }

  set<K extends keyof T>(key: K, value: T[K]): void {
    this.store.set(key, value)
  }

  delete(key: keyof T): void {
    this.store.delete(key)
  }

  clear(): void {
    this.store.clear()
  }

  getRawStore(): Store<T> {
    return this.store
  }
}
