import { useState, useEffect, useCallback } from 'react';
import type { Item, ItemFormData } from '../types/item';
import { convertGoogleDriveUrl } from '../utils/imageUrl';

const STORAGE_KEY = 'dnd-items';

// Sample D&D items for initial vault population
const SAMPLE_ITEMS: Item[] = [
  {
    id: '1',
    name: 'Sword of Flame',
    picture: 'https://images.unsplash.com/photo-1608873528500-42ed792924aa?w=400&h=400&fit=crop',
    rarity: 'rare',
    type: 'Weapon',
    components: ['Iron Ore', 'Dragon Scale', 'Phoenix Feather'],
    description: 'A legendary blade that crackles with magical fire. Deals an extra 2d6 fire damage on hit.',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '2',
    name: 'Cloak of Shadows',
    picture: 'https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=400&h=400&fit=crop',
    rarity: 'uncommon',
    type: 'Armor',
    components: ['Shadow Silk', 'Raven Feather', 'Obsidian'],
    description: 'A dark, flowing cloak that grants advantage on stealth checks. The wearer becomes harder to see in shadows.',
    createdAt: new Date(Date.now() - 777600000).toISOString(),
    updatedAt: new Date(Date.now() - 777600000).toISOString(),
  },
  {
    id: '3',
    name: 'Potion of Greater Healing',
    picture: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=400&fit=crop',
    rarity: 'common',
    type: 'Consumable',
    components: ['Healing Herb', 'Crystal Vial', 'Moonflower'],
    description: 'A shimmering red potion that restores 4d4+4 hit points when consumed. Glows softly in the dark.',
    createdAt: new Date(Date.now() - 604800000).toISOString(),
    updatedAt: new Date(Date.now() - 604800000).toISOString(),
  },
  {
    id: '4',
    name: 'Ring of Protection',
    picture: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop',
    rarity: 'uncommon',
    type: 'Accessory',
    components: ['Gold', 'Protective Sigil', 'Sapphire'],
    description: 'A simple gold ring engraved with protective runes. The wearer gains +1 to AC and saving throws.',
    createdAt: new Date(Date.now() - 432000000).toISOString(),
    updatedAt: new Date(Date.now() - 432000000).toISOString(),
  },
  {
    id: '5',
    name: 'Wand of Firebolt',
    picture: 'https://images.unsplash.com/photo-1579644186544-b5b1b401b999?w=400&h=400&fit=crop',
    rarity: 'rare',
    type: 'Magical Item',
    components: ['Ash Wood', 'Ruby', 'Phoenix Ash', 'Mithril'],
    description: 'A powerful wand carved from ash wood and topped with a glowing ruby. Can cast Firebolt up to 3 times per day.',
    createdAt: new Date(Date.now() - 259200000).toISOString(),
    updatedAt: new Date(Date.now() - 259200000).toISOString(),
  },
  {
    id: '6',
    name: 'Boots of Speed',
    picture: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    rarity: 'uncommon',
    type: 'Armor',
    components: ['Leather', 'Quicksilver', 'Pegasus Feather'],
    description: 'Enchanted boots that increase your walking speed by 10 feet. Once per day you can use them to Dash as a bonus action.',
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    updatedAt: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: '7',
    name: 'Amulet of Health',
    picture: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop',
    rarity: 'very-rare',
    type: 'Accessory',
    components: ['Blessed Silver', 'Moonstone', 'Unicorn Hair', 'Holy Water'],
    description: 'A shimmering amulet that maintains your Constitution at 19 while wearing it. A powerful healing artifact.',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '8',
    name: 'Scroll of Wish',
    picture: 'https://images.unsplash.com/photo-1507842217343-583f20270319?w=400&h=400&fit=crop',
    rarity: 'legendary',
    type: 'Scroll',
    components: ['Vellum Paper', 'Dragon Ink', 'Star Dust', 'Essence of Wish'],
    description: 'A rare magical scroll containing the most powerful spell. Can be used once to cast the Wish spell without material cost.',
    createdAt: new Date(Date.now() - 259200000).toISOString(),
    updatedAt: new Date(Date.now() - 259200000).toISOString(),
  },
  {
    id: '9',
    name: 'Bag of Holding',
    picture: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
    rarity: 'rare',
    type: 'Wondrous Item',
    components: ['Extradimensional Fabric', 'Spell Thread', 'Portable Portal'],
    description: 'A magical backpack with seemingly infinite capacity. Weighs only 15 pounds and can hold up to 500 pounds of cargo.',
    createdAt: new Date(Date.now() - 432000000).toISOString(),
    updatedAt: new Date(Date.now() - 432000000).toISOString(),
  },
  {
    id: '10',
    name: 'Helm of Telepathy',
    picture: 'https://images.unsplash.com/photo-1555808528-3da3cdc1be7f?w=400&h=400&fit=crop',
    rarity: 'uncommon',
    type: 'Armor',
    components: ['Mithril', 'Amethyst', 'Mind Gem', 'Silver Thread'],
    description: 'A lightweight helm that allows the wearer to cast Detect Thoughts and to sense the presence of thinking creatures within 1 mile.',
    createdAt: new Date(Date.now() - 604800000).toISOString(),
    updatedAt: new Date(Date.now() - 604800000).toISOString(),
  },
];

