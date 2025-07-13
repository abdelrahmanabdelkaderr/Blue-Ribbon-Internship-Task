'use client';

import { useState } from 'react';
import { Member } from '../types';

interface AddMemberFormProps {
  onAddMember: (member: Omit<Member, 'id'>) => void;
  onCancel: () => void;
}

export default function AddMemberForm({ onAddMember, onCancel }: AddMemberFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    membershipStatus: 'active' as 'active' | 'inactive'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    } else {
      const birthDate = new Date(formData.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 5 || age > 100) {
        newErrors.dateOfBirth = 'Please enter a valid date of birth';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onAddMember({
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        dateOfBirth: formData.dateOfBirth,
        joinDate: new Date().toISOString().split('T')[0],
        membershipStatus: formData.membershipStatus,
        subscribedSports: []
      });
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        membershipStatus: 'active'
      });
      setErrors({});
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="sport-card p-6">
      <h3 className="text-xl font-semibold text-white mb-6">Add New Member</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block font-semibold mb-3 text-cyan-200">
              First Name *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-cyan-900/30 border border-cyan-400/40 rounded-xl text-cyan-200 placeholder-cyan-300/60 backdrop-blur-sm focus:outline-none focus:border-cyan-300/60 focus:bg-cyan-800/40 transition-all duration-300 ${errors.firstName ? 'border-red-500 bg-red-900/30' : ''}`}
              placeholder="John"
            />
            {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>}
          </div>

          <div>
            <label htmlFor="lastName" className="block font-semibold mb-3 text-cyan-200">
              Last Name *
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-cyan-900/30 border border-cyan-400/40 rounded-xl text-cyan-200 placeholder-cyan-300/60 backdrop-blur-sm focus:outline-none focus:border-cyan-300/60 focus:bg-cyan-800/40 transition-all duration-300 ${errors.lastName ? 'border-red-500 bg-red-900/30' : ''}`}
              placeholder="Doe"
            />
            {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block font-semibold mb-3 text-cyan-200">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-cyan-900/30 border border-cyan-400/40 rounded-xl text-cyan-200 placeholder-cyan-300/60 backdrop-blur-sm focus:outline-none focus:border-cyan-300/60 focus:bg-cyan-800/40 transition-all duration-300 ${errors.email ? 'border-red-500 bg-red-900/30' : ''}`}
            placeholder="john.doe@email.com"
          />
          {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block font-semibold mb-3 text-cyan-200">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-cyan-900/30 border border-cyan-400/40 rounded-xl text-cyan-200 placeholder-cyan-300/60 backdrop-blur-sm focus:outline-none focus:border-cyan-300/60 focus:bg-cyan-800/40 transition-all duration-300 ${errors.phone ? 'border-red-500 bg-red-900/30' : ''}`}
            placeholder="+1-555-0123"
          />
          {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="dateOfBirth" className="block font-semibold mb-3 text-cyan-200">
              Date of Birth *
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-cyan-900/30 border border-cyan-400/40 rounded-xl text-cyan-200 placeholder-cyan-300/60 backdrop-blur-sm focus:outline-none focus:border-cyan-300/60 focus:bg-cyan-800/40 transition-all duration-300 ${errors.dateOfBirth ? 'border-red-500 bg-red-900/30' : ''}`}
            />
            {errors.dateOfBirth && <p className="text-red-400 text-sm mt-1">{errors.dateOfBirth}</p>}
          </div>

          <div>
            <label htmlFor="membershipStatus" className="block font-semibold mb-3 text-cyan-200">
              Membership Status
            </label>
            <select
              id="membershipStatus"
              name="membershipStatus"
              value={formData.membershipStatus}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-cyan-900/30 border border-cyan-400/40 rounded-xl text-cyan-200 backdrop-blur-sm focus:outline-none focus:border-cyan-300/60 focus:bg-cyan-800/40 transition-all duration-300"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="flex space-x-3 pt-4">
          <button
            type="submit"
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:from-cyan-600 hover:to-blue-700 hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex-1"
          >
            Add Member
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-8 py-4 bg-gray-600 text-white font-bold rounded-xl shadow-lg hover:bg-gray-700 hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex-1"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
} 