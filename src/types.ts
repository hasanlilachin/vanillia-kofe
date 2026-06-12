import { MenuItem } from "./data/menuData";

export interface TrayItem {
  id: string; // unique instance ID for tray item (since multiple same menuItems could be customization-isolated)
  menuItem: MenuItem;
  quantity: number;
  selectedMilk?: string;
  selectedSize?: 'S' | 'M' | 'L';
  selectedSugar?: string;
  notes?: string;
  finalUnitPrice: number;
}

export type Language = 'az' | 'en';

export interface TableInfo {
  tableNumber: string;
  isRegistered: boolean;
}
