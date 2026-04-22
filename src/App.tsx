import { useState } from 'react';
import { useItems } from './hooks/useItems';
import type { Item, ItemFormData } from './types/item';
import { ItemGrid } from './components/ItemGrid';
import { ItemForm } from './components/ItemForm';
import { AuthProvider, useAuth } from './lib/authContext';
import PasswordGate from './components/PasswordGate';
import './App.css';

function AppContent() {
  const { role } = useAuth();
  const { items, createItem, updateItem, deleteItem } = useItems();
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | undefined>(undefined);

  if (!role) {
    return <PasswordGate />;
  }

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

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
