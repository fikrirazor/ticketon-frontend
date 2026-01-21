import type { Event } from '../types';

export const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Neon Nights Music Festival',
    description: 'Experience the most electrifying music festival of the year with top artists from around the globe.',
    date: '2024-03-15T18:00:00',
    location: 'Jakarta',
    price: 150000,
    seatsTotal: 500,
    seatsLeft: 120,
    category: 'Music',
    organizer: 'Lumina Productions',
    imageUrl: 'https://images.unsplash.com/photo-1459749411177-287ce3288789?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: '2',
    title: 'Tech Innovators Summit 2024',
    description: 'Join industry leaders and innovators to discuss the future of technology and AI.',
    date: '2024-04-10T09:00:00',
    location: 'Bandung',
    price: 300000,
    seatsTotal: 200,
    seatsLeft: 45,
    category: 'Technology',
    organizer: 'TechForward',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: '3',
    title: 'Modern Art Gallery Opening',
    description: 'An exclusive viewing of contemporary art pieces from emerging local artists.',
    date: '2024-03-20T19:00:00',
    location: 'Bali',
    price: 75000,
    seatsTotal: 100,
    seatsLeft: 15,
    category: 'Art',
    organizer: 'Canvas House',
    imageUrl: 'https://images.unsplash.com/photo-1544928147-79a2af1f98d9?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: '4',
    title: 'Startup Growth Bootcamp',
    description: 'Intensive workshop for startup founders looking to scale their business.',
    date: '2024-05-05T10:00:00',
    location: 'Jakarta',
    price: 500000,
    seatsTotal: 50,
    seatsLeft: 5,
    category: 'Business',
    organizer: 'Growth Hackers',
    imageUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: '5',
    title: 'City Marathon 2024',
    description: 'Annual city marathon event. Run for health and charity.',
    date: '2024-06-02T05:30:00',
    location: 'Surabaya',
    price: 50000,
    seatsTotal: 1000,
    seatsLeft: 400,
    category: 'Sports',
    organizer: 'City Run Org',
    imageUrl: 'https://images.unsplash.com/photo-1552674605-46d526758ad9?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: '6',
    title: 'Jazz Cafe Night',
    description: 'Relaxing evening with soulful jazz performances and fine dining.',
    date: '2024-03-18T20:00:00',
    location: 'Jakarta',
    price: 200000,
    seatsTotal: 80,
    seatsLeft: 10,
    category: 'Music',
    organizer: 'Jazz Corner',
    imageUrl: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80&w=1000'
  }
];
