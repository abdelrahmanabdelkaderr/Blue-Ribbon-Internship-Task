import React from 'react';
import { Member } from '../types';

interface MemberSelectProps {
  members: Member[];
  value: string;
  onChange: (id: string) => void;
}

export function MemberSelect({ members, value, onChange }: MemberSelectProps) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)} className="form-input w-full rounded-lg border-gray-300 text-lg">
      <option value="">-- Select Member --</option>
      {members.map(m => (
        <option key={m.id} value={m.id}>{m.firstName} {m.lastName}</option>
      ))}
    </select>
  );
} 