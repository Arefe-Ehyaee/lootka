import { create } from "zustand";
import { persist } from "zustand/middleware";

export type User = {
  userId: number;
  username: string;
  email?: string;
  fullName?: string;
};

type UserStore = {
  user: User | null;
  token: string | null;
  loading: boolean;
  setUser: (user: User, token: string) => void;
  clearUser: () => void;
  setLoading: (loading: boolean) => void;
};

const useUserStore = create<UserStore>()(
  persist<UserStore>(
    (set) => ({
      user: null,
      token: null,
      loading: false,
      setUser: (user, token) => set({ user, token }),
      clearUser: () => set({ user: null, token: null }),
      setLoading: (loading) => set({ loading }),
    }),
    {
      name: "user-storage", // localStorage key
    }
  )
);

export default useUserStore;
