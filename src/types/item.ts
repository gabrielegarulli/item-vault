export type Rarity = 'common' | 'uncommon' | 'rare' | 'very-rare' | 'legendary' | 'artifact';

export interface Item {
  id: string;
  name: string;
  picture: string; // URL to image (supports Google Drive preview URLs)
  rarity: Rarity;
  type: string;
  components: string[]; // Array of component names; will be extended based on user's structure
  description: string;
  createdAt: string; // ISO 8601 timestamp
  updatedAt: string; // ISO 8601 timestamp
}

export interface ItemFormData {
  name: string;
  picture: string;
  rarity: Rarity;
  type: string;
  components: string; // Comma-separated in form, converted to array
  description: string;
}
