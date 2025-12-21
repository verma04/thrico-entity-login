import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

interface AuthState {
  isAuthenticated: boolean;
  token: null | string;
  storeToken: (token: string | null) => Promise<void>;
  removeToken: () => void;
}
const useTokenStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        isAuthenticated: false,
        token: null,
        storeToken: async (token) => {
          const data = {
            token,
          };
          set((state) => ({
            isAuthenticated: true,
            token,
          }));
        },
        removeToken: () => {
          set((state) => ({
            isAuthenticated: false,
            token: null,
            user: null,
          }));
        },
      }),
      {
        name: "token",
      }
    )
  )
);

export { useTokenStore };
