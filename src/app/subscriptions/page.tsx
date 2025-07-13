'use client';

import { useState } from 'react';
import { useClub } from '../../context/ClubContext';
import { MemberSelect } from '../../components/MemberSelect';
import { SportCheckboxGroup } from '../../components/SportCheckboxGroup';
import type { Member, Sport } from '../../types';
import { ClipboardList, CheckCircle, XCircle, Plus, Filter, Users, Trophy, Search, User, Trash2 } from 'lucide-react';

export default function SubscriptionsPage() {
  const { subscriptions, members, sports, unsubscribeMemberFromSport, subscribeMemberToSport } = useClub();
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedSport, setSelectedSport] = useState('all');
  const [selectedMember, setSelectedMember] = useState('all');

  // --- Subscription Form State ---
  const [subscribeMemberId, setSubscribeMemberId] = useState('');
  const [subscribeSports, setSubscribeSports] = useState<string[]>([]);
  const [subscribeMessage, setSubscribeMessage] = useState<string | null>(null);
  const subscribeMember = members.find(m => m.id === subscribeMemberId);
  const alreadySubscribed = subscribeMember ? subscriptions.filter(s => s.memberId === subscribeMemberId && s.status === 'active').map(s => s.sportId) : [];
  const availableSports = sports.filter(s => !alreadySubscribed.includes(s.id));
  const [formError, setFormError] = useState<string | null>(null);

  async function handleSubscribe() {
    if (!subscribeMemberId) {
      setFormError('Please select a member.');
      return;
    }
    if (subscribeSports.length === 0) {
      setFormError('Please select at least one sport.');
      return;
    }
    setFormError(null);
    
    // Subscribe to each selected sport
    let successCount = 0;
    let errorCount = 0;
    
    for (const sportId of subscribeSports) {
      try {
        subscribeMemberToSport(subscribeMemberId, sportId);
        successCount++;
      } catch (error) {
        errorCount++;
      }
    }
    
    if (successCount > 0) {
      setSubscribeMessage(`Successfully subscribed to ${successCount} sport${successCount !== 1 ? 's' : ''}!`);
      setSubscribeSports([]);
      setSubscribeMemberId('');
    } else {
      setSubscribeMessage('Error: Could not subscribe to any sports.');
    }
    
    setTimeout(() => setSubscribeMessage(null), 2000);
  }

  const statuses = ['all', 'active', 'cancelled'];
  const sportOptions = ['all', ...sports.map(sport => sport.id)];
  const memberOptions = ['all', ...members.map(member => member.id)];

  const filteredSubscriptions = subscriptions.filter(subscription => {
    const matchesStatus = selectedStatus === 'all' || subscription.status === selectedStatus;
    const matchesSport = selectedSport === 'all' || subscription.sportId === selectedSport;
    const matchesMember = selectedMember === 'all' || subscription.memberId === selectedMember;
    return matchesStatus && matchesSport && matchesMember;
  });

  const handleUnsubscribe = (memberId: string, sportId: string) => {
    unsubscribeMemberFromSport(memberId, sportId);
  };

  const activeSubscriptions = subscriptions.filter(sub => sub.status === 'active');
  const cancelledSubscriptions = subscriptions.filter(sub => sub.status === 'cancelled');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const statusIcons: Record<string, JSX.Element> = {
    'all': <ClipboardList className="chip-icon" />,
    'active': <CheckCircle className="chip-icon" />,
    'cancelled': <XCircle className="chip-icon" />,
  };

  const selectedSportName = selectedSport === 'all' ? 'All Sports' : sports.find(s => s.id === selectedSport)?.name || 'Unknown Sport';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-12">
        <div>
          <h1 className="text-3xl font-extrabold text-black mb-1">Subscriptions</h1>
          <div className="divider-accent mb-3 mt-1 w-32" />
          <p className="text-gray-600">Manage member subscriptions to sports</p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="sport-card mb-8">
        <h2 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
          <Filter className="w-6 h-6 text-cyan-300" />
          Filters & Search
        </h2>
        
        {/* Status Filter */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-3">
            {statuses.map(status => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`chip ${selectedStatus === status ? 'chip-active' : ''}`}
              >
                {statusIcons[status]}
                <span className="ml-1">{status === 'all' ? 'All Subscriptions' : status.charAt(0).toUpperCase() + status.slice(1)}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Sport Filter Buttons */}
        <div className="mb-6">
          <label className="block text-lg font-bold text-cyan-200 mb-3 flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            Filter by Sport
          </label>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedSport('all')}
              className={`chip ${selectedSport === 'all' ? 'chip-active' : ''}`}
            >
              <Trophy className="chip-icon" />
              <span className="ml-1">All Sports</span>
            </button>
            {sports.map(sport => (
              <button
                key={sport.id}
                onClick={() => setSelectedSport(sport.id)}
                className={`chip ${selectedSport === sport.id ? 'chip-active' : ''}`}
              >
                <Trophy className="chip-icon" />
                <span className="ml-1">{sport.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Clear Filters */}
        <div className="flex justify-end">
          <button
            onClick={() => {
              setSelectedStatus('all');
              setSelectedSport('all');
              setSelectedMember('all');
            }}
            className="px-6 py-3 bg-gray-100 text-black font-bold rounded-xl hover:bg-gray-200 transition-all duration-300 border-2 border-gray-200 flex items-center justify-center gap-2"
          >
            <Filter className="w-5 h-5" />
            Clear Filters
          </button>
        </div>
      </div>

      {/* Subscribe Member to Sports */}
      <div className="sport-card mb-8">
        <h2 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
          <Plus className="w-6 h-6 text-cyan-300" />
          Subscribe Member to Sports
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Member Dropdown */}
          <div>
            <label className="block font-semibold mb-3 text-cyan-200 flex items-center gap-2">
              <User className="w-5 h-5" />
              Select Member
            </label>
            <div className="relative">
              <MemberSelect members={members as Member[]} value={subscribeMemberId} onChange={id => { setSubscribeMemberId(id); setSubscribeSports([]); }} />
            </div>
          </div>

          {/* Sports Selection */}
          <div className="lg:col-span-2">
            <label className="block font-semibold mb-3 text-cyan-200 flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              Select Sports ({subscribeSports.length} selected)
            </label>
            <div className="flex flex-wrap gap-2">
              {availableSports.map(sport => (
                <button
                  key={sport.id}
                  onClick={() => {
                    if (subscribeSports.includes(sport.id)) {
                      setSubscribeSports(subscribeSports.filter(id => id !== sport.id));
                    } else {
                      setSubscribeSports([...subscribeSports, sport.id]);
                    }
                  }}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 border ${
                    subscribeSports.includes(sport.id)
                      ? 'bg-cyan-400/30 text-cyan-100 border-cyan-300/60'
                      : 'bg-cyan-900/30 text-cyan-200 border-cyan-400/40 hover:bg-cyan-800/40'
                  }`}
                >
                  {sport.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Subscribe Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleSubscribe}
            disabled={!subscribeMemberId || subscribeSports.length === 0}
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:from-cyan-600 hover:to-blue-700 hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Subscribe to {subscribeSports.length} Sport{subscribeSports.length !== 1 ? 's' : ''}
          </button>
        </div>

        {formError && <div className="mt-4 text-center font-semibold text-red-400">{formError}</div>}
        {subscribeMessage && (
          <div className="mt-4 text-center font-semibold text-green-300">{subscribeMessage}</div>
        )}
      </div>

      {/* Subscriptions List */}
      {filteredSubscriptions.length === 0 ? (
        <div className="sport-card text-center py-12">
          <div className="text-5xl mb-4">📋</div>
          <h3 className="text-lg font-bold text-white mb-2">No subscriptions found</h3>
          <p className="text-cyan-200">
            No subscriptions match your current filters.
          </p>
        </div>
      ) : (
        <div className="sport-card overflow-hidden">
          <h2 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
            <ClipboardList className="w-6 h-6 text-cyan-300" />
            Subscriptions ({filteredSubscriptions.length})
          </h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-cyan-200/20">
              <thead>
                <tr>
                  <th className="px-8 py-6 text-left text-sm font-bold text-cyan-200 uppercase tracking-wider">
                    Member
                  </th>
                  <th className="px-8 py-6 text-left text-sm font-bold text-cyan-200 uppercase tracking-wider">
                    Sport
                  </th>
                  <th className="px-8 py-6 text-left text-sm font-bold text-cyan-200 uppercase tracking-wider">
                    Subscription Date
                  </th>
                  <th className="px-8 py-6 text-left text-sm font-bold text-cyan-200 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-8 py-6 text-left text-sm font-bold text-cyan-200 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cyan-200/20">
                {filteredSubscriptions.map((subscription) => {
                  const member = members.find(m => m.id === subscription.memberId);
                  const sport = sports.find(s => s.id === subscription.sportId);
                  
                  return (
                    <tr key={subscription.id} className="hover:bg-cyan-900/20 transition-all duration-300">
                      <td className="px-8 py-6 whitespace-nowrap">
                        <div>
                          <div className="text-base font-bold text-white">
                            {member?.firstName} {member?.lastName}
                          </div>
                          <div className="text-sm text-cyan-200">{member?.email}</div>
                        </div>
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap">
                        <div>
                          <div className="text-base font-bold text-white">{sport?.name}</div>
                          <div className="text-sm text-cyan-200">{sport?.category}</div>
                        </div>
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap text-base text-white font-bold">
                        {formatDate(subscription.subscriptionDate)}
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold transition-all duration-300 ${
                            subscription.status === 'active' 
                              ? 'bg-green-900/30 text-green-200 border border-green-400/40 backdrop-blur-sm' 
                              : 'bg-red-900/30 text-red-200 border border-red-400/40 backdrop-blur-sm'
                          }`}>
                            {subscription.status === 'active' ? '●' : '○'}
                          </span>
                          <span className={`text-sm font-semibold ${
                            subscription.status === 'active' 
                              ? 'text-green-200' 
                              : 'text-red-200'
                          }`}>
                            {subscription.status === 'active' ? 'Active' : 'Cancelled'}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap">
                        {subscription.status === 'active' && (
                          <button
                            onClick={() => handleUnsubscribe(subscription.memberId, subscription.sportId)}
                            className="inline-flex items-center justify-center w-10 h-10 bg-red-900/40 text-red-200 rounded-full border border-red-400/50 hover:bg-red-800/50 hover:border-red-300/60 transition-all duration-300 backdrop-blur-sm hover:scale-110"
                            title="Cancel subscription"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Statistics */}
      <section className="dashboard-section mt-12" aria-labelledby="subscriptions-stats-heading">
        <h2 id="subscriptions-stats-heading" className="recent-activity-title mb-8">Subscription Statistics</h2>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-6 w-full">
          <div className="stat-card group flex-1 min-w-[220px] max-w-[280px] animate-fadeIn">
            <div className="stat-icon flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
              <span>📋</span>
            </div>
            <div className="stat-number counter">{subscriptions.length}</div>
            <div className="text-sm font-medium text-gray-600">Total Subscriptions</div>
          </div>
          <div className="stat-card group flex-1 min-w-[220px] max-w-[280px] animate-fadeIn">
            <div className="stat-icon flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
              <span>✅</span>
            </div>
            <div className="stat-number counter">{activeSubscriptions.length}</div>
            <div className="text-sm font-medium text-gray-600">Active Subscriptions</div>
          </div>
          <div className="stat-card group flex-1 min-w-[220px] max-w-[280px] animate-fadeIn">
            <div className="stat-icon flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
              <span>❌</span>
            </div>
            <div className="stat-number counter">{cancelledSubscriptions.length}</div>
            <div className="text-sm font-medium text-gray-600">Cancelled Subscriptions</div>
          </div>
        </div>
      </section>
    </div>
  );
} 