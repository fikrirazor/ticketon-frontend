import { useState } from 'react';
import { Layout } from '../components/Layout';
import { useEventStore } from '../store/event.store';
import { Button } from '../components/ui/Button';
import { ArrowLeft, Save } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Admin = () => {
    const { events, updateEventPrice } = useEventStore();
    const [editingId, setEditingId] = useState<string | null>(null);
    const [tempPrice, setTempPrice] = useState<number>(0);
    const [isUpdating, setIsUpdating] = useState(false);

    const startEditing = (id: string, currentPrice: number) => {
        setEditingId(id);
        setTempPrice(currentPrice);
    };

    const savePrice = async (id: string) => {
        setIsUpdating(true);
        try {
            await updateEventPrice(id, tempPrice);
            setEditingId(null);
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <Layout>
            <div className="mb-6">
                <Link to="/" className="inline-flex items-center text-gray-500 hover:text-primary mb-4">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Events
                </Link>
                <div className="flex justify-between items-end">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Event Management</h1>
                        <p className="text-gray-500">Manage event prices and details.</p>
                    </div>
                    <Link to="/create-event">
                        <Button className="bg-primary hover:bg-orange-600">
                            + Create New Event
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-gray-900">Event Name</th>
                                <th className="px-6 py-4 font-semibold text-gray-900">Organizer</th>
                                <th className="px-6 py-4 font-semibold text-gray-900">Date</th>
                                <th className="px-6 py-4 font-semibold text-gray-900">Price</th>
                                <th className="px-6 py-4 font-semibold text-gray-900">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {events.map((event) => (
                                <tr key={event.id} className="hover:bg-gray-50/50">
                                    <td className="px-6 py-4 font-medium text-gray-900">{event.title}</td>
                                    <td className="px-6 py-4 text-gray-500">{event.organizer}</td>
                                    <td className="px-6 py-4 text-gray-500">{new Date(event.startDate).toLocaleDateString()}</td>
                                    <td className="px-6 py-4">
                                        {editingId === event.id ? (
                                            <input
                                                type="number"
                                                value={tempPrice}
                                                onChange={(e) => setTempPrice(Number(e.target.value))}
                                                className="w-24 p-1 border border-gray-300 rounded focus:ring-2 focus:ring-primary/20 outline-none"
                                            />
                                        ) : (
                                            <span className={`font-semibold ${event.price === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                                                {event.price === 0 ? 'Free' : `$${event.price}`}
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        {editingId === event.id ? (
                                            <div className="flex gap-2">
                                                <Button size="sm" onClick={() => savePrice(event.id)} disabled={isUpdating} className="bg-green-600 hover:bg-green-700">
                                                    {isUpdating ? '...' : <Save className="w-3 h-3 mr-1" />} Save
                                                </Button>
                                                <Button size="sm" variant="ghost" onClick={() => setEditingId(null)}>
                                                    Cancel
                                                </Button>
                                            </div>
                                        ) : (
                                            <Button size="sm" variant="outline" onClick={() => startEditing(event.id, event.price)}>
                                                Edit Price
                                            </Button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
};
