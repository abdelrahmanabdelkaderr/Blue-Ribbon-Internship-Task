import React from 'react';
import { Sport } from '../types';

interface SportCheckboxGroupProps {
  sports: Sport[];
  selected: string[];
  onChange: (ids: string[]) => void;
}

export function SportCheckboxGroup({ sports, selected, onChange }: SportCheckboxGroupProps) {
  function handleCheck(id: string, checked: boolean) {
    if (checked) onChange([...selected, id]);
    else onChange(selected.filter(sid => sid !== id));
  }
  return (
    <div className="flex flex-wrap gap-3">
      {sports.length === 0 && <span className="text-gray-500">No available sports</span>}
      {sports.map(sport => (
        <label key={sport.id} className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg cursor-pointer">
          <input
            type="checkbox"
            value={sport.id}
            checked={selected.includes(sport.id)}
            onChange={e => handleCheck(sport.id, e.target.checked)}
          />
          <span>{sport.name}</span>
        </label>
      ))}
    </div>
  );
} 