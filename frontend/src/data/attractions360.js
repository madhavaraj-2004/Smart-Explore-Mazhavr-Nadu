export const attractions360 = [
  {
    id: 'yercaud-salem',
    name: 'Yercaud',
    district: 'Salem',
    latitude: 11.7794,
    longitude: 78.209,
    thumbnail: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'hogenakkal-falls',
    name: 'Hogenakkal Falls',
    district: 'Dharmapuri',
    latitude: 12.1196,
    longitude: 77.7744,
    thumbnail: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'krishnagiri-dam',
    name: 'Krishnagiri Dam',
    district: 'Krishnagiri',
    latitude: 12.5475,
    longitude: 78.2138,
    thumbnail: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'namakkal-rock-fort',
    name: 'Namakkal Rock Fort',
    district: 'Namakkal',
    latitude: 11.2194,
    longitude: 78.1674,
    thumbnail: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80',
  },
];

export const attractionsById = Object.fromEntries(attractions360.map((item) => [item.id, item]));