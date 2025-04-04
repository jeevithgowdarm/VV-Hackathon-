import React from 'react';
import { motion } from 'framer-motion';
import { RoomType } from '../types';

interface RoomTypeSelectorProps {
  selectedType: RoomType | null;
  onSelect: (type: RoomType) => void;
}

const roomTypes: { type: RoomType; label: string; icon: string }[] = [
  { type: 'bedroom', label: 'Bedroom', icon: '🛏️' },
  { type: 'kitchen', label: 'Kitchen', icon: '🍳' },
  { type: 'bathroom', label: 'Bathroom', icon: '🚿' },
  { type: 'garden', label: 'Garden', icon: '🌿' },
  { type: 'living-room', label: 'Living Room', icon: '🛋️' },
  { type: 'dining-room', label: 'Dining Room', icon: '🍽️' },
  { type: 'office', label: 'Office', icon: '💼' },
];

export function RoomTypeSelector({ selectedType, onSelect }: RoomTypeSelectorProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {roomTypes.map(({ type, label, icon }) => (
        <motion.button
          key={type}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(type)}
          className={`p-4 rounded-lg flex flex-col items-center justify-center gap-2 transition-colors
            ${selectedType === type
              ? 'bg-indigo-100 border-2 border-indigo-500'
              : 'bg-white border-2 border-gray-200 hover:border-indigo-300'}`}
        >
          <span className="text-2xl">{icon}</span>
          <span className="text-sm font-medium text-gray-700">{label}</span>
        </motion.button>
      ))}
    </div>
  );
}