/**
 * Custom hook for managing items with localStorage persistence
 * Provides CRUD operations: create, read, update, delete, getAll
 */
export function useItems() {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load items from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setItems(Array.isArray(parsed) ? parsed : []);
      } else {
        // Initialize with sample items on first load
        setItems(SAMPLE_ITEMS);
      }
    } catch (error) {
      console.error('Failed to load items from localStorage:', error);
      // If there's an error, fall back to sample items
      setItems(SAMPLE_ITEMS);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save items to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      } catch (error) {
        console.error('Failed to save items to localStorage:', error);
      }
    }
  }, [items, isLoading]);

  // Generate a simple UUID fallback (since crypto.randomUUID might not be available in all contexts)
  const generateId = useCallback(() => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  const createItem = useCallback(
    (formData: ItemFormData): Item => {
      const now = new Date().toISOString();
      const convertedPicture = convertGoogleDriveUrl(formData.picture);

      const newItem: Item = {
        id: generateId(),
        name: formData.name,
        picture: convertedPicture,
        rarity: formData.rarity,
        type: formData.type,
        components: formData.components
          .split(',')
          .map((c) => c.trim())
          .filter((c) => c.length > 0),
        description: formData.description,
        createdAt: now,
        updatedAt: now,
      };

      setItems((prevItems) => [...prevItems, newItem]);
      return newItem;
    },
    [generateId]
  );

  const updateItem = useCallback(
    (id: string, formData: ItemFormData): Item | null => {
      const now = new Date().toISOString();
      const convertedPicture = convertGoogleDriveUrl(formData.picture);

      let updatedItem: Item | null = null;

      setItems((prevItems) =>
        prevItems.map((item) => {
          if (item.id === id) {
            updatedItem = {
              ...item,
              name: formData.name,
              picture: convertedPicture,
              rarity: formData.rarity,
              type: formData.type,
              components: formData.components
                .split(',')
                .map((c) => c.trim())
                .filter((c) => c.length > 0),
              description: formData.description,
              updatedAt: now,
            };
            return updatedItem;
          }
          return item;
        })
      );

      return updatedItem;
    },
    []
  );

  const deleteItem = useCallback((id: string): boolean => {
    let deleted = false;
    setItems((prevItems) => {
      const filtered = prevItems.filter((item) => item.id !== id);
      deleted = filtered.length < prevItems.length;
      return filtered;
    });
    return deleted;
  }, []);

  const getItem = useCallback(
    (id: string): Item | undefined => {
      return items.find((item) => item.id === id);
    },
    [items]
  );

  const getAllItems = useCallback((): Item[] => {
    return items;
  }, [items]);

  return {
    items,
    isLoading,
    createItem,
    updateItem,
    deleteItem,
    getItem,
    getAllItems,
  };
}
