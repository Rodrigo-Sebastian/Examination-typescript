// src/api/services/api.ts
import { fetchApi } from '../../utils/fetch';
import { MenuResponse, MenuItem, Order, Tenant } from '../types';

// Hämta alla menyobjekt
export const getMenu = async (): Promise<MenuResponse> => {
  const data = await fetchApi<MenuResponse>('https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/menu');
  return data; // Här returneras { items: [...] }
};

// Hämta en specifik menyobjekt
export const getMenuItem = async (id: number): Promise<MenuItem> => {
  const data = await fetchApi<MenuItem>(`https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/menu/${id}`);
  return data;
};

// Skapa en Tenant (Food truck)
export const createTenant = async (name: string): Promise<Tenant> => {
  const data = await fetchApi<Tenant>('https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/tenants', {
    method: 'POST',
    body: JSON.stringify({ name }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return data;
};

// Skicka en beställning
export const createOrder = async (tenantId: string, items: number[]): Promise<Order> => {
  const data = await fetchApi<Order>(`https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/${tenantId}/orders`, {
    method: 'POST',
    body: JSON.stringify({ items }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return data;
};

