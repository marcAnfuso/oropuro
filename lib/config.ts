/**
 * Multi-tenant configuration loader
 * Supports multiple clients/casinos with different KOMMO + backend configs
 */

import clientsConfig from '@/config/clients.json';

export interface KommoConfig {
  access_token: string;
  subdomain: string;
  whatsapp_scope_id?: string;
  username_field_id: number;
  password_field_id: number;
  comprobante_status_id: number;
}

export interface BackendConfig {
  type: string; // 'bet30', 'custom', etc
  api_url: string;
  api_token: string;
  skin_id?: string;
  proxy_url?: string | null;
}

export interface ClientConfig {
  name: string;
  kommo: KommoConfig;
  backend: BackendConfig;
}

/**
 * Resolve environment variable references in config values
 * "env:VAR_NAME" → process.env.VAR_NAME
 */
function resolveEnvVar(value: string | number | null | undefined): string | null {
  if (typeof value !== 'string') return value?.toString() || null;

  if (value.startsWith('env:')) {
    const envVarName = value.substring(4); // Remove 'env:' prefix
    const envValue = process.env[envVarName];

    if (!envValue) {
      console.warn(`[Config] Environment variable ${envVarName} not found`);
      return null;
    }

    return envValue.trim();
  }

  return value;
}

/**
 * Get configuration for a specific client
 */
export function getClientConfig(clientId: string): ClientConfig | null {
  const rawConfig = clientsConfig.clients[clientId as keyof typeof clientsConfig.clients];

  if (!rawConfig) {
    console.error(`[Config] Client '${clientId}' not found in config`);
    return null;
  }

  // Resolve all env vars in the config
  return {
    name: rawConfig.name,
    kommo: {
      access_token: resolveEnvVar(rawConfig.kommo.access_token) || '',
      subdomain: rawConfig.kommo.subdomain,
      whatsapp_scope_id: resolveEnvVar(rawConfig.kommo.whatsapp_scope_id) || undefined,
      username_field_id: rawConfig.kommo.username_field_id,
      password_field_id: rawConfig.kommo.password_field_id,
      comprobante_status_id: rawConfig.kommo.comprobante_status_id,
    },
    backend: {
      type: rawConfig.backend.type,
      api_url: rawConfig.backend.api_url,
      api_token: resolveEnvVar(rawConfig.backend.api_token) || '',
      skin_id: rawConfig.backend.skin_id,
      proxy_url: resolveEnvVar(rawConfig.backend.proxy_url),
    },
  };
}

/**
 * Get all available client IDs
 */
export function getAvailableClients(): string[] {
  return Object.keys(clientsConfig.clients);
}

/**
 * Validate that a client has all required config
 */
export function validateClientConfig(config: ClientConfig): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!config.kommo.access_token) {
    errors.push('KOMMO access_token is missing');
  }

  if (!config.kommo.subdomain) {
    errors.push('KOMMO subdomain is missing');
  }

  if (!config.backend.api_token) {
    errors.push('Backend API token is missing');
  }

  if (!config.backend.api_url) {
    errors.push('Backend API URL is missing');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
