import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (editedItem: any) => void;
  item: any;
  fields: { name: string; label: string; type: string; options?: string[] }[];
}

export const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, onSave, item, fields }) => {
  const [editedItem, setEditedItem] = useState<any>(null);

  useEffect(() => {
    if (item) {
      setEditedItem({ ...item });
    }
  }, [item]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedItem((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editedItem) {
      onSave(editedItem);
      onClose();
    }
  };

  if (!isOpen || !editedItem) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edit Item</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field) => (
            <div key={field.name}>
              <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                {field.label}
              </label>
              {field.type === 'select' ? (
                <select
                  id={field.name}
                  name={field.name}
                  value={editedItem[field.name] || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border rounded"
                >
                  {field.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  value={editedItem[field.name] || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border rounded"
                />
              )}
            </div>
          ))}
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};