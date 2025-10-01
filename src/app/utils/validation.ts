// Lightweight runtime validation helpers (zod-like minimal)
export type Schema<T> = { [K in keyof T]: 'string' | 'array:string' | 'optional:string' | 'optional:array:string' };

export function validateObject<T extends Record<string, any>>(data: any, schema: Schema<T>, label='object'): data is T {
  if (typeof data !== 'object' || data === null) return false;
  for (const key in schema) {
    const rule = schema[key as keyof T];
    const value = (data as any)[key];
    const optional = rule.startsWith('optional');
    if (value === undefined || value === null) {
      if (optional) continue; else return false;
    }
    if (rule.endsWith('string')) {
      if (rule.includes('array')) {
        if (!Array.isArray(value) || !value.every(v => typeof v === 'string')) return false;
      } else {
        if (typeof value !== 'string') return false;
      }
    }
  }
  return true;
}

// Example schemas could be defined where needed.
