
import { Destination, Experience } from './types';

export const DESTINATIONS: Destination[] = [
  {
    id: '1',
    name: 'Tirana',
    region: 'Central',
    image: 'https://images.unsplash.com/photo-1558284523-93664326573c?q=80&w=1200',
    description: 'The colorful heart of Albania, blending Ottoman history with modern energy.'
  },
  {
    id: '2',
    name: 'Gjirokastër',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1605658661642-45a80556606a?q=80&w=1200',
    description: 'The Stone City, a UNESCO World Heritage site known for its Ottoman-style architecture.'
  },
  {
    id: '3',
    name: 'Theth',
    region: 'North',
    image: 'https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?q=80&w=1200',
    description: 'Breathtaking peaks and traditional stone houses in the heart of the Albanian Alps.'
  },
  {
    id: '4',
    name: 'Sarandë',
    region: 'South',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1200',
    description: 'The gateway to the Albanian Riviera, overlooking the turquoise Ionian Sea.'
  },
  {
    id: '5',
    name: 'Berat',
    region: 'Central',
    image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c282?q=80&w=1200',
    description: 'The City of a Thousand Windows, showcasing layers of Illyrian and Byzantine history.'
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'e1',
    title: 'Vjosa River Rafting',
    category: 'Adventure',
    image: 'https://images.unsplash.com/photo-1518331647614-7a1f04cd34cf?q=80&w=1200',
    tagline: 'Europe\'s last wild river.'
  },
  {
    id: 'e2',
    title: 'Bunk\'Art 1 & 2',
    category: 'Heritage',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=1200',
    tagline: 'History hidden in nuclear bunkers.'
  },
  {
    id: 'e3',
    title: 'Kala Festival',
    category: 'Nature',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200',
    tagline: 'Music at the edge of the Ionian.'
  },
  {
    id: 'e4',
    title: 'Butrint Archeology',
    category: 'Heritage',
    image: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?q=80&w=1200',
    tagline: 'Ancient civilizations reborn.'
  }
];

export const CRAFTS = [
  { title: "Filigree Jewelry", region: "Shkodër", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800" },
  { title: "Kruja Rugs", region: "Krujë", image: "https://images.unsplash.com/photo-1590634158913-94572c679a9f?q=80&w=800" },
  { title: "Copperware", region: "Gjirokastër", image: "https://images.unsplash.com/photo-1614292264554-7dca1d6466d6?q=80&w=800" },
  { title: "Traditional Veshja", region: "Mirditë", image: "https://images.unsplash.com/photo-1605335032333-e984532b2169?q=80&w=800" },
];
