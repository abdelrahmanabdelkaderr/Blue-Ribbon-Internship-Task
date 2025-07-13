'use client';

import { useState } from 'react';
import { useClub } from '../../context/ClubContext';
import MemberCard from '../../components/MemberCard';
import AddMemberForm from '../../components/AddMemberForm';
import { Users, UserCheck, UserX, Plus, Search, X } from 'lucide-react';

export default function MembersPage() {
  const { members, sports, addMember, subscribeMemberToSport, unsubscribeMemberFromSport } = useClub();
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const statuses = ['all', 'active', 'inactive'];

  const filteredMembers = members.filter(member => {
    const matchesStatus = selectedStatus === 'all' || member.membershipStatus === selectedStatus;
    const matchesSearch = member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleAddMember = (memberData: any) => {
    addMember(memberData);
    setShowAddForm(false);
  };

  const handleSubscribe = (memberId: string, sportId: string) => {
    subscribeMemberToSport(memberId, sportId);
  };

  const handleUnsubscribe = (memberId: string, sportId: string) => {
    unsubscribeMemberFromSport(memberId, sportId);
  };

  const activeMembers = members.filter(member => member.membershipStatus === 'active');
  const inactiveMembers = members.filter(member => member.membershipStatus === 'inactive');

  const statusIcons: Record<string, JSX.Element> = {
    'all': <Users className="chip-icon" />,
    'active': <UserCheck className="chip-icon" />,
    'inactive': <UserX className="chip-icon" />,
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-12">
        <div>
          <h1 className="text-3xl font-extrabold text-black mb-1">Members</h1>
          <div className="divider-accent mb-3 mt-1 w-32" />
          <p className="text-gray-600">Manage club members and their subscriptions</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="add-sport-btn flex items-center gap-2 py-2.5 px-6"
        >
          <Plus className="w-5 h-5" />
          {showAddForm ? 'Cancel' : 'Add Member'}
        </button>
      </div>

      {/* Status Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-3">
          {statuses.map(status => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`chip ${selectedStatus === status ? 'chip-active' : ''}`}
            >
              {statusIcons[status]}
              <span className="ml-1">{status === 'all' ? 'All Members' : status.charAt(0).toUpperCase() + status.slice(1)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Enhanced Search Bar */}
      <div className="mb-8">
        <div className="relative max-w-4xl">
          <Search className="absolute left-8 top-1/2 transform -translate-y-1/2 text-cyan-300 w-10 h-10" />
          <input
            type="text"
            placeholder="Search members by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-20 pr-20 py-10 bg-cyan-900/30 border border-cyan-400/40 rounded-2xl text-cyan-200 placeholder-cyan-300/60 backdrop-blur-sm focus:outline-none focus:border-cyan-300/60 focus:bg-cyan-800/40 transition-all duration-300 text-3xl"
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute right-8 top-1/2 transform -translate-y-1/2 text-cyan-300 hover:text-cyan-200 transition-colors duration-200"
            >
              <X className="w-10 h-10" />
            </button>
          )}
        </div>
      </div>

      {/* Add Member Form */}
      {showAddForm && (
        <div className="mb-8">
          <AddMemberForm
            onAddMember={handleAddMember}
            onCancel={() => setShowAddForm(false)}
          />
        </div>
      )}

      {/* Members Grid */}
      {filteredMembers.length === 0 ? (
        <div className="sport-card text-center py-12">
          <div className="text-5xl mb-4">👥</div>
          <h3 className="text-lg font-bold text-white mb-2">No members found</h3>
          <p className="text-cyan-200">
            {searchTerm || selectedStatus !== 'all'
              ? 'No members match your search criteria.'
              : 'No members have been added yet. Add the first member!'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8">
          {filteredMembers.map((member) => (
            <MemberCard
              key={member.id}
              member={member}
              sports={sports}
              onSubscribeToSport={handleSubscribe}
              onUnsubscribeFromSport={handleUnsubscribe}
            />
          ))}
        </div>
      )}

      {/* Statistics */}
      <section className="dashboard-section mt-12" aria-labelledby="members-stats-heading">
        <h2 id="members-stats-heading" className="recent-activity-title mb-8">Member Statistics</h2>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-6 w-full">
          <div className="stat-card group flex-1 min-w-[220px] max-w-[280px] animate-fadeIn">
            <div className="stat-icon flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
              <span>👥</span>
            </div>
            <div className="stat-number counter">{members.length}</div>
            <div className="text-sm font-medium text-gray-600">Total Members</div>
          </div>
          <div className="stat-card group flex-1 min-w-[220px] max-w-[280px] animate-fadeIn">
            <div className="stat-icon flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
              <span>✅</span>
            </div>
            <div className="stat-number counter">{activeMembers.length}</div>
            <div className="text-sm font-medium text-gray-600">Active Members</div>
          </div>
          <div className="stat-card group flex-1 min-w-[220px] max-w-[280px] animate-fadeIn">
            <div className="stat-icon flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
              <span>⏸️</span>
            </div>
            <div className="stat-number counter">{inactiveMembers.length}</div>
            <div className="text-sm font-medium text-gray-600">Inactive Members</div>
          </div>
          <div className="stat-card group flex-1 min-w-[220px] max-w-[280px] animate-fadeIn">
            <div className="stat-icon flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
              <span>📋</span>
            </div>
            <div className="stat-number counter">{members.reduce((total, member) => total + member.subscribedSports.length, 0)}</div>
            <div className="text-sm font-medium text-gray-600">Total Subscriptions</div>
          </div>
        </div>
      </section>
    </div>
  );
} 