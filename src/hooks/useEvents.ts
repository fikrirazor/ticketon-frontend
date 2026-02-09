import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { eventAPI } from "../lib/api.service";
import type { Event } from "../types";

export interface EventFilters {
  category?: string;
  location?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export const useEvents = (filters: EventFilters = {}) => {
  return useQuery({
    queryKey: ["events", filters],
    queryFn: () => eventAPI.getAllEvents(filters),
    placeholderData: (previousData) => previousData,
  });
};

export const useEvent = (id: string) => {
  return useQuery({
    queryKey: ["event", id],
    queryFn: () => eventAPI.getEventById(id),
    enabled: !!id,
  });
};

export const useCreateEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FormData | Record<string, unknown>) =>
      eventAPI.createEvent(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};

export const useUpdateEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Event> }) =>
      eventAPI.updateEvent(id, data),
    onSuccess: (updatedEvent) => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.setQueryData(["event", updatedEvent.id], updatedEvent);
    },
  });
};

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => eventAPI.deleteEvent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};
