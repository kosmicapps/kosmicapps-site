// Shared access key storage for admin authentication
// In production, this should be replaced with Redis or a database

interface AccessKeyData {
  key: string;
  email: string;
  username: string;
  createdAt: string;
}

// In-memory storage for access keys
const accessKeys = new Map<string, AccessKeyData>();

export const accessKeyStore = {
  // Store an access key
  set(email: string, data: AccessKeyData): void {
    accessKeys.set(email, data);
    console.log('Access key stored for:', email);
  },

  // Get an access key
  get(email: string): AccessKeyData | undefined {
    return accessKeys.get(email);
  },

  // Delete an access key
  delete(email: string): boolean {
    const deleted = accessKeys.delete(email);
    if (deleted) {
      console.log('Access key deleted for:', email);
    }
    return deleted;
  },

  // Clear all access keys (for cleanup)
  clear(): void {
    accessKeys.clear();
    console.log('All access keys cleared');
  },

  // Get all stored keys (for debugging)
  getAll(): Map<string, AccessKeyData> {
    return new Map(accessKeys);
  }
};
