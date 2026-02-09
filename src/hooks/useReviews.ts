import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { reviewAPI } from "../lib/api.service";

export const useEventReviews = (
  eventId: string,
  page: number = 1,
  limit: number = 10,
) => {
  return useQuery({
    queryKey: ["reviews", eventId, { page, limit }],
    queryFn: () => reviewAPI.getEventReviews(eventId, page, limit),
    enabled: !!eventId,
  });
};

export const useCreateReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      eventId,
      data,
    }: {
      eventId: string;
      data: { rating: number; comment: string };
    }) => reviewAPI.createReview(eventId, data),
    onSuccess: (_, { eventId }) => {
      queryClient.invalidateQueries({ queryKey: ["reviews", eventId] });
    },
  });
};

export const useEligibleEventsForReview = () => {
  return useQuery({
    queryKey: ["reviews", "eligible"],
    queryFn: () => reviewAPI.getEligibleEventsForReview(),
  });
};
