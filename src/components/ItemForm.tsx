import { useState, useEffect } from 'react';
import type { Item, ItemFormData, Rarity } from '../types/item';
import { isValidImageUrl } from '../utils/imageUrl';

interface ItemFormProps {
  item?: Item;
  onSubmit: (formData: ItemFormData) => void;
  onCancel: () => void;
}

const rarityOptions: Rarity[] = [
  'common',
  'uncommon',
  'rare',
  'very-rare',
  'legendary',
  'artifact',
];

export function ItemForm({ item, onSubmit, onCancel }: ItemFormProps) {
  const [formData, setFormData] = useState<ItemFormData>({
    name: '',
    picture: '',
    rarity: 'common',
    type: '',
    components: '',
    description: '',
  });

  const [errors, setErrors] = useState<Partial<ItemFormData>>({});

  // Initialize form with item data if editing
  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name,
        picture: item.picture,
        rarity: item.rarity,
        type: item.type,
        components: item.components.join(', '),
        description: item.description,
      });
    }
  }, [item]);

  const validateForm = (): boolean => {
    const newErrors: Partial<ItemFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.type.trim()) {
      newErrors.type = 'Type is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (formData.picture.trim() && !isValidImageUrl(formData.picture)) {
      newErrors.picture = 'Invalid image URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name as keyof ItemFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {item ? 'Edit Item' : 'Create New Item'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1"
              >
                Item Name *
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Sword of Flame"
                className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Picture URL */}
            <div>
              <label
                htmlFor="picture"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1"
              >
                Picture URL (Google Drive or external)
              </label>
              <input
                id="picture"
                type="text"
                name="picture"
                value={formData.picture}
                onChange={handleChange}
                placeholder="https://drive.google.com/file/d/FILE_ID/view"
                className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.picture ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
              />
              {errors.picture && (
                <p className="text-red-500 text-sm mt-1">{errors.picture}</p>
              )}
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Paste your Google Drive shareable link or any image URL
              </p>
            </div>

            {/* Rarity */}
            <div>
              <label
                htmlFor="rarity"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1"
              >
                Rarity *
              </label>
              <select
                id="rarity"
                name="rarity"
                value={formData.rarity}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {rarityOptions.map((rarity) => (
                  <option key={rarity} value={rarity}>
                    {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Type */}
            <div>
              <label
                htmlFor="type"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1"
              >
                Type *
              </label>
              <input
                id="type"
                type="text"
                name="type"
                value={formData.type}
                onChange={handleChange}
                placeholder="e.g., Weapon, Armor, Potion"
                className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.type ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
              />
              {errors.type && (
                <p className="text-red-500 text-sm mt-1">{errors.type}</p>
              )}
            </div>

            {/* Components */}
            <div>
              <label
                htmlFor="components"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1"
              >
                Components (comma-separated)
              </label>
              <input
                id="components"
                type="text"
                name="components"
                value={formData.components}
                onChange={handleChange}
                placeholder="e.g., Iron Ore, Leather, Dragon Scale"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Enter component names separated by commas
              </p>
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1"
              >
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe this item..."
                rows={4}
                className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                  errors.description ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description}</p>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors"
              >
                {item ? 'Update Item' : 'Create Item'}
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
