import {create} from 'zustand';

type AuthState = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  error: string;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setConfirmPassword: (confirmPassword: string) => void;
  setError: (error: string) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>(set => ({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  error: '',
  setName: (name: string) => set({name}),
  setEmail: (email: string) => set({email}),
  setPassword: (password: string) => set({password}),
  setConfirmPassword: (confirmPassword: string) => set({confirmPassword}),
  setError: (error: string) => set({error}),
  clearAuth: () =>
    set({name: '', email: '', password: '', confirmPassword: '', error: ''}),
}));
