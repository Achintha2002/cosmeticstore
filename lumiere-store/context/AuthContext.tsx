"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
} from "react";

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface AuthUser {
  name: string;
  email: string;
}

export interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
}

type AuthAction =
  | { type: "LOGIN"; user: AuthUser }
  | { type: "LOGOUT" }
  | { type: "SET_LOADING"; isLoading: boolean }
  | { type: "HYDRATE"; user: AuthUser | null };

// ─── Reducer ───────────────────────────────────────────────────────────────────

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "LOGIN":
      return { user: action.user, isLoading: false };
    case "LOGOUT":
      return { user: null, isLoading: false };
    case "SET_LOADING":
      return { ...state, isLoading: action.isLoading };
    case "HYDRATE":
      return { user: action.user, isLoading: false };
    default:
      return state;
  }
}

// ─── Context ───────────────────────────────────────────────────────────────────

interface AuthContextValue {
  state: AuthState;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const STORAGE_KEY = "lumiere_auth";

// ─── Provider ──────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isLoading: true,
  });

  // Hydrate from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const user = JSON.parse(raw) as AuthUser;
        dispatch({ type: "HYDRATE", user });
      } else {
        dispatch({ type: "HYDRATE", user: null });
      }
    } catch {
      dispatch({ type: "HYDRATE", user: null });
    }
  }, []);

  // Mock login — in v2 this calls a real auth endpoint
  const login = useCallback(
    async (email: string, _password: string): Promise<boolean> => {
      dispatch({ type: "SET_LOADING", isLoading: true });
      // Simulate a 600ms network delay
      await new Promise((r) => setTimeout(r, 600));
      const user: AuthUser = {
        name: email.split("@")[0].replace(/[._]/g, " "),
        email,
      };
      dispatch({ type: "LOGIN", user });
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
        } catch {
          // ignore
        }
      }
      return true;
    },
    []
  );

  const logout = useCallback(() => {
    dispatch({ type: "LOGOUT" });
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        state,
        login,
        logout,
        isAuthenticated: !!state.user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ──────────────────────────────────────────────────────────────────────

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
