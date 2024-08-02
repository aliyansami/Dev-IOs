import {create} from 'zustand';

type AuthState = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  error: string;
  dateOfBirth: Date | null;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setDateOfBirth: (dateOfBirth: Date | null) => void;
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
  dateOfBirth: null,
  setName: (name: string) => set({name}),
  setEmail: (email: string) => set({email}),
  setDateOfBirth: (dateOfBirth: Date | null) => set({dateOfBirth}),
  setPassword: (password: string) => set({password}),
  setConfirmPassword: (confirmPassword: string) => set({confirmPassword}),
  setError: (error: string) => set({error}),
  clearAuth: () =>
    set({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      error: '',
      dateOfBirth: null,
    }),
}));

// const useAuthStore = create(set => ({
//   user: null,
//   setUser: user => set({user}),
//   clearUser: () => set({user: null}),
// }));

// export default useAuthStore;
