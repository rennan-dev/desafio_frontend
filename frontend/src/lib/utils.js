import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatTimestamp(timestamp) {
  if(!timestamp) return '';
  try {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(new Date(timestamp)).replace(',', ' -');
  }catch(error) {
    return 'Data inválida';
  }
}

export function getPlugType(type) {
  switch(type) {
    case 0: return 'Unplugged';
    case 1: return 'AC';
    case 2: return 'USB';
    case 3: return 'Wireless';
    default: return 'Unknown';
  }
}

export function getBatteryStatus(status) {
  switch(status) {
    case 1: return 'Unknown';
    case 2: return 'Charging';
    case 3: return 'Discharging';
    case 4: return 'Not Charging';
    case 5: return 'Full';
    case 6: return 'Wireless Charging'; 
    default: return 'Unknown';
  }
}