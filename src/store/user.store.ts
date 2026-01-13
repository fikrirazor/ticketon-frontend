import { create } from "zustand";
import { Api } from "@/lib/api";
import type { User } from "@/types/user";

type UserStore = {
  users: User[];
  loading: boolean;
  fetchUsers: ({ page, limit }: { page?: number; limit?: number }) => void;
};

type UserResponse = {
  success: boolean;
  message: string;
  data: {
    users: User[];
    count: number;
  };
  page: number;
  limit: number;
};

const useUserStore = create<UserStore>((set) => ({
  users: [],
  loading: false,
  fetchUsers: async ({
    page = 1,
    limit = 10,
  }: {
    page?: number;
    limit?: number;
  }) => {
    try {
      set({ loading: true });
      const response = await Api.get<UserResponse>(
        `/users?page=${page}&limit=${limit}`
      );
      set({ loading: false, users: response.data.data.users });
    } catch (error) {
      set({ loading: false });
      console.log(error);
    }
  },
}));

export default useUserStore;
