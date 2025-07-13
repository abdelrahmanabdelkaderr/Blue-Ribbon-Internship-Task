'use client';

import { useClub } from '../context/ClubContext';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';

const HomeIcon = () => (
  <svg className="inline-block align-middle mr-1" width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M3 9.5L10 4l7 5.5" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M4 10v6a2 2 0 002 2h8a2 2 0 002-2v-6" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

export default function Dashboard() {
  const { sports, members, subscriptions, isLoaded } = useClub();
  const [animatedCounts, setAnimatedCounts] = useState({
    sports: 0,
    members: 0,
    subscriptions: 0,
    spots: 0
  });
  const [showToast, setShowToast] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Remove isLoaded check, always run effect
    const activeMembers = members.filter(member => member.membershipStatus === 'active');
    const activeSubscriptions = subscriptions.filter(sub => sub.status === 'active');
    const availableSpots = sports.reduce((total, sport) => total + (sport.maxMembers - sport.currentMembers), 0);

    // Animate counters
    const animateCount = (target: number, setter: (value: number) => void) => {
      let current = 0;
      const increment = target / 30;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setter(Math.floor(current));
      }, 50);
    };

    setTimeout(() => {
      animateCount(sports.length, (value) => setAnimatedCounts(prev => ({ ...prev, sports: value })));
      animateCount(activeMembers.length, (value) => setAnimatedCounts(prev => ({ ...prev, members: value })));
      animateCount(activeSubscriptions.length, (value) => setAnimatedCounts(prev => ({ ...prev, subscriptions: value })));
      animateCount(availableSpots, (value) => setAnimatedCounts(prev => ({ ...prev, spots: value })));
    }, 300);
  }, [sports, members, subscriptions]);

  // Toast auto-hide
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 1800);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  // Remove the isLoaded loading check and spinner

  const activeMembers = members.filter(member => member.membershipStatus === 'active');
  const activeSubscriptions = subscriptions.filter(sub => sub.status === 'active');

  const quickActionCards = [
    {
      title: 'Club Events',
      description: 'Browse all upcoming matches, tournaments, and club gatherings.',
      href: '/events',
      icon: '🏟️',
      buttonText: 'See Events',
    },
    {
      title: 'Club Resources',
      description: 'Access training materials, club policies, and important documents.',
      href: '/resources',
      icon: '📚',
      buttonText: 'View Resources',
    }
  ];

  const stats = [
    {
      label: 'Total Sports',
      value: animatedCounts.sports,
      icon: '⚽',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      animationOrder: 0
    },
    {
      label: 'Active Members',
      value: animatedCounts.members,
      icon: '👥',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      animationOrder: 1
    },
    {
      label: 'Active Subscriptions',
      value: animatedCounts.subscriptions,
      icon: '📋',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      animationOrder: 2
    },
    {
      label: 'Available Spots',
      value: animatedCounts.spots,
      icon: '🎯',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      animationOrder: 3
    }
  ];

  // Toast handler for Quick Actions
  const handleQuickAction = (e: React.MouseEvent) => {
    setShowToast(true);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8" role="main">
      {/* Headline */}
      <div className="headline-container" style={{alignItems: 'flex-start', marginLeft: '2.5rem'}}>
        <h1 className="text-left">
          <span className="headline-outline text-left">TURNING TALENT INTO</span><br />
          <span className="headline-accent text-left">TITANS.</span>
        </h1>
        <p className="text-lg text-black max-w-2xl mt-2 mb-0 text-left">Your club, your members, your sports. Manage everything in one place with a modern, community-driven dashboard.</p>
      </div>
      <div className="divider-accent" style={{marginLeft: '2.5rem'}} />
      {/* Club Overview - Horizontal Row Layout */}
      <section className="dashboard-section" aria-labelledby="overview-heading">
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-6 w-full">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="stat-card group flex-1 min-w-[220px] max-w-[280px] animate-fadeIn"
              style={{ '--animation-order': stat.animationOrder, animationDelay: `${0.1 * index}s` } as React.CSSProperties}
            >
              <div className="stat-icon flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                <span>{stat.icon}</span>
              </div>
              <div className="stat-number counter">{stat.value}</div>
              <div className="text-sm font-medium text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
      {/* Quick Actions - Horizontal Layout */}
      <section className="dashboard-section" aria-labelledby="actions-heading">
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-6 w-full max-w-5xl mx-auto">
          {quickActionCards.map((card, index) => (
            <Link
              key={index}
              href={card.href}
              className={"action-card group flex-1 min-w-[320px] max-w-[400px] flex flex-col items-center justify-between transition-transform duration-300 hover:scale-105 hover:shadow-2xl animate-fadeIn"}
              style={{ '--animation-order': index, animationDelay: `${0.1 * index}s` } as React.CSSProperties}
              tabIndex={0}
              aria-label={card.title}
              onClick={handleQuickAction}
            >
              <div className="action-icon flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                <span>{card.icon}</span>
              </div>
              <h3 className="text-2xl font-extrabold mb-2 tracking-tight">
                {card.title}
              </h3>
              <p className="text-base text-gray-600 mb-4 text-center leading-relaxed" style={{ textDecoration: 'none' }}>{card.description}</p>
              <span className="cta-button w-full font-bold rounded-xl px-8 py-4 text-base shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 flex items-center justify-center group-hover:shadow-2xl mt-2" style={{ textDecoration: 'none' }}>
                <span className="mr-2">{card.buttonText}</span>
                <span className="text-lg group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
        {/* Toast/Snackbar */}
        {showToast && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-cyan-600 text-black px-6 py-3 rounded-xl shadow-lg z-50 animate-fadeIn">
            Quick Action triggered!
          </div>
        )}
      </section>
      {/* Recent Activity - More Compact */}
      <section className="dashboard-section card p-8" aria-labelledby="activity-heading">
        <h2 id="activity-heading" className="recent-activity-title">Recent Activity</h2>
        {activeSubscriptions.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-4" aria-hidden="true">📋</div>
            <p className="text-gray-600 font-medium text-lg">No recent activity to display</p>
            <p className="text-sm text-gray-500 mt-2">New subscriptions will appear here</p>
          </div>
        ) : (
          <div className="space-y-4 w-full max-w-2xl mx-auto" role="list">
            {activeSubscriptions.slice(0, 3).map((subscription) => {
              const member = members.find(m => m.id === subscription.memberId);
              const sport = sports.find(s => s.id === subscription.sportId);
              
              return (
                <div 
                  key={subscription.id} 
                  className="flex items-center p-5 bg-gradient-to-r from-cyan-50 to-teal-50 rounded-lg border border-cyan-200 hover:shadow-md transition-shadow duration-200"
                  role="listitem"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-full flex items-center justify-center mr-5 shadow-lg" aria-hidden="true">
                    <span className="text-white text-sm">✅</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      <span className="font-semibold">{member?.firstName} {member?.lastName}</span>
                      {' '}subscribed to{' '}
                      <span className="font-semibold text-black">{sport?.name}</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(subscription.subscriptionDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
