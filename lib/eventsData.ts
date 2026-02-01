export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
  type: 'music' | 'festival' | 'cultural';
  recurring?: boolean;
  image?: string;
}

// Get all events
export async function getEvents(): Promise<Event[]> {
  try {
    const response = await fetch('/api/events', {
      cache: 'no-store', // Ensure we always get fresh data
    });

    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }

    const events: Event[] = await response.json();
    return events;
  } catch (error) {
    console.error('Error loading events:', error);
    return [];
  }
}

// Get events by type
export async function getEventsByType(type: Event['type']): Promise<Event[]> {
  const allEvents = await getEvents();
  return allEvents.filter(event => event.type === type);
}

// Get upcoming events (for now, just return all events)
export async function getUpcomingEvents(limit?: number): Promise<Event[]> {
  const allEvents = await getEvents();
  return limit ? allEvents.slice(0, limit) : allEvents;
}

// Get recurring events
export async function getRecurringEvents(): Promise<Event[]> {
  const allEvents = await getEvents();
  return allEvents.filter(event => event.recurring === true);
}
