'use client';

import { Sport } from '../types';
import React from 'react';
import { Medal } from 'lucide-react';

interface SportCardProps {
  sport: Sport;
  onSubscribe?: (sportId: string) => void;
  isSubscribed?: boolean;
}

export default function SportCard({ sport, onSubscribe, isSubscribed = false }: SportCardProps) {
  const availabilityPercentage = (sport.currentMembers / sport.maxMembers) * 100;
  const isFull = sport.currentMembers >= sport.maxMembers;

  const getProgressClass = () => {
    if (isFull) return 'danger';
    if (availabilityPercentage > 80) return 'warning';
    return 'success';
  };

  // Animate progress bar
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    setTimeout(() => setProgress(Math.min(availabilityPercentage, 100)), 100);
  }, [availabilityPercentage]);

  return (
    <div className="sport-card group transition-transform duration-300 hover:border-cyan-400/80 hover:shadow-2xl">
      <div className="flex justify-between items-start mb-5">
        <div>
          <h3 className="text-xl font-extrabold tracking-tight mb-1 text-white flex items-center gap-2">
            <Medal className="w-6 h-6 text-cyan-300" />
            {sport.name}
          </h3>
          <p className="text-sm text-cyan-100 mb-2 font-medium">{sport.description}</p>
          <span className="badge badge-success bg-cyan-900/40 text-cyan-200 border-cyan-400 font-semibold text-xs px-3 py-1 rounded-full">{sport.category}</span>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-cyan-100">{sport.currentMembers}</div>
          <div className="text-xs text-cyan-300">of {sport.maxMembers}</div>
        </div>
      </div>
      <div className="mb-4">
        <div className="flex justify-between text-xs mb-2 text-cyan-200">
          <span>Members</span>
          <span className="font-semibold">
            {sport.currentMembers} / {sport.maxMembers}
          </span>
        </div>
        <div className="progress rounded-full h-3 bg-cyan-900/30 overflow-hidden">
          <div 
            className={`progress-bar ${getProgressClass()} rounded-full transition-all duration-700`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs mt-1">
          <span className="text-cyan-200">
            {isFull ? 'Full' : `${sport.maxMembers - sport.currentMembers} spots available`}
          </span>
          <span className={`font-semibold ${isFull ? 'text-red-400' : availabilityPercentage > 80 ? 'text-yellow-300' : 'text-green-300'}`}>
            {isFull ? 'Full' : 'Available'}
          </span>
        </div>
      </div>
      {onSubscribe && (
        <button
          onClick={() => onSubscribe(sport.id)}
          disabled={isFull || isSubscribed}
          className={`btn w-full mt-2 ${
            isSubscribed
              ? 'btn-success'
              : isFull
              ? 'btn-secondary'
              : 'btn-primary'
          }`}
        >
          {isSubscribed ? '✓ Subscribed' : isFull ? 'Full' : 'Subscribe'}
        </button>
      )}
    </div>
  );
} 