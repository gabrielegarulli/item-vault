import type { Rarity } from '../types/item';

interface RarityBadgeProps {
  rarity: Rarity;
}

const rarityColors: Record<Rarity, { bg: string; text: string }> = {
  common: { bg: 'bg-gray-300', text: 'text-gray-900' },
  uncommon: { bg: 'bg-green-500', text: 'text-white' },
  rare: { bg: 'bg-blue-500', text: 'text-white' },
  'very-rare': { bg: 'bg-purple-600', text: 'text-white' },
  legendary: { bg: 'bg-yellow-500', text: 'text-gray-900' },
  artifact: { bg: 'bg-red-500', text: 'text-white' },
};

export function RarityBadge({ rarity }: RarityBadgeProps) {
  const colors = rarityColors[rarity];

  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${colors.bg} ${colors.text}`}
    >
      {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
    </span>
  );
}
