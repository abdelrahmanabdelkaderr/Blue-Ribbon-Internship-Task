'use client';

import { Member, Sport } from '../types';
import { User, Mail, Calendar, Users, CheckCircle, Pause, Plus, X } from 'lucide-react';

interface MemberCardProps {
  member: Member;
  sports: Sport[];
  onSubscribeToSport?: (memberId: string, sportId: string) => void;
  onUnsubscribeFromSport?: (memberId: string, sportId: string) => void;
}

export default function MemberCard({ 
  member, 
  sports, 
  onSubscribeToSport, 
  onUnsubscribeFromSport 
}: MemberCardProps) {
  const subscribedSports = sports.filter(sport => 
    member.subscribedSports.includes(sport.id)
  );

  const availableSports = sports.filter(sport => 
    !member.subscribedSports.includes(sport.id) && 
    sport.currentMembers < sport.maxMembers
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusIcon = (status: string) => {
    return status === 'active' ? '✔️' : '⏸️';
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'text-green-300' : 'text-red-300';
  };

  const getStatusGlow = (status: string) => {
    return status === 'active' ? 'shadow-green-400/30' : 'shadow-red-400/30';
  };

  return (
    <div className="sport-card group transition-all duration-300 hover:shadow-2xl hover:border-cyan-400/80">
      <div className="flex justify-between items-start mb-6">
        <div className="flex-1">
          <h3 className="text-xl font-extrabold tracking-tight mb-2 text-white flex items-center gap-2">
            <User className="w-6 h-6 text-cyan-300" />
            {member.firstName} {member.lastName}
          </h3>
          <p className="text-sm text-cyan-100 mb-3 font-medium flex items-center gap-2">
            <Mail className="w-4 h-4" />
            {member.email}
          </p>
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-6 px-12 py-6 rounded-full text-xl font-black transition-all duration-300 ${getStatusGlow(member.membershipStatus)} ${
              member.membershipStatus === 'active' 
                ? 'bg-green-600/20 text-green-200 shadow-lg shadow-green-500/20' 
                : 'bg-red-600/20 text-red-200 shadow-lg shadow-red-500/20'
            }`}>
              <span className="text-3xl">{getStatusIcon(member.membershipStatus)}</span>
              {member.membershipStatus.charAt(0).toUpperCase() + member.membershipStatus.slice(1)}
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-cyan-100">{subscribedSports.length}</div>
          <div className="text-xs text-cyan-300">sports</div>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-xs mb-2 text-cyan-200">
              <Calendar className="w-4 h-4" />
              <span>Joined</span>
            </div>
            <div className="text-sm font-bold text-white">{formatDate(member.joinDate)}</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-xs mb-2 text-cyan-200">
              <Calendar className="w-4 h-4" />
              <span>DOB</span>
            </div>
            <div className="text-sm font-bold text-white">{formatDate(member.dateOfBirth)}</div>
          </div>
        </div>
      </div>

      {/* Subscribed Sports */}
      {subscribedSports.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs mb-3 text-cyan-200">
            <Users className="w-4 h-4" />
            <span>Subscribed Sports ({subscribedSports.length})</span>
          </div>
          <div className="flex flex-wrap gap-5">
            {subscribedSports.slice(0, 3).map(sport => (
              <span key={sport.id} className="inline-flex items-center gap-4 px-6 py-4 bg-green-600/20 text-green-200 rounded-full text-base font-medium shadow-lg shadow-green-500/20">
                <CheckCircle className="w-5 h-5 animate-pulse" />
                {sport.name}
              </span>
            ))}
            {subscribedSports.length > 3 && (
              <span className="inline-flex items-center gap-3 px-6 py-4 bg-cyan-900/40 text-cyan-200 rounded-full text-base font-medium">
                +{subscribedSports.length - 3}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Available Sports */}
      {onSubscribeToSport && availableSports.length > 0 && (
        <div>
          <div className="flex items-center gap-2 text-xs mb-3 text-cyan-200">
            <Users className="w-4 h-4" />
            <span>Available Sports ({availableSports.length})</span>
          </div>
          <div className="flex flex-wrap gap-5">
            {availableSports.slice(0, 3).map(sport => (
              <button
                key={sport.id}
                onClick={() => onSubscribeToSport(member.id, sport.id)}
                className="inline-flex items-center gap-4 px-6 py-4 bg-gray-700/40 text-gray-200 rounded-full border border-gray-500/40 hover:bg-gray-600/50 hover:border-gray-400/50 hover:scale-110 hover:text-white transition-all duration-300 text-base font-medium shadow-lg"
              >
                <Plus className="w-5 h-5" />
                {sport.name}
              </button>
            ))}
            {availableSports.length > 3 && (
              <span className="inline-flex items-center gap-3 px-6 py-4 bg-cyan-900/40 text-cyan-200 rounded-full border border-cyan-400/30 text-base font-medium">
                +{availableSports.length - 3}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 