import { useState } from 'react';
import { useItems } from './hooks/useItems';
import type { Item, ItemFormData } from './types/item';
import { ItemGrid } from './components/ItemGrid';
import { ItemForm } from './components/ItemForm';
import './App.css';

function App() {
  const { items, createItem, updateItem, deleteItem } = useItems();
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | undefined>(undefined);

  const handleCreateNew = () => {
    setEditingItem(undefined);
    setShowForm(true);
  };

  const handleEdit = (item: Item) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleFormSubmit = (formData: ItemFormData) => {
    if (editingItem) {
      updateItem(editingItem.id, formData);
    } else {
      createItem(formData);
    }
    setShowForm(false);
    setEditingItem(undefined);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingItem(undefined);
  };

  const handleDelete = (id: string) => {
    deleteItem(id);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ItemGrid
        items={items}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreateNew={handleCreateNew}
      />
      {showForm && (
        <ItemForm
          item={editingItem}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      )}
    </div>
  );
}

export default App;
