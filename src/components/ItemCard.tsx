import type { Item } from '../types/item';
import { RarityBadge } from './RarityBadge';

interface ItemCardProps {
  item: Item;
  onEdit: (item: Item) => void;
  onDelete: (id: string) => void;
}

export function ItemCard({ item, onEdit, onDelete }: ItemCardProps) {
  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete "${item.name}"?`)) {
      onDelete(item.id);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden flex flex-col h-full">
      {/* Image Section */}
      {item.picture && (
        <div className="w-full h-80 bg-gray-200 dark:bg-gray-700 overflow-hidden">
          <img
            src={item.picture}
            alt={item.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform"
            onError={(e) => {
              e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23ddd" width="200" height="200"/%3E%3Ctext x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23999" font-size="14"%3EImage not found%3C/text%3E%3C/svg%3E';
            }}
          />
        </div>
      )}

      {/* Content Section */}
      <div className="p-4 grow flex flex-col">
        {/* Header with Name and Rarity */}
        <div className="mb-2">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            {item.name}
          </h3>
          <RarityBadge rarity={item.rarity} />
        </div>

        {/* Type */}
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
          <span className="font-semibold">Type:</span> {item.type}
        </p>

        {/* Components */}
        {item.components.length > 0 && (
          <div className="mb-3">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
              Components:
            </p>
            <div className="flex flex-wrap gap-1">
              {item.components.map((component, idx) => (
                <span
                  key={idx}
                  className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded"
                >
                  {component}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-300 grow mb-4">
          {item.description}
        </p>

        {/* Actions */}
        <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => onEdit(item)}
            className="flex-1 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded font-semibold transition-colors"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded font-semibold transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
