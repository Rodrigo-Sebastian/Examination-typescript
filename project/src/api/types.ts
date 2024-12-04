// src/api/types.ts
export interface MenuItem {
  id: number;
  type: 'wonton' | 'dip' | 'drink';
  name: string;
  description: string;
  price: number;
  ingredients?: string[];
}

export interface Order {
  id: string;
  items: MenuItem[];
  orderValue: number;
  eta: string;
  timestamp: string;
  state: 'waiting' | 'processing' | 'completed';
}

export interface Tenant {
  id: string;
  name: string;
}

// Ny typ för att representera API-responsen
export interface MenuResponse {
  items: MenuItem[];
}
