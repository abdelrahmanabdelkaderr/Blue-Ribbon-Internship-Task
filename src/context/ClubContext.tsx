'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Sport, Member, Subscription } from '../types';
import { mockSports, mockMembers, mockSubscriptions } from '../data/mockData';

interface ClubContextType {
  sports: Sport[];
  members: Member[];
  subscriptions: Subscription[];
  addSport: (sport: Omit<Sport, 'id'>) => void;
  addMember: (member: Omit<Member, 'id'>) => void;
  subscribeMemberToSport: (memberId: string, sportId: string) => void;
  unsubscribeMemberFromSport: (memberId: string, sportId: string) => void;
  getMemberSubscriptions: (memberId: string) => Subscription[];
  getSportSubscriptions: (sportId: string) => Subscription[];
  isLoaded: boolean;
}

const ClubContext = createContext<ClubContextType | undefined>(undefined);

export const useClub = () => {
  const context = useContext(ClubContext);
  if (!context) {
    throw new Error('useClub must be used within a ClubProvider');
  }
  return context;
};

export const ClubProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sports, setSports] = useState<Sport[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize data on client side to prevent hydration issues
  useEffect(() => {
    setSports(mockSports);
    setMembers(mockMembers);
    setSubscriptions(mockSubscriptions);
    setIsLoaded(true);
  }, []);

  const addSport = (sportData: Omit<Sport, 'id'>) => {
    const newSport: Sport = {
      ...sportData,
      id: Date.now().toString(),
      currentMembers: 0
    };
    setSports(prev => [...prev, newSport]);
  };

  const addMember = (memberData: Omit<Member, 'id'>) => {
    const newMember: Member = {
      ...memberData,
      id: Date.now().toString(),
      subscribedSports: []
    };
    setMembers(prev => [...prev, newMember]);
  };

  const subscribeMemberToSport = (memberId: string, sportId: string) => {
    // Check if subscription already exists
    const existingSubscription = subscriptions.find(
      sub => sub.memberId === memberId && sub.sportId === sportId && sub.status === 'active'
    );

    if (existingSubscription) {
      return; // Already subscribed
    }

    // Check if sport is full
    const sport = sports.find(s => s.id === sportId);
    if (sport && sport.currentMembers >= sport.maxMembers) {
      alert('This sport is already full!');
      return;
    }

    // Add new subscription
    const newSubscription: Subscription = {
      id: Date.now().toString(),
      memberId,
      sportId,
      subscriptionDate: new Date().toISOString().split('T')[0],
      status: 'active'
    };

    setSubscriptions(prev => [...prev, newSubscription]);

    // Update member's subscribed sports
    setMembers(prev => prev.map(member => 
      member.id === memberId 
        ? { ...member, subscribedSports: [...member.subscribedSports, sportId] }
        : member
    ));

    // Update sport's current members count
    setSports(prev => prev.map(sport => 
      sport.id === sportId 
        ? { ...sport, currentMembers: sport.currentMembers + 1 }
        : sport
    ));
  };

  const unsubscribeMemberFromSport = (memberId: string, sportId: string) => {
    // Cancel the subscription
    setSubscriptions(prev => prev.map(sub => 
      sub.memberId === memberId && sub.sportId === sportId
        ? { ...sub, status: 'cancelled' as const }
        : sub
    ));

    // Remove from member's subscribed sports
    setMembers(prev => prev.map(member => 
      member.id === memberId 
        ? { ...member, subscribedSports: member.subscribedSports.filter(id => id !== sportId) }
        : member
    ));

    // Update sport's current members count
    setSports(prev => prev.map(sport => 
      sport.id === sportId 
        ? { ...sport, currentMembers: Math.max(0, sport.currentMembers - 1) }
        : sport
    ));
  };

  const getMemberSubscriptions = (memberId: string) => {
    return subscriptions.filter(sub => sub.memberId === memberId && sub.status === 'active');
  };

  const getSportSubscriptions = (sportId: string) => {
    return subscriptions.filter(sub => sub.sportId === sportId && sub.status === 'active');
  };

  const value: ClubContextType = {
    sports,
    members,
    subscriptions,
    addSport,
    addMember,
    subscribeMemberToSport,
    unsubscribeMemberFromSport,
    getMemberSubscriptions,
    getSportSubscriptions,
    isLoaded
  };

  return (
    <ClubContext.Provider value={value}>
      {children}
    </ClubContext.Provider>
  );
}; 