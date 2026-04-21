import type { Item } from '../types/item';
import { ItemCard } from './ItemCard';

interface ItemGridProps {
  items: Item[];
  onEdit: (item: Item) => void;
  onDelete: (id: string) => void;
  onCreateNew: () => void;
}

export function ItemGrid({
  items,
  onEdit,
  onDelete,
  onCreateNew,
}: ItemGridProps) {
  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          D&D Item Vault
        </h1>
        <button
          onClick={onCreateNew}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors"
        >
          + New Item
        </button>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
            No items in your vault yet
          </p>
          <button
            onClick={onCreateNew}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors"
          >
            Create Your First Item
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
