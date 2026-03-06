export const PLANET_DATA = [
  {
    name: 'Mercury',
    radius: 0.38,
    distance: 4,
    speed: 4.1,
    color: '#A5A5A5',
    texture: '/textures/mercury.jpg', // Optional
    description: 'Smallest planet, closest to the Sun',
    moons: 0,
    realDistance: '57.9 million km',
    orbitalPeriod: '88 days'
  },
  {
    name: 'Venus',
    radius: 0.95,
    distance: 7,
    speed: 1.6,
    color: '#E3BB76',
    description: 'Hottest planet with thick atmosphere',
    moons: 0,
    realDistance: '108.2 million km',
    orbitalPeriod: '225 days'
  },
  {
    name: 'Earth',
    radius: 1,
    distance: 10,
    speed: 1,
    color: '#6B93D6',
    description: 'Our home, the only known planet with life',
    moons: 1,
    realDistance: '149.6 million km',
    orbitalPeriod: '365.25 days',
    hasMoon: true
  },
  {
    name: 'Mars',
    radius: 0.53,
    distance: 15,
    speed: 0.53,
    color: '#C1440E',
    description: 'The Red Planet, target for exploration',
    moons: 2,
    realDistance: '227.9 million km',
    orbitalPeriod: '687 days'
  },
  {
    name: 'Jupiter',
    radius: 2.8,
    distance: 25,
    speed: 0.08,
    color: '#D8CA9D',
    description: 'Largest planet, gas giant with Great Red Spot',
    moons: 95,
    realDistance: '778.5 million km',
    orbitalPeriod: '11.9 years'
  },
  {
    name: 'Saturn',
    radius: 2.3,
    distance: 35,
    speed: 0.03,
    color: '#FAD5A5',
    hasRings: true,
    description: 'Famous for its prominent ring system',
    moons: 146,
    realDistance: '1.4 billion km',
    orbitalPeriod: '29.5 years'
  },
  {
    name: 'Uranus',
    radius: 1.6,
    distance: 45,
    speed: 0.01,
    color: '#4FD0E7',
    description: 'Ice giant that rotates on its side',
    moons: 27,
    realDistance: '2.9 billion km',
    orbitalPeriod: '84 years'
  },
  {
    name: 'Neptune',
    radius: 1.5,
    distance: 55,
    speed: 0.006,
    color: '#4B70DD',
    description: 'Windiest planet, deep blue ice giant',
    moons: 14,
    realDistance: '4.5 billion km',
    orbitalPeriod: '164.8 years'
  }
];

// Scale factors (not to real scale, adjusted for visibility)
export const SCALE = {
  sunRadius: 3,
  distanceScale: 1,
  speedScale: 0.5
};