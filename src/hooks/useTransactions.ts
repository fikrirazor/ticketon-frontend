import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionAPI } from "../lib/api.service";

export const useUserTransactions = (page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: ["transactions", "me", { page, limit }],
    queryFn: () => transactionAPI.getUserTransactions(page, limit),
  });
};

export const useTransaction = (id: string) => {
  return useQuery({
    queryKey: ["transaction", id],
    queryFn: () => transactionAPI.getTransactionById(id),
    enabled: !!id,
  });
};

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      eventId: string;
      voucherId?: string;
      pointsUsed?: number;
      items: { quantity: number }[];
    }) => transactionAPI.createTransaction(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions", "me"] });
    },
  });
};

export const useUploadPaymentProof = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      transactionId,
      file,
    }: {
      transactionId: string;
      file: File;
    }) => transactionAPI.uploadPaymentProof(transactionId, file),
    onSuccess: (updatedTransaction) => {
      queryClient.setQueryData(
        ["transaction", updatedTransaction.id],
        updatedTransaction,
      );
      queryClient.invalidateQueries({ queryKey: ["transactions", "me"] });
    },
  });
};

export const useCancelTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => transactionAPI.cancelTransaction(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["transaction", id] });
      queryClient.invalidateQueries({ queryKey: ["transactions", "me"] });
    },
  });
};
