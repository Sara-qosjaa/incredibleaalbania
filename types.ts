
export interface Destination {
  id: string;
  name: string;
  region: string;
  image: string;
  description: string;
}

export interface Experience {
  id: string;
  title: string;
  category: 'Heritage' | 'Nature' | 'Adventure' | 'Food';
  image: string;
  tagline: string;
}

export interface ItineraryRequest {
  region: string;
  interest: string;
  duration: number;
}

export interface ItineraryResponse {
  title: string;
  days: {
    day: number;
    activity: string;
    location: string;
  }[];
  tips: string[];
}
