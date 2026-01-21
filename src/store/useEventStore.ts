import { create } from 'zustand'

export interface Event {
    id: string;
    title: string;
    organizer: string;
    dateStart: string;
    dateEnd: string;
    location: string;
    price: number;
    image: string;
    isPaid: boolean;
    category: string;
    rating: number;
    recommended: number; // percentage
    upcoming: number;
    past: number;
}

interface EventStore {
    events: Event[];
    updateEventPrice: (id: string, newPrice: number) => void;
    buyTicket: (id: string) => void;
}

// Mock Data
const MOCK_EVENTS: Event[] = [
    {
        id: '1',
        title: 'Broomfield Youth Symphony Fundraiser',
        organizer: 'Rocky Mountain Roasting Co.',
        dateStart: '2021-01-13',
        dateEnd: '2021-01-14',
        location: 'Bozeman, MT Street 59718, USA',
        price: 139,
        image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&q=80&w=1000',
        isPaid: true,
        category: 'Music',
        rating: 50,
        recommended: 100,
        upcoming: 29,
        past: 134
    },
    {
        id: '2',
        title: 'Tech Conference 2024',
        organizer: 'Tech Giants Inc.',
        dateStart: '2024-03-15',
        dateEnd: '2024-03-17',
        location: 'San Francisco, CA',
        price: 0,
        image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=1000',
        isPaid: false,
        category: 'Technology',
        rating: 85,
        recommended: 95,
        upcoming: 10,
        past: 5
    },
    {
        id: '3',
        title: 'Art Exhibition Gala',
        organizer: 'Modern Art Museum',
        dateStart: '2024-04-20',
        dateEnd: '2024-04-20',
        location: 'New York, NY',
        price: 50,
        image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&q=80&w=1000',
        isPaid: true,
        category: 'Art',
        rating: 90,
        recommended: 98,
        upcoming: 5,
        past: 20
    },
    {
        id: '4',
        title: 'Summer Music Festival',
        organizer: 'Vibes Production',
        dateStart: '2024-07-10',
        dateEnd: '2024-07-12',
        location: 'Austin, TX',
        price: 200,
        image: 'https://images.unsplash.com/photo-1459749411177-287ce3288789?auto=format&fit=crop&q=80&w=1000',
        isPaid: true,
        category: 'Music',
        rating: 95,
        recommended: 99,
        upcoming: 50,
        past: 10
    }
];

export const useEventStore = create<EventStore>((set) => ({
    events: MOCK_EVENTS,
    updateEventPrice: (id, newPrice) => set((state) => ({
        events: state.events.map((event) =>
            event.id === id ? { ...event, price: newPrice, isPaid: newPrice > 0 } : event
        ),
    })),
    buyTicket: (id) => {
        // In a real app, this would trigger a checkout flow
        console.log(`Processing purchase for event ${id}`);
        alert('Ticket added to cart! (Simulation)');
    },
}))
