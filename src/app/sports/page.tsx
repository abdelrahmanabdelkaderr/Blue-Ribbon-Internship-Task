'use client';

import { useState } from 'react';
import { useClub } from '../../context/ClubContext';
import SportCard from '../../components/SportCard';
import AddSportForm from '../../components/AddSportForm';
import { Trophy, Volleyball, Waves, Plus, ListFilter } from 'lucide-react';

export default function SportsPage() {
  const { sports, addSport } = useClub();
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', ...Array.from(new Set(sports.map(sport => sport.category)))];

  const filteredSports = selectedCategory === 'all' 
    ? sports 
    : sports.filter(sport => sport.category === selectedCategory);

  const handleAddSport = (sportData: any) => {
    addSport(sportData);
    setShowAddForm(false);
  };

  const categoryIcons: Record<string, JSX.Element> = {
    'all': <Trophy className="chip-icon" />, // generic trophy icon
    'Team Sports': <Volleyball className="chip-icon" />,
    'Racquet Sports': <Trophy className="chip-icon" />,
    'Aquatic Sports': <Waves className="chip-icon" />,
    'Precision Sports': <Trophy className="chip-icon" />,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-12">
        <div>
          <h1 className="text-3xl font-extrabold text-black mb-1">Sports</h1>
          <div className="divider-accent mb-3 mt-1 w-32" />
          <p className="text-gray-600">Manage club sports and activities</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="add-sport-btn flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          {showAddForm ? 'Cancel' : 'Add Sport'}
        </button>
      </div>

      {/* Category Filter */}
      <div className="mb-12 mt-8">
        <div className="flex flex-wrap gap-3">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`chip ${selectedCategory === category ? 'chip-active' : ''}`}
            >
              {categoryIcons[category] || <ListFilter className="chip-icon" />}
              <span className="ml-1">{category === 'all' ? 'All Categories' : category}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Add Sport Form */}
      {showAddForm && (
        <div className="mb-8">
          <AddSportForm
            onAddSport={handleAddSport}
            onCancel={() => setShowAddForm(false)}
          />
        </div>
      )}

      {/* Sports Grid */}
      {filteredSports.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-5xl mb-4">⚽</div>
          <h3 className="text-lg font-bold text-black mb-2">No sports found</h3>
          <p className="text-gray-600">
            {selectedCategory === 'all' 
              ? 'No sports have been added yet. Add the first sport!' 
              : `No sports found in the "${selectedCategory}" category.`}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSports.map((sport) => (
            <SportCard key={sport.id} sport={sport} />
          ))}
        </div>
      )}

      {/* Statistics */}
      <section className="dashboard-section mt-12" aria-labelledby="sports-stats-heading">
        <h2 id="sports-stats-heading" className="recent-activity-title mb-8">Sports Statistics</h2>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-6 w-full">
          <div className="stat-card group flex-1 min-w-[220px] max-w-[280px] animate-fadeIn">
            <div className="stat-icon flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
              <span>⚽</span>
            </div>
            <div className="stat-number counter">{sports.length}</div>
            <div className="text-sm font-medium text-gray-600">Total Sports</div>
          </div>
          <div className="stat-card group flex-1 min-w-[220px] max-w-[280px] animate-fadeIn">
            <div className="stat-icon flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
              <span>👥</span>
            </div>
            <div className="stat-number counter">{sports.reduce((total, sport) => total + sport.currentMembers, 0)}</div>
            <div className="text-sm font-medium text-gray-600">Total Members</div>
          </div>
          <div className="stat-card group flex-1 min-w-[220px] max-w-[280px] animate-fadeIn">
            <div className="stat-icon flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
              <span>🎯</span>
            </div>
            <div className="stat-number counter">{sports.reduce((total, sport) => total + (sport.maxMembers - sport.currentMembers), 0)}</div>
            <div className="text-sm font-medium text-gray-600">Available Spots</div>
          </div>
        </div>
      </section>
    </div>
  );
} 