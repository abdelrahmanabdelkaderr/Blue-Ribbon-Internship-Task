'use client';

import { useState } from 'react';
import { Sport } from '../types';

interface AddSportFormProps {
  onAddSport: (sport: Omit<Sport, 'id'>) => void;
  onCancel: () => void;
}

export default function AddSportForm({ onAddSport, onCancel }: AddSportFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    maxMembers: '',
    category: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories = [
    'Team Sports',
    'Individual Sports',
    'Racquet Sports',
    'Aquatic Sports',
    'Precision Sports',
    'Combat Sports',
    'Adventure Sports',
    'Other'
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Sport name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.maxMembers) {
      newErrors.maxMembers = 'Maximum members is required';
    } else if (parseInt(formData.maxMembers) <= 0) {
      newErrors.maxMembers = 'Maximum members must be greater than 0';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onAddSport({
        name: formData.name.trim(),
        description: formData.description.trim(),
        maxMembers: parseInt(formData.maxMembers),
        category: formData.category,
        currentMembers: 0
      });
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        maxMembers: '',
        category: ''
      });
      setErrors({});
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="card p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Add New Sport</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="form-label">
            Sport Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`form-input ${errors.name ? 'border-red-500 bg-red-50' : ''}`}
            placeholder="e.g., Football, Tennis, Swimming"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="description" className="form-label">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className={`form-input ${errors.description ? 'border-red-500 bg-red-50' : ''}`}
            placeholder="Brief description of the sport"
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        <div>
          <label htmlFor="category" className="form-label">
            Category *
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`form-input ${errors.category ? 'border-red-500 bg-red-50' : ''}`}
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
        </div>

        <div>
          <label htmlFor="maxMembers" className="form-label">
            Maximum Members *
          </label>
          <input
            type="number"
            id="maxMembers"
            name="maxMembers"
            value={formData.maxMembers}
            onChange={handleChange}
            min="1"
            className={`form-input ${errors.maxMembers ? 'border-red-500 bg-red-50' : ''}`}
            placeholder="e.g., 30"
          />
          {errors.maxMembers && <p className="text-red-500 text-sm mt-1">{errors.maxMembers}</p>}
        </div>

        <div className="flex space-x-3 pt-4">
          <button
            type="submit"
            className="btn btn-primary flex-1"
          >
            Add Sport
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-secondary flex-1"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
} 